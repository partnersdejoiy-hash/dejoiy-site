import { timingSafeEqual } from "node:crypto";
import { database } from "./store.mjs";
export async function cleanupDocuments(db = database) {
  return db.transaction(async (tx) => {
    await tx.query("DELETE FROM document_requests WHERE expires_at < now()");
    await tx.query("DELETE FROM document_tokens WHERE expires_at < now()");
    await tx.query("DELETE FROM document_sessions WHERE expires_at < now()");
    await tx.query("DELETE FROM document_limits WHERE expires_at < now()");
  });
}
export function createRetention({ db = database, env = process.env } = {}) {
  return async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed." });
    }
    if (env.DOCUMENTS_ENABLED !== "true")
      return res.status(200).json({ skipped: true });
    const expected = Buffer.from(`Bearer ${env.CRON_SECRET || ""}`),
      provided = Buffer.from(String(req.headers.authorization || ""));
    if (
      !env.CRON_SECRET ||
      env.CRON_SECRET.length < 32 ||
      expected.length !== provided.length ||
      !timingSafeEqual(expected, provided)
    )
      return res.status(401).json({ error: "Not authorised." });
    try {
      await cleanupDocuments(db);
      return res.status(200).json({ ok: true });
    } catch {
      return res
        .status(503)
        .json({ error: "Retention maintenance could not complete." });
    }
  };
}
