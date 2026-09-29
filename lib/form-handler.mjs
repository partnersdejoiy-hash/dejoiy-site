import { createHash, randomUUID } from "node:crypto";
import { Resend } from "resend";
import { verificationRecipient } from "./verification-routing.mjs";
const LIMIT = 2 * 1024 * 1024;
const attempts = new Map();
const allowedServices = new Set([
  "customer-experience",
  "back-office",
  "ai-data-operations",
  "trust-safety",
  "content-moderation",
  "sales-support",
  "ai-model-training",
  "financial-compliance",
  "other",
]);
const allowedRoles = new Set([
  "Customer Experience Specialist",
  "AI Data Operations Analyst",
  "Trust & Safety Associate",
  "Business Operations Manager",
  "General application",
]);
const config = {
  "employee-documents": {
    fields: ["name", "email", "location", "requestType", "message"],
    optional: ["employeeId"],
    long: "message",
    subject: "Employee document request",
    to: "DOCUMENTS_NOTIFY_EMAIL",
  },
  contact: {
    fields: ["name", "email", "company", "country", "service", "message"],
    long: "message",
    subject: "Business enquiry",
    to: "CONTACT_EMAIL",
  },
  careers: {
    fields: ["name", "email", "location", "experience", "role", "message"],
    long: "message",
    subject: "Career application",
    to: "CAREERS_EMAIL",
  },
  "employee-verification": {
    fields: ["company", "email", "employeeName", "purpose"],
    optional: ["employeeId"],
    long: "purpose",
    subject: "Employee verification request",
    to: "VERIFICATION_TO_EMAIL",
  },
};
export const escapeHTML = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
export function validate(kind, body) {
  const c = config[kind];
  const fields = {};
  const values = {};
  for (const name of [...c.fields, ...(c.optional || [])]) {
    const value = body[name];
    const optional = c.optional?.includes(name);
    const max = name === c.long ? 4000 : name === "email" ? 254 : 150;
    if (
      typeof value !== "string" ||
      (!optional && !value.trim()) ||
      value.length > max
    ) {
      if (optional && (value == null || value === "")) {
        values[name] = "";
        continue;
      }
      fields[name] =
        `Please provide ${name === c.long ? "10–4000 characters" : "a valid value within " + max + " characters"}.`;
      continue;
    }
    values[name] = value.trim();
    if (name === c.long && values[name].length < 10)
      fields[name] = "Please provide at least 10 characters.";
    if (name !== c.long && /[\r\n]/.test(value))
      fields[name] = "Please use a single line.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || ""))
    fields.email = "Please enter a valid email address.";
  if (
    kind === "employee-documents" &&
    !["experience-letter", "clearance", "final-pay", "other"].includes(
      values.requestType,
    )
  )
    fields.requestType = "Please choose a listed request type.";
  if (kind === "contact" && !allowedServices.has(values.service))
    fields.service = "Please select a service.";
  if (kind === "careers" && !allowedRoles.has(values.role))
    fields.role = "Please select a listed role.";
  if (body.consent !== true)
    fields.consent =
      "Please confirm the privacy notice and permission to submit.";
  if (kind === "employee-verification") {
    values.verificationType = body.verificationType ?? "employment-verification";
    if (!["employment-verification", "background-verification"].includes(values.verificationType))
      fields.verificationType = "Please choose employment verification or BGV.";
  }
  let attachment;
  if (kind === "employee-verification" && !body.attachment)
    fields.attachment = "An authorisation letter is required.";
  if (body.attachment) {
    const a = body.attachment;
    if (
      kind === "contact" ||
      kind === "employee-documents" ||
      !a ||
      typeof a.content !== "string" ||
      a.content.length > Math.ceil(LIMIT / 3) * 4 ||
      !a.content.length ||
      a.content.length % 4 !== 0 ||
      !/^[A-Za-z0-9+/]+={0,2}$/.test(a.content) ||
      a.type !== "application/pdf" ||
      typeof a.filename !== "string" ||
      !a.filename.toLowerCase().endsWith(".pdf")
    )
      fields.attachment = "Please attach a PDF up to 2 MB.";
    else {
      const bytes = Buffer.from(a.content, "base64");
      if (
        bytes.length > LIMIT ||
        bytes.subarray(0, 5).toString() !== "%PDF-" ||
        !bytes.subarray(-1024).toString().includes("%%EOF")
      )
        fields.attachment = "The attachment must be a valid PDF up to 2 MB.";
      else
        attachment = {
          filename:
            kind === "careers"
              ? "candidate-cv.pdf"
              : "authorization-letter.pdf",
          content: bytes.toString("base64"),
        };
    }
  }
  return { fields, values, attachment };
}
function allow(req) {
  const now = Date.now();
  for (const [key, v] of attempts) {
    if (v.until <= now) attempts.delete(key);
  }
  if (attempts.size > 5000) attempts.delete(attempts.keys().next().value);
  const ip = String(
    req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown",
  )
    .split(",")[0]
    .trim();
  const key = createHash("sha256").update(ip).digest("hex");
  const bucket = attempts.get(key) || { count: 0, until: now + 15 * 60 * 1000 };
  bucket.count++;
  attempts.set(key, bucket);
  return bucket.count <= 5;
}
export function createHandler(
  kind,
  { send, env = process.env, rateLimit = allow } = {},
) {
  return async function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method not allowed." });
    }
    const origin = req.headers.origin;
    if (origin) {
      try {
        if (new URL(origin).host !== req.headers.host)
          return res
            .status(403)
            .json({ error: "Please submit the form from this website." });
      } catch {
        return res.status(403).json({ error: "Invalid request origin." });
      }
    }
    if (
      !String(req.headers["content-type"] || "")
        .toLowerCase()
        .startsWith("application/json")
    )
      return res.status(415).json({ error: "Expected a JSON submission." });
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body))
      return res.status(400).json({ error: "Invalid submission." });
    if (!rateLimit(req)) {
      res.setHeader("Retry-After", "900");
      return res.status(429).json({
        error: "Too many attempts. Please wait 15 minutes before trying again.",
      });
    }
    const body = req.body;
    if (
      body.website ||
      !Number.isFinite(body.startedAt) ||
      Date.now() - body.startedAt < 1500 ||
      body.startedAt > Date.now()
    )
      return res.status(400).json({
        error: "Please take a moment to review the form, then try again.",
      });
    const { fields, values, attachment } = validate(kind, body);
    if (Object.keys(fields).length)
      return res.status(400).json({
        error: "Please check the highlighted fields and attachment.",
        fields,
      });
    if (!env.RESEND_API_KEY)
      return res.status(503).json({
        error:
          "The email service is temporarily unavailable. Please contact us by email.",
      });
    const c = config[kind];
    const reference = /^[a-zA-Z0-9-]{20,80}$/.test(body.requestId || "")
      ? body.requestId
      : randomUUID();
    const to = kind === "employee-verification"
      ? verificationRecipient(values.verificationType, env)
      : env[c.to] || env.CONTACT_EMAIL || "hello@corp.dejoiy.com";
    if (!to)
      return res.status(503).json({ error: "This verification route is temporarily unavailable. Please try again later." });
    const from = env.FROM_EMAIL || "onboarding@resend.dev";
    const rows = Object.entries(values)
      .map(
        ([name, value]) =>
          `<tr><th align="left" style="padding:8px;vertical-align:top">${escapeHTML(name)}</th><td style="padding:8px;white-space:pre-wrap">${escapeHTML(value || "Not provided")}</td></tr>`,
      )
      .join("");
    const mail = {
      from: `DEJOIY <${from}>`,
      to: [to],
      reply_to: values.email,
      subject: `${values.verificationType === "background-verification" ? "Background verification (BGV) request" : c.subject} — ${values.name || values.employeeName}`,
      text:
        `Reference: ${reference}\n\n` +
        Object.entries(values)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n"),
      html: `<div style="font-family:Arial,sans-serif;color:#111"><h2>${c.subject}</h2><p>Reference: ${reference}</p><table>${rows}</table><p>Privacy acknowledgement and submission permission confirmed.</p></div>`,
      ...(attachment ? { attachments: [attachment] } : {}),
    };
    try {
      const deliver =
        send ||
        ((payload, options) =>
          new Resend(env.RESEND_API_KEY).emails.send(payload, options));
      const id = /^[a-zA-Z0-9-]{20,80}$/.test(body.requestId || "")
        ? body.requestId
        : reference;
      const result = await deliver(mail, {
        headers: { "Idempotency-Key": `${kind}-${id}` },
      });
      if (result?.error || !result?.data?.id) {
        console.error("Form delivery rejected", {
          kind,
          reference,
          errorType: result?.error?.name || "missing-message-id",
        });
        return res.status(502).json({
          error:
            "Your request could not be accepted by our email service. Please try again or email our team.",
        });
      }
      return res.status(200).json({ success: true, reference });
    } catch {
      console.error("Form delivery failed", { kind, reference });
      return res.status(502).json({
        error:
          "Your request could not be sent. Please try again or email our team.",
      });
    }
  };
}
