import pg from "pg";
let pool;
export function getPool() {
  if (!process.env.DATABASE_URL)
    throw new Error("Document database is not configured");
  if (!pool) {
    pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 8000,
      query_timeout: 10000,
    });
    pool.on("error", () =>
      console.error("Document database idle connection interrupted"),
    );
  }
  return pool;
}
export const database = {
  query: (sql, args) => getPool().query(sql, args),
  async transaction(fn) {
    const client = await getPool().connect();
    try {
      await client.query("BEGIN");
      const result = await fn(client);
      await client.query("COMMIT");
      return result;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },
};
export function portalConfigured(env = process.env) {
  return (
    env.DOCUMENTS_ENABLED === "true" &&
    !!env.DATABASE_URL &&
    !!env.RESEND_API_KEY &&
    !!env.FROM_EMAIL &&
    !!env.DOCUMENTS_STAFF_EMAILS &&
    (env.CRON_SECRET || "").length >= 32
  );
}
export async function portalAvailable() {
  if (!portalConfigured()) return false;
  try {
    await database.query("SELECT id FROM document_requests LIMIT 0");
    return true;
  } catch {
    return false;
  }
}
