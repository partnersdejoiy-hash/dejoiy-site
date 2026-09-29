import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import { createPortal, hash } from "../lib/documents/service.mjs";
import { validateRequest, validatePDF } from "../lib/documents/validation.mjs";
const pg = new PGlite();
const db = {
  query: (q, p) => pg.query(q, p),
  transaction: (fn) =>
    pg.transaction((tx) => fn({ query: (q, p) => tx.query(q, p) })),
};
const env = {
  DOCUMENTS_ENABLED: "true",
  CRON_SECRET: "test-only-secret-with-at-least-32-characters",
  DATABASE_URL: "test-only",
  RESEND_API_KEY: "test-only",
  FROM_EMAIL: "test@example.com",
  DOCUMENTS_STAFF_EMAILS: "hr@example.com",
  DOCUMENTS_SITE_URL: "https://business.dejoiy.com",
  NODE_ENV: "production",
};
let clock = Date.now(),
  sent = [],
  fail = false;
const send = async (p) => {
  if (fail) return { error: { name: "simulated" } };
  sent.push(p);
  return { data: { id: randomUUID() } };
};
const portal = createPortal({ db, env, send, now: () => clock });
const pdf = Buffer.from("%PDF-1.4\n1 0 obj <<>> endobj\n%%EOF");
const attachment = {
  filename: "test.pdf",
  type: "application/pdf",
  content: pdf.toString("base64"),
};
let ip = 0;
async function call(action, body, cookie, query = {}, overrides = {}) {
  const req = {
    method: ["session", "requests", "request", "download"].includes(action)
      ? "GET"
      : "POST",
    query: { action, ...query },
    body,
    headers: {
      origin: env.DOCUMENTS_SITE_URL,
      "content-type": "application/json",
      "x-forwarded-for": `192.0.2.${++ip}`,
      ...(cookie ? { cookie } : {}),
    },
    ...overrides,
  };
  const res = {
    code: 200,
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(n) {
      this.code = n;
      return this;
    },
    json(v) {
      this.data = v;
      return this;
    },
    send(v) {
      this.data = v;
      return this;
    },
  };
  await portal(req, res);
  return res;
}
async function access(email, staff = false) {
  const result = await call("start", { email, staff, startedAt: clock - 5000 });
  assert.equal(result.code, 200);
  const token = sent.at(-1).text.match(/\/help\/access#([A-Za-z0-9_-]+)/)[1];
  const verified = await call("verify", { token });
  assert.equal(verified.code, 200);
  return { cookie: verified.headers["Set-Cookie"].split(";")[0], token };
}
before(async () => {
  await pg.exec(
    await readFile(
      new URL("../lib/documents/schema.sql", import.meta.url),
      "utf8",
    ),
  );
});
after(async () => {
  await pg.close();
});
test("private workflow: verified access, isolated records, review, follow-up, release, downloads and revocation", async () => {
  const a = await access("person@example.com");
  const b = await access("stranger@example.com");
  assert.equal(
    (await call("verify", { token: a.token })).code,
    400,
    "links are single use",
  );
  assert.equal(
    (await db.query("SELECT hash FROM document_tokens")).rows.length,
    0,
  );
  const body = {
    type: "employment-verification",
    name: "Test Employee",
    email: "spoof@example.com",
    company: "Example Org",
    location: "India",
    message: "Please verify employment dates.",
    consent: true,
    clientKey: randomUUID(),
    attachment,
  };
  const created = await call("create", body, a.cookie);
  assert.equal(created.code, 200);
  const id = created.data.id;
  const repeat = await call("create", body, a.cookie);
  assert.equal(repeat.data.id, id, "unchanged retries are idempotent");
  assert.equal(
    (
      await call(
        "create",
        { ...body, message: "Changed payload for same key" },
        a.cookie,
      )
    ).code,
    409,
  );
  assert.equal((await call("request", null, b.cookie, { id })).code, 404);
  assert.equal(
    (await call("requests", null, b.cookie)).data.requests.length,
    0,
  );
  let record = (await call("request", null, a.cookie, { id })).data;
  assert.equal(
    record.request.email,
    "person@example.com",
    "owner email is bound to session",
  );
  const file = record.files[0].id;
  assert.equal(
    (await call("download", null, b.cookie, { id, file })).code,
    404,
  );
  assert.deepEqual(
    (await call("download", null, a.cookie, { id, file })).data,
    pdf,
  );
  assert.equal(
    (await call("update", { id, status: "completed" }, a.cookie)).code,
    403,
  );
  const staff = await access("hr@example.com", true);
  assert.equal(
    (await call("requests", null, staff.cookie)).data.requests.length,
    1,
  );
  const update = {
    id,
    version: 1,
    status: "needs_information",
    owner: "hr@example.com",
    message: "Please confirm the employment dates.",
  };
  assert.equal(
    (
      await call(
        "update",
        { ...update, owner: "outsider@example.com" },
        staff.cookie,
      )
    ).code,
    400,
  );
  assert.equal((await call("update", update, staff.cookie)).code, 200);
  assert.equal(
    (await call("update", update, staff.cookie)).code,
    409,
    "stale reviewers cannot overwrite an update",
  );
  assert.equal(
    (
      await call(
        "reply",
        {
          id,
          message: "Employment dates are included in this supporting file.",
          attachment,
        },
        a.cookie,
      )
    ).code,
    200,
  );
  record = (await call("request", null, a.cookie, { id })).data;
  assert.equal(record.request.status, "under_review");
  assert.equal(record.request.version, 3);
  assert.ok(record.events.every((e) => e.public));
  assert.equal(record.request.owner, undefined);
  const completion = {
    id,
    version: 3,
    status: "completed",
    owner: "hr@example.com",
    message: "Your approved document is ready.",
    attachment,
  };
  assert.equal(
    (await call("update", completion, staff.cookie)).code,
    400,
    "release requires reviewer confirmation",
  );
  assert.equal(
    (
      await call(
        "update",
        { ...completion, releaseConfirmed: true },
        staff.cookie,
      )
    ).code,
    200,
  );
  record = (await call("request", null, a.cookie, { id })).data;
  assert.equal(record.request.status, "completed");
  const released = record.files.find((f) => f.kind === "released");
  assert.ok(released);
  assert.equal(
    (await call("download", null, b.cookie, { id, file: released.id })).code,
    404,
  );
  const download = await call("download", null, a.cookie, {
    id,
    file: released.id,
  });
  assert.equal(download.code, 200);
  assert.equal(download.headers["Content-Type"], "application/pdf");
  assert.ok(download.headers["Content-Disposition"].startsWith("attachment;"));
  assert.ok(
    (
      await db.query(
        "SELECT * FROM document_events WHERE action='file_download' AND request_id=$1",
        [id],
      )
    ).rows.length >= 2,
  );
  assert.equal((await call("logout", {}, a.cookie)).code, 200);
  assert.equal((await call("session", null, a.cookie)).code, 401);
  env.DOCUMENTS_STAFF_EMAILS = "another@example.com";
  assert.equal(
    (await call("requests", null, staff.cookie)).code,
    401,
    "removing a reviewer immediately revokes access",
  );
  env.DOCUMENTS_STAFF_EMAILS = "hr@example.com";
});
test("expired links and sessions, unapproved reviewers, provider errors and CSRF fail closed", async () => {
  const before = sent.length;
  assert.equal(
    (
      await call("start", {
        email: "unapproved@example.com",
        staff: true,
        startedAt: clock - 5000,
      })
    ).code,
    200,
  );
  assert.equal(sent.length, before);
  fail = true;
  const failed = await call("start", {
    email: "fail@example.com",
    startedAt: clock - 5000,
  });
  assert.equal(failed.code, 502);
  assert.equal(
    (
      await db.query("SELECT * FROM document_tokens WHERE email=$1", [
        "fail@example.com",
      ])
    ).rows.length,
    0,
  );
  fail = false;
  await call("start", {
    email: "expired@example.com",
    startedAt: clock - 5000,
  });
  const token = sent.at(-1).text.match(/\/help\/access#([A-Za-z0-9_-]+)/)[1];
  clock += 901000;
  assert.equal((await call("verify", { token })).code, 400);
  const user = await access("expiry-session@example.com");
  clock += 28800001;
  assert.equal((await call("session", null, user.cookie)).code, 401);
  const req = await call(
    "start",
    { email: "csrf@example.com", startedAt: clock - 5000 },
    null,
    {},
    {
      headers: {
        origin: "https://evil.example",
        "content-type": "application/json",
      },
    },
  );
  assert.equal(req.code, 403);
  assert.equal(
    (await call("verify", {}, null, {}, { method: "GET" })).code,
    405,
  );
  const off = createPortal({
    db,
    env: { ...env, DOCUMENTS_ENABLED: "false" },
    send,
  });
  const res = {
    setHeader() {},
    status(c) {
      this.code = c;
      return this;
    },
    json(v) {
      this.data = v;
    },
  };
  await off({ query: { action: "requests" } }, res);
  assert.equal(res.code, 503);
});
test("shared email rate limiting persists across handler instances", async () => {
  for (let i = 0; i < 3; i++)
    assert.equal(
      (
        await call("start", {
          email: "limited@example.com",
          startedAt: clock - 5000,
        })
      ).code,
      200,
    );
  assert.equal(
    (
      await call("start", {
        email: "limited@example.com",
        startedAt: clock - 5000,
      })
    ).code,
    429,
  );
  const second = createPortal({ db, env, send, now: () => clock });
  const req = {
    method: "POST",
    query: { action: "start" },
    headers: {
      origin: env.DOCUMENTS_SITE_URL,
      "content-type": "application/json",
      "x-forwarded-for": "198.51.100.1",
    },
    body: { email: "limited@example.com", startedAt: clock - 5000 },
  };
  const res = {
    setHeader() {},
    status(c) {
      this.code = c;
      return this;
    },
    json() {},
  };
  await second(req, res);
  assert.equal(res.code, 429);
});
test("malformed documents and incomplete verification are rejected", () => {
  assert.throws(() =>
    validatePDF({
      ...attachment,
      content: Buffer.from("not a PDF").toString("base64"),
    }),
  );
  assert.throws(() =>
    validatePDF({ ...attachment, content: "AAAA".repeat(800000) }),
  );
  assert.throws(() =>
    validateRequest({
      type: "employment-verification",
      clientKey: randomUUID(),
      consent: true,
      name: "Test",
      location: "India",
      company: "Org",
      message: "Enough detail here.",
    }),
  );
  assert.throws(() => validateRequest({ type: "made-up", consent: true }));
});
test("retention endpoint requires its secret and cascades only expired request data", async () => {
  const { createRetention } = await import("../lib/documents/retention.mjs");
  const retention = createRetention({ db, env });
  const invoke = async (auth) => {
    const res = {
      setHeader() {},
      status(c) {
        this.code = c;
        return this;
      },
      json(v) {
        this.data = v;
      },
    };
    await retention({ method: "GET", headers: { authorization: auth } }, res);
    return res;
  };
  assert.equal((await invoke("Bearer incorrect")).code, 401);
  const expired = randomUUID(),
    live = randomUUID();
  for (const [id, expires] of [
    [expired, "2020-01-01"],
    [live, "2099-01-01"],
  ])
    await db.query(
      "INSERT INTO document_requests(id,email,type,details,client_key,payload_hash,expires_at) VALUES($1,$2,$3,$4,$5,$6,$7)",
      [
        id,
        "retention@example.com",
        "other",
        "{}",
        randomUUID(),
        "test",
        expires,
      ],
    );
  await db.query(
    "INSERT INTO document_files(id,request_id,filename,content,kind) VALUES($1,$2,'test.pdf',$3,'supporting')",
    [randomUUID(), expired, pdf],
  );
  await db.query(
    "INSERT INTO document_events(request_id,actor,action) VALUES($1,'test','test')",
    [expired],
  );
  assert.equal((await invoke(`Bearer ${env.CRON_SECRET}`)).code, 200);
  assert.equal(
    (await db.query("SELECT id FROM document_requests WHERE id=$1", [expired]))
      .rows.length,
    0,
  );
  assert.equal(
    (await db.query("SELECT id FROM document_requests WHERE id=$1", [live]))
      .rows.length,
    1,
  );
  assert.equal(
    (
      await db.query("SELECT id FROM document_files WHERE request_id=$1", [
        expired,
      ])
    ).rows.length,
    0,
  );
  assert.equal(
    (
      await db.query("SELECT id FROM document_events WHERE request_id=$1", [
        expired,
      ])
    ).rows.length,
    0,
  );
});
