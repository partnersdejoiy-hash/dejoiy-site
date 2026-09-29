import { findDocumentType } from "../../data/document-types.mjs";
export class PortalError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
export function ensure(test, status, message) {
  if (!test) throw new PortalError(status, message);
}
export const validEmail = (value) =>
  typeof value === "string" &&
  value.length <= 254 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const validId = (value) =>
  typeof value === "string" &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
export function field(value, label, max = 150, optional = false) {
  ensure(
    typeof value === "string" || (optional && value == null),
    400,
    `${label} is required.`,
  );
  const result = (value || "").trim();
  ensure(
    (optional || result.length > 0) &&
      result.length <= max &&
      !/\x00/.test(result),
    400,
    `Please check ${label.toLowerCase()} (maximum ${max} characters).`,
  );
  return result;
}
export function validatePDF(file, required = false) {
  if (!file) {
    ensure(!required, 400, "Please attach the employee authorisation letter.");
    return null;
  }
  ensure(
    typeof file.content === "string" &&
      file.content.length > 0 &&
      file.content.length <= 2796204 &&
      file.content.length % 4 === 0 &&
      /^[A-Za-z0-9+/]+={0,2}$/.test(file.content) &&
      file.type === "application/pdf" &&
      typeof file.filename === "string" &&
      file.filename.toLowerCase().endsWith(".pdf"),
    400,
    "Please attach a PDF up to 2 MB.",
  );
  const bytes = Buffer.from(file.content, "base64");
  ensure(
    bytes.length <= 2097152 &&
      bytes.subarray(0, 5).toString() === "%PDF-" &&
      bytes.subarray(-1024).toString().includes("%%EOF"),
    400,
    "Please attach a valid PDF up to 2 MB.",
  );
  return bytes;
}
export function validateRequest(body) {
  const type = findDocumentType(body.type);
  ensure(type, 400, "Please choose a supported request type.");
  ensure(
    body.consent === true,
    400,
    "Please confirm your permission to submit this request.",
  );
  ensure(
    validId(body.clientKey),
    400,
    "Please refresh the form and try again.",
  );
  const details = {
    name: field(body.name, "Full name"),
    employeeId: field(body.employeeId, "Employee ID", 100, true),
    location: field(body.location, "Employment location"),
    message: field(body.message, "Request details", 4000),
    company: field(
      body.company,
      "Organisation",
      150,
      !type.attachmentRequired,
    ),
  };
  ensure(
    details.message.length >= 10,
    400,
    "Please provide at least 10 characters about your request.",
  );
  return {
    type: type.id,
    details,
    bytes: validatePDF(body.attachment, type.attachmentRequired),
  };
}
