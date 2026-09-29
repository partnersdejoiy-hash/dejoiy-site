import test from "node:test";
import assert from "node:assert/strict";
import { createHandler, validate } from "../lib/form-handler.mjs";
const body = {
  name: "Test <script>",
  email: "review@example.com",
  company: "Example",
  country: "India",
  service: "customer-experience",
  message: "Testing validation without sending real email.",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000,
  requestId: "12345678-1234-1234-1234-123456789012",
};
function request(overrides = {}) {
  return {
    method: "POST",
    headers: {
      host: "localhost:5000",
      origin: "http://localhost:5000",
      "content-type": "application/json",
    },
    body: { ...body },
    ...overrides,
  };
}
function response() {
  return {
    headers: {},
    setHeader(k, v) {
      this.headers[k] = v;
    },
    status(code) {
      this.code = code;
      return this;
    },
    json(data) {
      this.data = data;
      return this;
    },
  };
}
const env = {
  RESEND_API_KEY: "test-placeholder",
  CONTACT_EMAIL: "test@example.com",
  FROM_EMAIL: "test@example.com",
};
async function call(
  kind,
  req,
  send = async () => ({ data: { id: "mock-id" } }),
  options = {},
) {
  const res = response();
  await createHandler(kind, { env, rateLimit: () => true, send, ...options })(
    req,
    res,
  );
  return res;
}
test("successful request is escaped and uses reply-to; credentials never returned", async () => {
  let sent;
  const res = await call("contact", request(), async (mail) => {
    sent = mail;
    return { data: { id: "mock-id" } };
  });
  assert.equal(res.code, 200);
  assert.ok(sent.html.includes("&lt;script&gt;"));
  assert.ok(!sent.html.includes("<script>"));
  assert.equal(sent.reply_to, body.email);
  assert.deepEqual(sent.to, ["test@example.com"]);
  assert.ok(!JSON.stringify(res.data).includes(env.RESEND_API_KEY));
});
test("provider error never becomes success", async () => {
  const res = await call("contact", request(), async () => ({
    data: null,
    error: { name: "validation_error", message: "provider detail" },
  }));
  assert.equal(res.code, 502);
  assert.ok(!JSON.stringify(res.data).includes("provider detail"));
});
test("missing configuration, exceptions and missing provider ID fail safely", async () => {
  assert.equal(
    (await call("contact", request(), undefined, { env: {} })).code,
    503,
  );
  assert.equal(
    (
      await call("contact", request(), async () => {
        throw Error("secret");
      })
    ).code,
    502,
  );
  assert.equal(
    (await call("contact", request(), async () => ({ data: {} }))).code,
    502,
  );
});
test("method, origin and content type guards", async () => {
  assert.equal((await call("contact", request({ method: "GET" }))).code, 405);
  assert.equal(
    (
      await call(
        "contact",
        request({
          headers: {
            host: "localhost:5000",
            origin: "https://example.com",
            "content-type": "application/json",
          },
        }),
      )
    ).code,
    403,
  );
  assert.equal(
    (
      await call(
        "contact",
        request({
          headers: { host: "localhost:5000", "content-type": "text/plain" },
        }),
      )
    ).code,
    415,
  );
});
test("validation rejects bad email, unknown services, long messages and missing consent", () => {
  for (const change of [
    { email: "bad" },
    { service: "invented" },
    { message: "x".repeat(4001) },
    { consent: false },
    { name: "Injected\r\nHeader" },
  ])
    assert.ok(
      Object.keys(validate("contact", { ...body, ...change }).fields).length >
        0,
    );
});
test("anti-spam and rate limiting refuse submissions", async () => {
  assert.equal(
    (await call("contact", request({ body: { ...body, website: "spam" } })))
      .code,
    400,
  );
  assert.equal(
    (
      await call(
        "contact",
        request({ body: { ...body, startedAt: Date.now() } }),
      )
    ).code,
    400,
  );
  const res = await call("contact", request(), undefined, {
    rateLimit: () => false,
  });
  assert.equal(res.code, 429);
  assert.equal(res.headers["Retry-After"], "900");
});
const pdf = Buffer.from("%PDF-1.4\n1 0 obj <<>> endobj\n%%EOF").toString(
  "base64",
);
const verification = {
  company: "Example",
  email: "review@example.com",
  employeeName: "Sample Employee",
  employeeId: "",
  purpose: "Authorised review of employment dates.",
  consent: true,
  startedAt: Date.now() - 5000,
  attachment: { filename: "test.pdf", type: "application/pdf", content: pdf },
};
test("verification transmits actual attachment privately to configured recipient", async () => {
  let mail;
  const res = await call(
    "employee-verification",
    request({ body: verification }),
    async (m) => {
      mail = m;
      return { data: { id: "mock" } };
    },
    { env: { ...env, VERIFICATION_TO_EMAIL: "verification@example.com" } },
  );
  assert.equal(res.code, 200);
  assert.equal(mail.attachments[0].content, pdf);
  assert.deepEqual(mail.to, ["verification@example.com"]);
  assert.equal(mail.attachments[0].filename, "authorization-letter.pdf");
  assert.ok(!JSON.stringify(res.data).includes(pdf));
});
test("verification refuses missing, disguised, malformed and oversized files", () => {
  for (const attachment of [
    null,
    {
      filename: "x.pdf",
      type: "application/pdf",
      content: Buffer.from("not a pdf").toString("base64"),
    },
    { filename: "x.exe", type: "application/pdf", content: pdf },
    {
      filename: "x.pdf",
      type: "application/pdf",
      content: "a".repeat(3 * 1024 * 1024),
    },
  ])
    assert.ok(
      validate("employee-verification", { ...verification, attachment }).fields
        .attachment,
    );
});
test("careers validates role and routes CV attachment", async () => {
  const payload = {
    ...body,
    role: "General application",
    location: "Delhi",
    experience: "2 years",
    attachment: { filename: "cv.pdf", type: "application/pdf", content: pdf },
  };
  let mail;
  const res = await call("careers", request({ body: payload }), async (m) => {
    mail = m;
    return { data: { id: "mock" } };
  });
  assert.equal(res.code, 200);
  assert.equal(mail.attachments[0].filename, "candidate-cv.pdf");
  assert.ok(
    validate("careers", { ...payload, role: "Unknown role" }).fields.role,
  );
});
test("BGV routes only to its configured inbox and refuses unknown or missing routes", async () => {
  let sent;
  const payload = { ...verification, verificationType: "background-verification", to: "attacker@example.com" };
  const send = async (mail) => { sent = mail; return { data: { id: "mock-bgv" } }; };
  const routingEnv = { ...env, VERIFICATION_TO_EMAIL: "verification@example.com", BGV_TO_EMAIL: "bgv@example.com" };
  const res = await call("employee-verification", request({ body: payload }), send, { env: routingEnv });
  assert.equal(res.code, 200);
  assert.deepEqual(sent.to, ["bgv@example.com"]);
  assert.match(sent.subject, /Background verification/);
  assert.equal(sent.attachments[0].content, pdf);
  for (const [body, configured, expected] of [
    [payload, { ...env, VERIFICATION_TO_EMAIL: "verification@example.com" }, 503],
    [{ ...payload, verificationType: "invented" }, routingEnv, 400],
    [{ ...payload, attachment: null }, routingEnv, 400],
  ]) {
    const result = await call("employee-verification", request({ body }), async () => { throw Error("Must not send"); }, { env: configured });
    assert.equal(result.code, expected);
  }
});
