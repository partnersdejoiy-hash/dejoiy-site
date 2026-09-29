import { useEffect, useRef, useState } from "react";
import Link from "next/link";
const MAX_FILE = 2 * 1024 * 1024;
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () =>
      reject(new Error("The PDF could not be read. Please select it again."));
    reader.readAsDataURL(file);
  });
}
export default function RequestForm({
  kind,
  fields,
  initialValues = {},
  attachment,
  submitLabel = "Send enquiry",
  intro,
}) {
  const [values, setValues] = useState(initialValues);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState(null);
  const started = useRef(0);
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const requestId = useRef(null);
  useEffect(() => {
    started.current = Date.now();
  }, []);
  useEffect(() => {
    setValues((v) => ({ ...v, ...initialValues }));
  }, [JSON.stringify(initialValues)]);
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setErrors({});
    setStatus(null);
    try {
      if (attachment?.required && !file)
        throw new Error("Please attach the authorisation letter as a PDF.");
      if (
        file &&
        (file.size > MAX_FILE ||
          !file.name.toLowerCase().endsWith(".pdf") ||
          (file.type && file.type !== "application/pdf"))
      )
        throw new Error("Please choose a PDF up to 2 MB.");
      const payload = {
        ...values,
        consent: formRef.current.elements.consent.checked,
        startedAt: started.current,
        website: formRef.current.elements.website.value,
        requestId:
          requestId.current || (requestId.current = crypto.randomUUID()),
      };
      if (file)
        payload.attachment = {
          content: await readFile(file),
          filename: file.name,
          type: file.type || "application/pdf",
        };
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 25000);
      let response;
      try {
        response = await fetch("/api/" + kind, {
          signal: controller.signal,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } finally {
        clearTimeout(timeout);
      }
      const result = await response
        .json()
        .catch(() => ({
          error: "The server response could not be read. Please try again.",
        }));
      if (!response.ok) {
        setErrors(result.fields || {});
        throw new Error(
          result.error || "Your request could not be sent. Please try again.",
        );
      }
      setStatus({
        ok: true,
        message: `Your request has been accepted for email delivery to our team. Reference: ${result.reference}.`,
      });
      setValues(initialValues);
      setFile(null);
      formRef.current.reset();
      requestId.current = null;
      started.current = Date.now();
    } catch (error) {
      setStatus({
        ok: false,
        message:
          error.name === "AbortError"
            ? "The request timed out. Please retry; duplicate delivery is prevented for an unchanged request."
            : error.message || "Connection failed. Please try again.",
      });
    } finally {
      setBusy(false);
      setTimeout(() => statusRef.current?.focus(), 0);
    }
  }
  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="space-y-5 relative"
      aria-busy={busy}
    >
      {intro && (
        <p className="text-sm text-slate-400 leading-relaxed">{intro}</p>
      )}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${kind}-website`}>Leave this field empty</label>
        <input
          id={`${kind}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {fields.map((f) => (
          <div key={f.name} className={f.wide ? "sm:col-span-2" : ""}>
            <label className="form-label" htmlFor={`${kind}-${f.name}`}>
              {f.label}
              {f.required !== false ? " *" : " (optional)"}
            </label>
            {f.options ? (
              <select
                id={`${kind}-${f.name}`}
                name={f.name}
                className="field w-full"
                value={values[f.name] || ""}
                required={f.required !== false}
                onChange={(e) => {
                  setValues({ ...values, [f.name]: e.target.value });
                  requestId.current = null;
                }}
                aria-invalid={!!errors[f.name]}
                aria-describedby={
                  errors[f.name] ? `${kind}-${f.name}-error` : undefined
                }
              >
                <option value="">Select an option</option>
                {f.options.map((o) => (
                  <option key={o.value || o} value={o.value || o}>
                    {o.label || o}
                  </option>
                ))}
              </select>
            ) : f.multiline ? (
              <textarea
                id={`${kind}-${f.name}`}
                name={f.name}
                value={values[f.name] || ""}
                onChange={(e) => {
                  setValues({ ...values, [f.name]: e.target.value });
                  requestId.current = null;
                }}
                className="field w-full"
                rows={5}
                minLength={10}
                maxLength={4000}
                placeholder={f.placeholder}
                required={f.required !== false}
                aria-invalid={!!errors[f.name]}
                aria-describedby={
                  errors[f.name] ? `${kind}-${f.name}-error` : undefined
                }
              />
            ) : (
              <input
                id={`${kind}-${f.name}`}
                name={f.name}
                type={f.type || "text"}
                value={values[f.name] || ""}
                onChange={(e) => {
                  setValues({ ...values, [f.name]: e.target.value });
                  requestId.current = null;
                }}
                className="field w-full"
                autoComplete={f.autoComplete || "off"}
                maxLength={f.type === "email" ? 254 : 150}
                placeholder={f.placeholder}
                required={f.required !== false}
                aria-invalid={!!errors[f.name]}
                aria-describedby={
                  errors[f.name] ? `${kind}-${f.name}-error` : undefined
                }
              />
            )}{" "}
            {errors[f.name] && (
              <p className="field-error" id={`${kind}-${f.name}-error`}>
                {errors[f.name]}
              </p>
            )}
          </div>
        ))}
      </div>
      {attachment && (
        <div>
          <label className="form-label" htmlFor={`${kind}-file`}>
            {attachment.label}
            {attachment.required ? " *" : " (optional)"}
          </label>
          <input
            id={`${kind}-file`}
            name="file"
            type="file"
            accept=".pdf,application/pdf"
            required={attachment.required}
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              requestId.current = null;
            }}
            className="field w-full text-sm"
            aria-describedby={`${kind}-file-help`}
          />
          <p id={`${kind}-file-help`} className="text-xs text-slate-400 mt-2">
            PDF only, up to 2 MB. Sent as a private email attachment to the
            DEJOIY team. Do not include government IDs or unrelated sensitive
            information.
          </p>
          {errors.attachment && (
            <p className="field-error">{errors.attachment}</p>
          )}
        </div>
      )}
      <label className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 accent-purple-400"
        />
        <span>
          {kind === "employee-verification"
            ? "I confirm I am authorised to request this verification and share the attached letter. "
            : "I agree to share these details with DEJOIY to respond to this request. "}
          I have read the{" "}
          <Link href="/privacy" className="text-blue-200 underline">
            privacy notice
          </Link>
          .
        </span>
      </label>
      {status && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role={status.ok ? "status" : "alert"}
          className={`form-status ${status.ok ? "border-emerald-400/40 bg-emerald-400/5" : "border-rose-400/40 bg-rose-400/5"}`}
        >
          {status.message}
          {!status.ok && (
            <p className="mt-2">
              You can also contact{" "}
              <a
                className="text-blue-200 underline"
                href="mailto:hello@corp.dejoiy.com"
              >
                hello@corp.dejoiy.com
              </a>
              .
            </p>
          )}
        </div>
      )}
      <button
        type="submit"
        disabled={busy}
        className="button-primary w-full disabled:opacity-50 disabled:cursor-wait"
      >
        {busy ? "Sending securely…" : submitLabel}
      </button>
      <p className="text-xs text-slate-400">
        * Required fields. Please send only information relevant to your
        request.
      </p>
    </form>
  );
}
