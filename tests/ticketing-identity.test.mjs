import test from "node:test";
import assert from "node:assert/strict";
import { createVerificationTicket } from "../lib/ticketing.mjs";

test("production uses server workload identity without a shared secret", async () => {
  const env = { VERCEL: "1", VERCEL_ENV: "production", ORBITDESK_URL: "https://orbitdesk.dejoiy.com" };
  let calls = 0;
  const fetcher = async (url, options) => {
    calls++;
    assert.equal(url.origin, env.ORBITDESK_URL);
    assert.equal(options.redirect, "error");
    assert.equal(options.headers.Authorization, "Bearer test-identity-only");
    assert.equal(options.headers["X-DEJOIY-Signature"], undefined);
    return Response.json({ success: true, ticketNumber: "DJ-BGV-0123456789ABCDEF" });
  };
  const options = { env, fetcher, getIdentityToken: async () => "test-identity-only" };
  assert.equal(await createVerificationTicket({}, {}, "request", options), "DJ-BGV-0123456789ABCDEF");
  for (const changes of [{ VERCEL_ENV: "preview" }, { VERCEL: "" }, { ORBITDESK_URL: "https://other.example" }]) {
    await assert.rejects(createVerificationTicket({}, {}, "request", { ...options, env: { ...env, ...changes } }));
  }
  await assert.rejects(createVerificationTicket({}, {}, "request", { ...options, getIdentityToken: async () => "" }));
  assert.equal(calls, 1);
});
