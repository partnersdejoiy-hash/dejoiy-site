import test from "node:test";
import assert from "node:assert/strict";
import { createHandler } from "../lib/form-handler.mjs";

// resend@3 drops its own headers when options.headers is set; the API key must survive.
test("form delivery keeps the API key next to the Idempotency-Key", async () => {
  let headers;
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (_url, opts) => {
    headers = new Headers(opts.headers);
    return new Response(JSON.stringify({ id: "email_123" }), { status: 200 });
  };
  try {
    const handler = createHandler("contact", {
      env: { RESEND_API_KEY: "re_test_key", FROM_EMAIL: "a@b.com" },
      rateLimit: () => true,
    });
    const res = { setHeader() {}, status(c) { this.code = c; return this; }, json(b) { this.body = b; return this; } };
    await handler(
      {
        method: "POST",
        headers: { host: "x", "content-type": "application/json" },
        body: { name: "QA", email: "qa@example.com", company: "X", country: "IN", service: "other", message: "Testing the delivery path.", consent: true, startedAt: Date.now() - 5000, requestId: "abcdefghijklmnopqrstuvwx" },
      },
      res,
    );
    assert.equal(res.code, 200);
    assert.equal(headers.get("authorization"), "Bearer re_test_key");
    assert.equal(headers.get("idempotency-key"), "contact-abcdefghijklmnopqrstuvwx");
  } finally {
    globalThis.fetch = realFetch;
  }
});
