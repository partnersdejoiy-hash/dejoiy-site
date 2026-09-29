// Isolated browser → actual Next.js APIs → PostgreSQL → fake mail-provider verification.
// Never uses production credentials, databases or recipients.
import { spawn } from "node:child_process";
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";
import { chromium } from "playwright";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output =
  process.env.DOCUMENTS_TEST_OUTPUT ||
  path.join(root, "test-results/documents");
await fs.mkdir(output, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const db = await PGlite.create();
await db.exec(
  await fs.readFile(path.join(root, "lib/documents/schema.sql"), "utf8"),
);
const socket = new PGLiteSocketServer({
  db,
  port: 5434,
  host: "127.0.0.1",
  maxConnections: 20,
});
await socket.start();
const sent = [];
let rejectMail = false;
const mock = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    if (req.url === "/emails") {
      const payload = JSON.parse(body);
      sent.push(payload);
      res.writeHead(rejectMail ? 422 : 200, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify(
          rejectMail
            ? { name: "test_rejection", message: "Simulated rejection" }
            : { id: `test-mail-${sent.length}` },
        ),
      );
    } else {
      res.writeHead(404);
      res.end();
    }
  });
});
await new Promise((r) => mock.listen(5051, "127.0.0.1", r));
const env = {
  ...process.env,
  DOCUMENTS_ENABLED: "true",
  DATABASE_URL: "postgres://postgres:postgres@127.0.0.1:5434/postgres",
  CRON_SECRET: "isolated-test-secret-at-least-32-characters",
  RESEND_API_KEY: "test-only",
  RESEND_BASE_URL: "http://127.0.0.1:5051",
  FROM_EMAIL: "test@example.com",
  CONTACT_EMAIL: "test@example.com",
  DOCUMENTS_NOTIFY_EMAIL: "hr@example.com",
  VERIFICATION_TO_EMAIL: "verification@example.com",
  BGV_TO_EMAIL: "bgv@example.com",
  DOCUMENTS_STAFF_EMAILS: "hr@example.com",
  DOCUMENTS_SITE_URL: "http://127.0.0.1:5000",
};
let logs = "";
const servers = [];
function start(port, enabled) {
  const server = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "-p",
      String(port),
      "-H",
      "127.0.0.1",
    ],
    {
      cwd: root,
      env: { ...env, DOCUMENTS_ENABLED: String(enabled) },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  server.stdout.on("data", (d) => (logs += d));
  server.stderr.on("data", (d) => (logs += d));
  servers.push(server);
}
start(5000, true);
start(5002, false);
let browser;
const results = [],
  errors = [];
