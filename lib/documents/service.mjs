import { createHash, randomBytes, randomUUID } from "node:crypto";
import { Resend } from "resend";
import { database, portalConfigured } from "./store.mjs";
import {
  ensure,
  PortalError,
  validEmail,
  validId,
  field,
  validatePDF,
  validateRequest,
} from "./validation.mjs";
import { documentStatuses } from "../../data/document-types.mjs";
export const hash = (text) => createHash("sha256").update(text).digest("hex");
const secret = () => randomBytes(32).toString("base64url");
const cookieName = (env) =>
  env.NODE_ENV === "production"
    ? "__Host-dejoiy-documents"
    : "dejoiy-documents";
export const staffEmails = (env) =>
  (env.DOCUMENTS_STAFF_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(validEmail);
const audit = (db, id, actor, action, message = "", visible = false) =>
  db.query(
    "INSERT INTO document_events(request_id,actor,action,message,public) VALUES($1,$2,$3,$4,$5)",
    [id, actor, action, message, visible],
  );
export function createPortal({
  db = database,
  env = process.env,
  send,
  now = () => Date.now(),
} = {}) {
  const mailer =
    send ||
    ((payload, options) =>
      new Resend(env.RESEND_API_KEY).emails.send(payload, options));
  async function mail(to, subject, text) {
    const result = await mailer({
      from: `DEJOIY <${env.FROM_EMAIL}>`,
      to: [to],
      subject,
      text,
    });
    ensure(
      !result?.error && result?.data?.id,
      502,
      "The email could not be accepted for delivery. Please try again.",
    );
  }
  async function limit(key, max, seconds) {
    const bucket = hash(key);
    const { rows } = await db.query(
      `INSERT INTO document_limits(key,hits,expires_at) VALUES($1,1,$2)
   ON CONFLICT(key) DO UPDATE SET hits=CASE WHEN document_limits.expires_at < $3 THEN 1 ELSE document_limits.hits+1 END,
   expires_at=CASE WHEN document_limits.expires_at < $3 THEN $2 ELSE document_limits.expires_at END RETURNING hits`,
      [bucket, new Date(now() + seconds * 1000), new Date(now())],
    );
    ensure(
      rows[0].hits <= max,
      429,
      "Too many attempts. Please wait before trying again.",
    );
  }
  async function session(req) {
    const cookies = String(req.headers.cookie || "")
      .split(";")
      .map((c) => c.trim().split("="));
    const token = cookies.find(([k]) => k === cookieName(env))?.[1];
    ensure(
      token && /^[A-Za-z0-9_-]{43}$/.test(token),
      401,
      "Please verify your email to continue.",
    );
    const { rows } = await db.query(
      "SELECT email,role FROM document_sessions WHERE hash=$1 AND expires_at>$2",
      [hash(token), new Date(now())],
    );
    const s = rows[0];
    ensure(
      s && (s.role !== "staff" || staffEmails(env).includes(s.email)),
      401,
      "Your access has expired. Please request a new email link.",
    );
    return { ...s, token };
  }
  async function requestById(s, id, client = db, lock = false) {
    ensure(validId(id), 404, "Request not found.");
    const { rows } = await client.query(
      `SELECT * FROM document_requests WHERE id=$1 AND expires_at>$2 AND ($3::boolean OR email=$4)${lock ? " FOR UPDATE" : ""}`,
      [id, new Date(now()), s.role === "staff", s.email],
    );
    ensure(rows[0], 404, "Request not found.");
    return rows[0];
  }
  const origin = env.DOCUMENTS_SITE_URL || "https://business.dejoiy.com";
  const cookie = (token, age) =>
    `${cookieName(env)}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${age}${env.NODE_ENV === "production" ? "; Secure" : ""}`;
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "private, no-store, max-age=0");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
    try {
      ensure(
        portalConfigured(env),
        503,
        "Private tracking is not available yet. Please use the email request form or contact our team.",
      );
      const action = req.query.action;
      const getActions = ["session", "requests", "request", "download"];
      const postActions = [
        "start",
        "verify",
        "create",
        "reply",
        "update",
        "logout",
      ];
      ensure(
        getActions.includes(action) || postActions.includes(action),
        404,
        "Page not found.",
      );
      const expectedMethod = getActions.includes(action) ? "GET" : "POST";
      if (req.method !== expectedMethod) {
        res.setHeader("Allow", expectedMethod);
        throw new PortalError(405, "Method not allowed.");
      }
      if (expectedMethod === "POST") {
        const expectedOrigin = new URL(origin).origin;
        ensure(
          req.headers.origin === expectedOrigin,
          403,
          "Please submit this request from the DEJOIY website.",
        );
        ensure(
          String(req.headers["content-type"] || "")
            .toLowerCase()
            .startsWith("application/json"),
          415,
          "Expected a JSON submission.",
        );
        ensure(
          req.body && typeof req.body === "object" && !Array.isArray(req.body),
          400,
          "Invalid request.",
        );
      }
      const body = req.body || {};
      const ip = String(
        req.headers["x-forwarded-for"] ||
          req.socket?.remoteAddress ||
          "unknown",
      )
        .split(",")[0]
        .trim();
      if (action === "start") {
        ensure(
          validEmail(body.email),
          400,
          "Please enter a valid email address.",
        );
        ensure(
          !body.website &&
            Number.isFinite(body.startedAt) &&
            now() - body.startedAt >= 1500,
          400,
          "Please review your email and try again.",
        );
        const email = body.email.trim().toLowerCase();
        const role = body.staff === true ? "staff" : "requester";
        await limit(`start-ip:${ip}`, 10, 900);
        await limit(`start-email:${email}`, 3, 900);
        await limit("start-global", 100, 86400);
        const generic = {
          message:
            "If this address is eligible, an access link will be emailed. Check your inbox and spam folder. The link expires after 15 minutes.",
        };
        if (role === "staff" && !staffEmails(env).includes(email))
          return res.status(200).json(generic);
        const token = secret();
        await db.query(
          "INSERT INTO document_tokens(hash,email,role,expires_at) VALUES($1,$2,$3,$4)",
          [hash(token), email, role, new Date(now() + 900000)],
        );
        try {
          await mail(
            email,
            "Your private DEJOIY access link",
            `Open this link to confirm access to ${role === "staff" ? "the staff review desk" : "your document requests"}:\n\n${origin}/help/access#${token}\n\nThis link expires in 15 minutes and can be used once. If you did not request it, ignore this message. Do not forward the link. Mailbox access does not establish authority to obtain employment information.`,
          );
        } catch (error) {
          await db.query("DELETE FROM document_tokens WHERE hash=$1", [
            hash(token),
          ]);
          throw error;
        }
        return res.status(200).json(generic);
      }
      if (action === "verify") {
        await limit(`verify:${ip}`, 20, 900);
        ensure(
          typeof body.token === "string" &&
            /^[A-Za-z0-9_-]{43}$/.test(body.token),
          400,
          "This link is invalid. Request a new access link.",
        );
        const token = secret();
        const s = await db.transaction(async (tx) => {
          const { rows } = await tx.query(
            "DELETE FROM document_tokens WHERE hash=$1 AND expires_at>$2 RETURNING email,role",
            [hash(body.token), new Date(now())],
          );
          ensure(
            rows[0],
            400,
            "This link has expired or has already been used. Request a new link.",
          );
          ensure(
            rows[0].role !== "staff" ||
              staffEmails(env).includes(rows[0].email),
            403,
            "Staff access is not available for this address.",
          );
          await tx.query(
            "INSERT INTO document_sessions(hash,email,role,expires_at) VALUES($1,$2,$3,$4)",
            [
              hash(token),
              rows[0].email,
              rows[0].role,
              new Date(now() + (rows[0].role === "staff" ? 3600000 : 28800000)),
            ],
          );
          return rows[0];
        });
        res.setHeader(
          "Set-Cookie",
          cookie(token, s.role === "staff" ? 3600 : 28800),
        );
        return res.status(200).json({ role: s.role });
      }
      const s = await session(req);
      if (action === "logout") {
        await db.query("DELETE FROM document_sessions WHERE hash=$1", [
          hash(s.token),
        ]);
        res.setHeader("Set-Cookie", cookie("", 0));
        return res.status(200).json({ ok: true });
      }
      if (action === "session")
        return res.status(200).json({
          email: s.email,
          role: s.role,
          ...(s.role === "staff" ? { owners: staffEmails(env) } : {}),
        });
      if (action === "requests") {
        const before =
          typeof req.query.before === "string" && validId(req.query.before)
            ? req.query.before
            : null;
        const { rows } = await db.query(
          `SELECT id,type,status,owner,version,created_at,updated_at FROM document_requests WHERE expires_at>$1 AND ($2::boolean OR email=$3) AND ($4::uuid IS NULL OR created_at < (SELECT created_at FROM document_requests WHERE id=$4 AND ($2::boolean OR email=$3))) ORDER BY created_at DESC LIMIT 51`,
          [new Date(now()), s.role === "staff", s.email, before],
        );
        return res.status(200).json({
          requests: rows.slice(0, 50),
          next: rows.length > 50 ? rows[49].id : null,
        });
      }
      if (action === "request") {
        const r = await requestById(s, req.query.id);
        const events = await db.query(
          "SELECT actor,action,message,created_at,public FROM document_events WHERE request_id=$1 AND ($2::boolean OR public=true) ORDER BY id",
          [r.id, s.role === "staff"],
        );
        const files = await db.query(
          "SELECT id,filename,kind,octet_length(content) AS size,created_at FROM document_files WHERE request_id=$1",
          [r.id],
        );
        if (s.role === "staff") await audit(db, r.id, s.email, "staff_view");
        return res.status(200).json({
          request: {
            ...r,
            client_key: undefined,
            payload_hash: undefined,
            owner: s.role === "staff" ? r.owner : undefined,
          },
          events: events.rows.map((e) => ({
            ...e,
            actor: s.role === "staff" ? e.actor : undefined,
          })),
          files: files.rows,
        });
      }
      if (action === "download") {
        await requestById(s, req.query.id);
        ensure(validId(req.query.file), 404, "File not found.");
        const { rows } = await db.query(
          "SELECT filename,content FROM document_files WHERE request_id=$1 AND id=$2",
          [req.query.id, req.query.file],
        );
        ensure(rows[0], 404, "File not found.");
        await audit(db, req.query.id, s.email, "file_download");
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("X-Content-Type-Options", "nosniff");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${rows[0].filename}"`,
        );
        return res.status(200).send(Buffer.from(rows[0].content));
      }
      await limit(`mutation:${s.email}`, 40, 3600);
      if (action === "create") {
        ensure(
          s.role === "requester",
          403,
          "Use a requester email link to submit a document request.",
        );
        const input = validateRequest(body);
        const digest = hash(
          JSON.stringify({
            type: input.type,
            details: input.details,
            file: input.bytes?.toString("base64") || null,
          }),
        );
        const id = randomUUID();
        const record = await db.transaction(async (tx) => {
          const inserted = await tx.query(
            `INSERT INTO document_requests(id,email,type,details,client_key,payload_hash) VALUES($1,$2,$3,$4,$5,$6) ON CONFLICT(email,client_key) DO NOTHING RETURNING id`,
            [
              id,
              s.email,
              input.type,
              JSON.stringify(input.details),
              body.clientKey,
              digest,
            ],
          );
          if (!inserted.rows.length) {
            const { rows } = await tx.query(
              "SELECT id,payload_hash FROM document_requests WHERE email=$1 AND client_key=$2",
              [s.email, body.clientKey],
            );
            ensure(
              rows[0]?.payload_hash === digest,
              409,
              "This request changed. Reload the form before submitting again.",
            );
            return { id: rows[0].id, existing: true };
          }
          if (input.bytes)
            await tx.query(
              "INSERT INTO document_files(id,request_id,filename,content,kind) VALUES($1,$2,$3,$4,$5)",
              [
                randomUUID(),
                id,
                "supporting-document.pdf",
                input.bytes,
                "supporting",
              ],
            );
          await audit(
            tx,
            id,
            s.email,
            "received",
            "Your request is saved. HR will review the details and authorisation before releasing information.",
            true,
          );
          return { id, existing: false };
        });
        let notified = true;
        if (!record.existing)
          try {
            await mail(
              env.DOCUMENTS_NOTIFY_EMAIL || staffEmails(env)[0],
              "A document request needs review",
              `A new request is ready in the private staff desk.\n${origin}/staff/documents\nReference: ${record.id}\nNo personal details or attachments are included in this notification.`,
            );
          } catch {
            notified = false;
          }
        return res
          .status(200)
          .json({ id: record.id, notificationAccepted: notified });
      }
      if (action === "reply") {
        ensure(
          s.role === "requester",
          403,
          "Use staff review actions for this request.",
        );
        const message = field(body.message, "Your reply", 4000);
        const bytes = validatePDF(body.attachment);
        await db.transaction(async (tx) => {
          const r = await requestById(s, body.id, tx, true);
          ensure(
            r.status === "needs_information",
            409,
            "This request is not waiting for additional information.",
          );
          if (bytes)
            await tx.query(
              "INSERT INTO document_files(id,request_id,filename,content,kind) VALUES($1,$2,$3,$4,$5)",
              [
                randomUUID(),
                r.id,
                "additional-information.pdf",
                bytes,
                "supporting",
              ],
            );
          await tx.query(
            "UPDATE document_requests SET status='under_review',version=version+1,updated_at=now() WHERE id=$1",
            [r.id],
          );
          await audit(tx, r.id, s.email, "reply", message, true);
        });
        return res.status(200).json({ ok: true });
      }
      if (action === "update") {
        ensure(s.role === "staff", 403, "Staff access is required.");
        ensure(
          Object.hasOwn(documentStatuses, body.status),
          400,
          "Choose a valid status.",
        );
        ensure(
          body.owner === "" || staffEmails(env).includes(body.owner),
          400,
          "Choose an authorised owner.",
        );
        const message = field(body.message, "Update for requester", 4000);
        const bytes = validatePDF(body.attachment);
        ensure(
          !bytes || body.status === "completed",
          400,
          "Release a document only when completing the request.",
        );
        ensure(
          body.status !== "completed" || body.releaseConfirmed === true,
          400,
          "Confirm that employment records and authority have been reviewed.",
        );
        const recipient = await db.transaction(async (tx) => {
          const r = await requestById(s, body.id, tx, true);
          ensure(
            Number.isInteger(body.version) && body.version === r.version,
            409,
            "Another reviewer updated this request. Refresh before saving.",
          );
          if (bytes)
            await tx.query(
              "INSERT INTO document_files(id,request_id,filename,content,kind) VALUES($1,$2,$3,$4,$5)",
              [randomUUID(), r.id, "dejoiy-document.pdf", bytes, "released"],
            );
          await tx.query(
            "UPDATE document_requests SET status=$1,owner=$2,version=version+1,updated_at=now() WHERE id=$3",
            [body.status, body.owner || null, r.id],
          );
          await audit(tx, r.id, s.email, body.status, message, true);
          await audit(
            tx,
            r.id,
            s.email,
            "review_record",
            `Owner: ${body.owner || "Unassigned"}. Authorisation review confirmed: ${body.releaseConfirmed === true}.`,
          );
          return r.email;
        });
        let notified = true;
        try {
          await mail(
            recipient,
            "Your DEJOIY request has an update",
            `Your document request has been updated. Open the private request centre and request an email access link to view it.\n${origin}/help/track\nReference: ${body.id}\nFor privacy, no employment information is included in this email.`,
          );
        } catch {
          notified = false;
        }
        return res
          .status(200)
          .json({ ok: true, notificationAccepted: notified });
      }
    } catch (error) {
      if (!(error instanceof PortalError))
        console.error("Document request failed", {
          action: req.query.action,
          errorType: error.name || "Error",
          code: /^[A-Z0-9]{5}$/.test(error.code || "") ? error.code : "unknown",
        });
      if (error.status === 429) res.setHeader("Retry-After", "900");
      return res
        .status(error instanceof PortalError ? error.status : 503)
        .json({
          error:
            error instanceof PortalError
              ? error.message
              : "The private request service is temporarily unavailable. Please try again or contact our team.",
        });
    }
  };
}
