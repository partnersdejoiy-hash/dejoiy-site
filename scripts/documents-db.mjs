import { readFile } from "node:fs/promises";
import { getPool } from "../lib/documents/store.mjs";
// Supply DATABASE_URL through the environment; never paste it into source or logs.
const pool = getPool();
try {
  if (process.argv.includes("--cleanup")) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query(
        "DELETE FROM document_requests WHERE expires_at < now()",
      );
      await client.query(
        "DELETE FROM document_tokens WHERE expires_at < now()",
      );
      await client.query(
        "DELETE FROM document_sessions WHERE expires_at < now()",
      );
      await client.query(
        "DELETE FROM document_limits WHERE expires_at < now()",
      );
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
    console.log("Expired document records cleaned up.");
  } else {
    await pool.query(
      await readFile(
        new URL("../lib/documents/schema.sql", import.meta.url),
        "utf8",
      ),
    );
    console.log("Document schema is ready.");
  }
} catch {
  console.error(
    "Database operation failed. Check configuration and database access.",
  );
  process.exitCode = 1;
} finally {
  await pool.end();
}