function check(name, pass = true) {
  results.push({ name, pass });
  assert.ok(pass, name);
  if (!name.includes("width") && !name.includes("route "))
    console.log("PASS", name);
}
try {
  for (const port of [5000, 5002]) {
    let ready = false;
    for (let i = 0; i < 60; i++) {
      try {
        if ((await fetch(`http://127.0.0.1:${port}/help`)).ok) {
          ready = true;
          break;
        }
      } catch {}
      await wait(300);
    }
    assert.ok(ready, "server ready");
  }
  if (process.env.AGENT_BROWSER_BIN) {
    const cli = spawn(
      process.env.AGENT_BROWSER_BIN,
      ["--session", "documents-review", "open", "http://127.0.0.1:5002/help"],
      {
        env: {
          ...process.env,
          AGENT_BROWSER_EXECUTABLE_PATH: process.env.BROWSER_EXECUTABLE_PATH,
        },
      },
    );
    let text = "";
    cli.stdout.on("data", (d) => (text += d));
    cli.stderr.on("data", (d) => (text += d));
    await Promise.race([new Promise((r) => cli.on("exit", r)), wait(12000)]);
    cli.kill();
    await fs.writeFile(path.join(output, "agent-browser.txt"), text);
  }
  browser = await chromium.launch({
    headless: true,
    ...(process.env.BROWSER_EXECUTABLE_PATH
      ? { executablePath: process.env.BROWSER_EXECUTABLE_PATH }
      : {}),
    args: ["--no-sandbox", "--no-zygote"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", async (response) => {
    if (response.url().includes("/api/documents/") && response.status() >= 400)
      console.log("API failure", response.status(), await response.text());
  });
  if (!process.env.PORTAL_ONLY) {
    const routes = [
      "/",
      "/help",
      "/employee-documents",
      "/employee-verification",
      "/resources",
      "/resources/bpo-discovery-checklist",
      "/resources/service-handoff-playbook",
      "/resources/employment-verification-checklist",
      "/help/track",
      "/staff/documents",
      "/help/access",
      "/contact",
      "/insights",
      "/privacy",
    ];
    for (const route of routes) {
      const response = await page.goto("http://127.0.0.1:5002" + route);
      await page.locator("h1").waitFor();
      check(
        "desktop route " + route,
        response.status() === 200 && (await page.locator("h1").count()) === 1,
      );
      check(
        "desktop width " + route,
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
    }
    await page.goto("http://127.0.0.1:5002/help");
    await page
      .getByRole("heading", { name: "What brings you to DEJOIY?" })
      .waitFor();
    await page.screenshot({
      path: path.join(output, "help-desktop.png"),
      fullPage: true,
    });
    await page.getByLabel("Search help topics").fill("relieving");
    await page.waitForFunction(
      () => document.querySelectorAll(".help-faqs details").length === 1,
    );
    check("FAQ search narrows content");
    await page.locator(".help-faqs summary").click();
    check(
      "FAQ answer expands",
      (await page.locator(".help-faqs details").getAttribute("open")) !== null,
    );
    await page.goto("http://127.0.0.1:5002/resources");
    await page
      .getByRole("button", { name: "People support", exact: true })
      .click();
    await page.waitForFunction(
      () => document.querySelectorAll(".resource-card").length === 1,
    );
    check("resources filter");
    await page.getByLabel("Search resources").fill("no-such-guide");
    await page.getByText("No guides match that search.").waitFor();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await page.waitForFunction(
      () => document.querySelectorAll(".resource-card").length === 3,
    );
    check("resource empty state resets");
    await page.goto("http://127.0.0.1:5002/resources/bpo-discovery-checklist");
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("link", { name: "Download checklist" }).click(),
    ]);
    check(
      "resource file downloads",
      download.suggestedFilename() === "bpo-discovery-checklist.txt",
    );
    await page.emulateMedia({ media: "print" });
    check(
      "print view hides navigation",
      !(await page.locator(".site-header").isVisible()),
    );
    await page.emulateMedia({ media: "screen" });
    await page.goto("http://127.0.0.1:5002/employee-documents");
    await page.getByRole("button", { name: /Final-pay query/ }).click();
    await page
      .getByRole("heading", { name: "Final-pay query", exact: true })
      .waitFor();
    check(
      "request type selected",
      await page
        .getByRole("heading", { name: "Final-pay query", exact: true })
        .isVisible(),
    );
    for (const [label, value] of [
      ["Employee full name", "Test Person"],
      ["Your email", "person@example.com"],
      ["Employment location", "India"],
      [
        "What do you need?",
        "Please clarify the final-pay statement for the test period.",
      ],
    ])
      await page.getByLabel(label, { exact: false }).fill(value);
    await page.locator("[name=consent]").check();
    await wait(1600);
    await page.getByRole("button", { name: "Send document request" }).click();
    await page.getByRole("status").waitFor();
    check(
      "email fallback routes to team",
      sent.at(-1).subject.startsWith("Employee document request") &&
        sent.at(-1).to[0] === "hr@example.com" &&
        sent.at(-1).text.includes("requestType: final-pay"),
    );
    await page.goto("http://127.0.0.1:5002/employee-verification");
    await page.getByRole("button", { name: /Background verification \(BGV\)/ }).click();
    await page.getByRole("heading", { name: "Background verification (BGV)", exact: true }).waitFor();
    for (const [label, value] of [
      ["Requesting company", "Example Checks"],
      ["Business email", "checks@example.com"],
      ["Employee full name", "Sample Employee"],
      ["Purpose and scope of verification", "Authorised background check of employment dates."],
    ]) await page.getByLabel(label, { exact: false }).fill(value);
    await page.locator("input[type=file]").setInputFiles({ name: "permission.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4\n1 0 obj <<>> endobj\n%%EOF") });
    await page.locator("[name=consent]").check();
    await wait(1600);
    await page.getByRole("button", { name: "Submit verification request" }).click();
    await page.getByRole("status").waitFor();
    check("BGV form delivers only to its separate inbox", sent.at(-1).to[0] === "bgv@example.com" && sent.at(-1).subject.startsWith("Background verification") && sent.at(-1).attachments.length === 1);
    await page.goto("http://127.0.0.1:5002/help/track");
    check(
      "offline tracking is honest",
      await page
        .getByText(/Online status tracking is not available yet/)
        .isVisible(),
    );
    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    const mp = await mobile.newPage();
    mp.on("pageerror", (e) => errors.push(e.message));
    for (const route of routes) {
      await mp.goto("http://127.0.0.1:5002" + route);
      await mp.locator("h1").waitFor();
      check(
        "mobile width " + route,
        await mp.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      );
    }
    await mp.goto("http://127.0.0.1:5002/help");
    await mp.screenshot({
      path: path.join(output, "help-mobile.png"),
      fullPage: true,
    });
    await mp.getByRole("button", { name: "Open menu" }).click();
    await mp
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "Resources", exact: true })
      .click();
    await mp.waitForURL("**/resources");
    await mp
      .getByRole("navigation", { name: "Mobile navigation" })
      .waitFor({ state: "hidden" });
    check(
      "mobile routing works and menu closes",
      !(await mp
        .getByRole("navigation", { name: "Mobile navigation" })
        .isVisible()),
    );
  }
  async function login(target, email, staff = false) {
    await target.goto(
      `http://127.0.0.1:5000/${staff ? "staff/documents" : "help/track"}`,
    );
    await target
      .getByLabel(staff ? "Approved work email" : "Your email address")
      .fill(email);
    await wait(1600);
    await target
      .getByRole("button", { name: "Email me an access link" })
      .click();
    await target.locator(".form-status").waitFor();
    if (await target.locator(".form-status[role=alert]").count())
      throw new Error(
        await target.locator(".form-status[role=alert]").innerText(),
      );
    const mail = sent.findLast(
      (m) =>
        m.to[0] === email && m.subject === "Your private DEJOIY access link",
    );
    assert.ok(mail, "access email captured by fake provider");
    const link = mail.text.match(
      /http:\/\/127\.0\.0\.1:5000\/help\/access#[A-Za-z0-9_-]+/,
    )[0];
    await target.goto(link);
    await target.getByRole("button", { name: "Confirm and continue" }).click();
    await target
      .getByRole("button", { name: "End session", exact: true })
      .waitFor();
    check((staff ? "staff" : "requester") + " email access and secure session");
  }
  console.log("Public routes verified; testing private flow");
  await login(page, "requester@example.com");
  await page.getByRole("link", { name: "New request", exact: true }).click();
  await page
    .getByRole("heading", { name: "Your document request", exact: true })
    .waitFor();
  await page.getByLabel("Request type").selectOption("employment-verification");
  for (const [label, value] of [
    ["Employee full name", "Test Employee"],
    ["Employment location", "India"],
    ["Requesting organisation", "Example Org"],
    [
      "What do you need?",
      "Please verify the employment dates stated in the authorisation.",
    ],
  ])
    await page.getByLabel(label, { exact: false }).fill(value);
  const pdf = Buffer.from("%PDF-1.4\n1 0 obj <<>> endobj\n%%EOF");
  await page
    .locator("input[type=file]")
    .setInputFiles({
      name: "permission.pdf",
      mimeType: "application/pdf",
      buffer: pdf,
    });
  await page.locator("[name=consent]").check();
  await page
    .getByRole("button", { name: "Submit document request", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "Your request is saved.", exact: true })
    .waitFor();
  await page.getByRole("link", { name: "View your request" }).click();
  await page
    .getByRole("heading", { name: "Request history", exact: true })
    .waitFor();
  check("browser to API to PostgreSQL request is stored");
  const rows = (
    await db.query(
      "SELECT id FROM document_requests WHERE email='requester@example.com'",
    )
  ).rows;
  const id = rows[0].id;
  check(
    "supporting file persisted",
    (await db.query("SELECT id FROM document_files WHERE request_id=$1", [id]))
      .rows.length === 1,
  );
  const staffContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const sp = await staffContext.newPage();
  sp.on("pageerror", (e) => errors.push(e.message));
  await login(sp, "hr@example.com", true);
  await sp.locator(".request-list-item").click();
  await sp.getByRole("heading", { name: "Review this request" }).waitFor();
  await sp
    .getByLabel("Status", { exact: true })
    .selectOption("needs_information");
  await sp.getByLabel("Assigned owner").selectOption("hr@example.com");
  await sp
    .getByLabel("Update visible to the requester")
    .fill("Please confirm the relevant employment dates.");
  await sp.getByRole("button", { name: "Save review update" }).click();
  await sp.getByRole("status").filter({ hasText: "Update saved." }).waitFor();
  await page.reload();
  await page
    .getByRole("heading", { name: "Send the missing information" })
    .waitFor();
  await page
    .getByLabel("Your reply")
    .fill("Employment dates are 01 January to 30 June in this synthetic test.");
  await page
    .getByRole("button", { name: "Send additional information" })
    .click();
  await page.getByRole("status").filter({ hasText: "Update saved." }).waitFor();
  check("missing-information reply returns to review");
  await sp.reload();
  await sp.locator(".request-list-item").click();
  await sp.getByRole("heading", { name: "Review this request" }).waitFor();
  await sp.getByLabel("Status", { exact: true }).selectOption("completed");
  await sp
    .getByLabel("Update visible to the requester")
    .fill("The authorised test document is ready.");
  await sp
    .locator("input[type=file]")
    .setInputFiles({
      name: "approved.pdf",
      mimeType: "application/pdf",
      buffer: pdf,
    });
  await sp.locator("[name=releaseConfirmed]").check();
  await sp.getByRole("button", { name: "Save review update" }).click();
  await sp.getByRole("status").filter({ hasText: "Update saved." }).waitFor();
  await page.reload();
  const documentLink = page.getByRole("link", { name: /Document from DEJOIY/ });
  await documentLink.waitFor();
  const [secureDownload] = await Promise.all([
    page.waitForEvent("download"),
    documentLink.click(),
  ]);
  check(
    "approved private document downloads",
    secureDownload.suggestedFilename() === "dejoiy-document.pdf",
  );
  await page.screenshot({
    path: path.join(output, "private-request-desktop.png"),
    fullPage: true,
  });
  const anonymous = await fetch(
    `http://127.0.0.1:5000/api/documents/request?id=${id}`,
  );
  check("anonymous request denied", anonymous.status === 401);
  const stranger = await browser.newContext();
  const strangerPage = await stranger.newPage();
  await login(strangerPage, "other@example.com");
  const forbidden = await strangerPage.evaluate(async (requestId) => {
    const response = await fetch("/api/documents/request?id=" + requestId);
    return response.status;
  }, id);
  check("other verified requester denied", forbidden === 404);
  check("no browser runtime errors", errors.length === 0);
  console.log(
    JSON.stringify(
      {
        checks: results.length,
        passed: results.filter((r) => r.pass).length,
        errors,
        fakeProviderEmails: sent.length,
        productionEmails: 0,
      },
      null,
      2,
    ),
  );
} catch (error) {
  console.error(error.stack);
  console.error(logs.slice(-3000));
  process.exitCode = 1;
} finally {
  await fs.writeFile(
    path.join(output, "results.json"),
    JSON.stringify({ results, errors }, null, 2),
  );
  await fs.writeFile(path.join(output, "server.log"), logs);
  await browser?.close();
  for (const server of servers) server.kill("SIGTERM");
  await new Promise((r) => mock.close(r));
  await socket.stop();
  await db.close();
}
