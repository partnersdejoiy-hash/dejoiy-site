import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Mail,
  ShieldCheck,
  ArrowUpRight,
  Download,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import {
  documentTypes,
  documentStatuses,
  findDocumentType,
} from "../data/document-types.mjs";
export async function portalFetch(action, body, query = "") {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(`/api/documents/${action}${query}`, {
      signal: controller.signal,
      ...(body
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        : {}),
    });
    const data = await response
      .json()
      .catch(() => ({
        error: "The response could not be read. Please try again.",
      }));
    if (!response.ok)
      throw Object.assign(
        new Error(data.error || "The request could not be completed."),
        { status: response.status },
      );
    return data;
  } catch (error) {
    if (error.name === "AbortError")
      throw new Error(
        "The request timed out. Refresh to check whether it was saved before trying again.",
      );
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
export async function portalFile(file) {
  if (!file) return undefined;
  if (
    file.size > 2097152 ||
    !file.name.toLowerCase().endsWith(".pdf") ||
    (file.type && file.type !== "application/pdf")
  )
    throw new Error("Choose a PDF up to 2 MB.");
  const content = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(new Error("The file could not be read."));
    reader.readAsDataURL(file);
  });
  return { filename: file.name, type: "application/pdf", content };
}
export function PortalNotice({ message, error = false }) {
  return message ? (
    <p
      role={error ? "alert" : "status"}
      className={`form-status my-5 ${error ? "border-rose-400/40" : "border-cyan-300/30"}`}
    >
      {message}
    </p>
  ) : null;
}
export function EmailAccess({ staff = false }) {
  const [email, setEmail] = useState(""),
    [busy, setBusy] = useState(false),
    [status, setStatus] = useState(null);
  const started = useRef(Date.now());
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const data = await portalFetch("start", {
        email,
        staff,
        startedAt: started.current,
        website: e.currentTarget.elements.website.value,
      });
      setStatus({ message: data.message });
    } catch (err) {
      setStatus({ message: err.message, error: true });
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="portal-panel">
      <span className="help-icon">
        <Mail size={23} />
      </span>
      <h2 className="text-2xl font-semibold mt-5">
        {staff ? "Staff access" : "Start with your email"}
      </h2>
      <p className="text-slate-400 text-sm leading-relaxed mt-3">
        {staff
          ? "Access is limited to approved DEJOIY reviewers."
          : "We’ll email a private, single-use link. No password or public website account is needed."}
      </p>
      <label className="form-label mt-6" htmlFor="access-email">
        {staff ? "Approved work email" : "Your email address"}
      </label>
      <input
        id="access-email"
        className="field w-full"
        type="email"
        autoComplete="email"
        required
        maxLength={254}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <button disabled={busy} className="button-primary w-full mt-5">
        {busy ? "Sending…" : "Email me an access link"}
        <ArrowUpRight size={17} />
      </button>
      <PortalNotice {...status} />
      <p className="text-xs text-slate-400 mt-4">
        Links expire after 15 minutes. Only open links you requested. See our{" "}
        <Link href="/privacy" className="underline">
          privacy notice
        </Link>
        .
      </p>
    </form>
  );
}
export function PortalOffline({ staff = false }) {
  return (
    <div className="portal-panel">
      <span className="help-icon">
        <Mail size={23} />
      </span>
      <h2 className="text-2xl font-semibold mt-5">
        {staff
          ? "The review desk is not active yet."
          : "Following up on an email request?"}
      </h2>
      <p className="text-slate-400 leading-relaxed mt-4">
        {staff
          ? "Private storage and approved reviewer access must be configured before this desk can accept requests."
          : "Online status tracking is not available yet. Our team can help by email — include the reference from your original submission."}
      </p>
      <div className="flex flex-wrap gap-3 mt-6">
        <a className="button-primary" href="mailto:hello@corp.dejoiy.com">
          Contact the team <ArrowUpRight size={16} />
        </a>
        <Link className="button-secondary" href="/help">
          Back to help
        </Link>
      </div>
    </div>
  );
}
export function usePortalSession(enabled) {
  const [session, setSession] = useState(null),
    [loading, setLoading] = useState(enabled),
    [error, setError] = useState("");
  useEffect(() => {
    if (!enabled) return;
    let active = true;
    portalFetch("session")
      .then((s) => {
        if (active) setSession(s);
      })
      .catch((e) => {
        if (active && e.status !== 401) setError(e.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [enabled]);
  return { session, setSession, loading, error };
}
export function RequestComposer({
  initialType = "experience-letter",
  session,
}) {
  const [type, setType] = useState(initialType),
    [busy, setBusy] = useState(false),
    [status, setStatus] = useState(null),
    [saved, setSaved] = useState(null);
  const clientKey = useRef(null);
  const requestType = findDocumentType(type);
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    const form = e.currentTarget;
    setBusy(true);
    setStatus(null);
    try {
      const values = Object.fromEntries(new FormData(form));
      const result = await portalFetch("create", {
        ...values,
        type,
        consent: form.elements.consent.checked,
        clientKey:
          clientKey.current || (clientKey.current = crypto.randomUUID()),
        attachment: await portalFile(form.elements.attachment.files[0]),
      });
      setSaved(result);
      form.reset();
    } catch (error) {
      setStatus({ message: error.message, error: true });
    } finally {
      setBusy(false);
    }
  }
  if (saved)
    return (
      <div className="portal-panel">
        <CheckCircle2 className="text-emerald-300" size={32} />
        <h2 className="text-2xl font-semibold mt-5">Your request is saved.</h2>
        <p className="text-slate-300 mt-3">
          Reference{" "}
          <span className="break-all font-mono text-sm">{saved.id}</span>
        </p>
        <p className="text-sm text-slate-400 mt-3">
          {saved.notificationAccepted
            ? "The team notification was accepted for email delivery."
            : "The request is safely stored, but the team notification could not be sent. Contact our team with this reference if you need help."}
        </p>
        <Link
          href={{ pathname: "/help/track", query: { request: saved.id } }}
          className="button-primary mt-6"
        >
          View your request <ArrowUpRight size={17} />
        </Link>
      </div>
    );
  return (
    <div className="portal-panel">
      <div className="flex flex-wrap justify-between gap-3">
        <h2 className="text-2xl font-semibold">Your document request</h2>
        <Link href="/help/track" className="text-sm text-blue-200">
          Your requests ↗
        </Link>
      </div>
      <p className="text-sm text-slate-400 mt-3 break-all">
        Verified email: {session.email}
      </p>
      <form
        onSubmit={submit}
        onChange={() => {
          clientKey.current = null;
        }}
        className="mt-6 space-y-5"
      >
        <div>
          <label className="form-label" htmlFor="request-type">
            Request type *
          </label>
          <select
            id="request-type"
            className="field w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {documentTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
        </div>
        <div className="document-checklist">
          <h3>Before you submit</h3>
          <ul>
            {requestType.checklist.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p>{requestType.note}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {[
            ["name", "Employee full name", true],
            ["employeeId", "Employee ID", false],
            ["location", "Employment location", true],
            ...(requestType.attachmentRequired
              ? [["company", "Requesting organisation", true]]
              : []),
          ].map(([name, label, required]) => (
            <div key={name}>
              <label className="form-label" htmlFor={`doc-${name}`}>
                {label} {required ? "*" : "(optional)"}
              </label>
              <input
                id={`doc-${name}`}
                name={name}
                className="field w-full"
                required={required}
                maxLength={name === "employeeId" ? 100 : 150}
              />
            </div>
          ))}
        </div>
        <div>
          <label className="form-label" htmlFor="doc-message">
            What do you need? *
          </label>
          <textarea
            id="doc-message"
            name="message"
            rows={5}
            required
            minLength={10}
            maxLength={4000}
            className="field w-full"
            placeholder="Include relevant employment dates, the scope of the request and any deadline."
          />
        </div>
        <PDFInput required={requestType.attachmentRequired} />
        <label className="flex gap-3 items-start text-sm text-slate-300">
          <input className="mt-1" type="checkbox" name="consent" required />
          <span>
            I am authorised to submit these details and have read the{" "}
            <Link className="underline" href="/privacy">
              privacy notice
            </Link>
            .
          </span>
        </label>
        <PortalNotice {...status} />
        <button className="button-primary w-full" disabled={busy}>
          {busy ? "Saving securely…" : "Submit document request"}
        </button>
      </form>
    </div>
  );
}
export function PDFInput({
  required = false,
  label = "Supporting document",
  id = "portal-file",
}) {
  return (
    <div>
      <label className="form-label" htmlFor={id}>
        {label} {required ? "*" : "(optional)"}
      </label>
      <input
        id={id}
        name="attachment"
        type="file"
        accept=".pdf,application/pdf"
        required={required}
        className="field w-full text-sm"
        aria-describedby={`${id}-help`}
      />
      <p id={`${id}-help`} className="text-xs text-slate-400 mt-2">
        PDF only, up to 2 MB. Available only through authorised request access.
        Do not include government IDs, bank details or unrelated personal
        information.
      </p>
    </div>
  );
}
export function RequestDetails({ record, session, onRefresh }) {
  const [busy, setBusy] = useState(false),
    [notice, setNotice] = useState(null);
  const staff = session.role === "staff";
  const r = record.request;
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setBusy(true);
    setNotice(null);
    try {
      const result = await portalFetch(staff ? "update" : "reply", {
        ...data,
        id: r.id,
        version: r.version,
        releaseConfirmed: !!form.elements.releaseConfirmed?.checked,
        attachment: await portalFile(form.elements.attachment.files[0]),
      });
      form.reset();
      await onRefresh();
      setNotice({
        message:
          result.notificationAccepted === false
            ? "Update saved. The notification email could not be sent; the status is available here."
            : "Update saved.",
      });
    } catch (error) {
      setNotice({ message: error.message, error: true });
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="portal-panel">
      <div className="flex flex-wrap justify-between gap-3">
        <span className={`request-status status-${r.status}`}>
          {documentStatuses[r.status]}
        </span>
        <span className="text-xs text-slate-400">
          Updated {new Date(r.updated_at).toLocaleDateString("en-GB")}
        </span>
      </div>
      <h2 className="text-2xl font-semibold mt-5">
        {findDocumentType(r.type)?.title}
      </h2>
      <p className="font-mono text-xs text-slate-400 break-all mt-3">{r.id}</p>
      <dl className="request-details">
        {Object.entries(r.details)
          .filter(([, value]) => value)
          .map(([key, value]) => (
            <div key={key}>
              <dt>
                {{
                  name: "Employee name",
                  employeeId: "Employee ID",
                  location: "Location",
                  company: "Organisation",
                  message: "Request details",
                }[key] || key}
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
      </dl>
      <h3 className="font-semibold mt-8">Documents</h3>
      {record.files.length ? (
        <div className="space-y-3 mt-3">
          {record.files.map((f) => (
            <a
              key={f.id}
              className="document-download"
              href={`/api/documents/download?id=${r.id}&file=${f.id}`}
            >
              <Download size={18} />
              <span>
                {f.kind === "released"
                  ? "Document from DEJOIY"
                  : "Supporting document"}
                <small>
                  {f.filename} · PDF · {Math.ceil(f.size / 1024)} KB
                </small>
              </span>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-400 mt-3">No documents attached.</p>
      )}
      <h3 className="font-semibold mt-8">Request history</h3>
      <ol className="request-timeline">
        {record.events.map((event, i) => (
          <li key={i}>
            <Clock3 size={15} />
            <div>
              <strong>
                {documentStatuses[event.action] ||
                  {
                    reply: "Additional information received",
                    staff_view: "Staff accessed request",
                    file_download: "Document downloaded",
                    review_record: "Review record",
                  }[event.action] ||
                  event.action}
              </strong>
              <time>
                {new Date(event.created_at).toLocaleString("en-GB")}
                {staff && event.actor ? ` · ${event.actor}` : ""}
              </time>
              {event.message && <p>{event.message}</p>}
            </div>
          </li>
        ))}
      </ol>
      {(staff || r.status === "needs_information") && (
        <form
          key={r.version}
          onSubmit={submit}
          className="border-t border-white/10 pt-7 mt-7 space-y-5"
        >
          <h3 className="text-xl font-semibold">
            {staff ? "Review this request" : "Send the missing information"}
          </h3>
          {staff && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label" htmlFor="review-status">
                  Status
                </label>
                <select
                  id="review-status"
                  name="status"
                  className="field w-full"
                  defaultValue={r.status}
                >
                  {Object.entries(documentStatuses).map(([id, label]) => (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="review-owner">
                  Assigned owner
                </label>
                <select
                  id="review-owner"
                  name="owner"
                  className="field w-full"
                  defaultValue={r.owner || ""}
                >
                  <option value="">Unassigned</option>
                  {session.owners.map((email) => (
                    <option key={email}>{email}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div>
            <label className="form-label" htmlFor="review-message">
              {staff ? "Update visible to the requester" : "Your reply"} *
            </label>
            <textarea
              id="review-message"
              name="message"
              required
              maxLength={4000}
              rows={4}
              className="field w-full"
            />
          </div>
          <PDFInput
            label={
              staff
                ? "Approved document to release on completion"
                : "Additional supporting document"
            }
            id="reply-file"
          />
          {staff && (
            <label className="flex gap-3 text-sm text-slate-300">
              <input className="mt-1" type="checkbox" name="releaseConfirmed" />
              <span>
                I have checked the employment records, requester authority and
                any document being released. Required before marking completed.
              </span>
            </label>
          )}
          <button className="button-primary" disabled={busy}>
            {busy
              ? "Saving…"
              : staff
                ? "Save review update"
                : "Send additional information"}
          </button>
        </form>
      )}
      <PortalNotice {...notice} />
    </div>
  );
}
export function RequestDesk({ enabled, staff = false, selectedId }) {
  const { session, setSession, loading, error } = usePortalSession(enabled);
  const [requests, setRequests] = useState([]),
    [record, setRecord] = useState(null),
    [selected, setSelected] = useState(selectedId || ""),
    [notice, setNotice] = useState(null),
    [fetching, setFetching] = useState(false),
    [next, setNext] = useState(null),
    [filter, setFilter] = useState("all");
  const detailGeneration = useRef(0);
  async function list(append = false) {
    setFetching(true);
    try {
      const data = await portalFetch(
        "requests",
        null,
        append && next ? `?before=${next}` : "",
      );
      setRequests((old) =>
        append ? [...old, ...data.requests] : data.requests,
      );
      setNext(data.next);
    } catch (e) {
      setNotice({ message: e.message, error: true });
    } finally {
      setFetching(false);
    }
  }
  async function detail(id, refresh = false) {
    const generation = ++detailGeneration.current;
    setSelected(id);
    if (!refresh) setRecord(null);
    try {
      const data = await portalFetch(
        "request",
        null,
        `?id=${encodeURIComponent(id)}`,
      );
      if (generation === detailGeneration.current) setRecord(data);
    } catch (e) {
      if (generation === detailGeneration.current)
        setNotice({ message: e.message, error: true });
    }
  }
  useEffect(() => {
    if (session) {
      list();
      if (selectedId) detail(selectedId);
    }
  }, [session, selectedId]);
  if (!enabled) return <PortalOffline staff={staff} />;
  if (loading)
    return (
      <p role="status" className="portal-panel">
        Checking private access…
      </p>
    );
  if (!session)
    return (
      <>
        <PortalNotice message={error} error />
        <EmailAccess staff={staff} />
      </>
    );
  if (staff && session.role !== "staff")
    return (
      <div className="portal-panel">
        <h2>Staff access is required.</h2>
        <button
          className="button-secondary mt-5"
          onClick={async () => {
            try {
              await portalFetch("logout", {});
              setSession(null);
            } catch (e) {
              setNotice({ message: e.message, error: true });
            }
          }}
        >
          End requester session
        </button>
        <PortalNotice {...notice} />
      </div>
    );
  return (
    <>
      <div className="portal-toolbar">
        <p className="text-sm text-slate-300 break-all">
          {session.role === "staff" ? "Review desk" : "Private requests"} ·{" "}
          {session.email}
        </p>
        <div className="flex flex-wrap gap-3">
          {session.role !== "staff" && (
            <Link href="/employee-documents" className="button-secondary">
              New request
            </Link>
          )}
          <button className="button-secondary" onClick={() => list()}>
            Refresh
          </button>
          <button
            className="button-secondary"
            onClick={async () => {
              try {
                await portalFetch("logout", {});
                setSession(null);
                setRequests([]);
                setRecord(null);
              } catch (e) {
                setNotice({ message: e.message, error: true });
              }
            }}
          >
            End session
          </button>
        </div>
      </div>
      <PortalNotice {...notice} />
      <div className="request-desk">
        <aside className="portal-panel">
          <h2 className="text-xl font-semibold mb-5">
            {staff ? "Request queue" : "Your requests"}
          </h2>
          <label className="sr-only" htmlFor="status-filter">
            Filter requests by status
          </label>
          <select
            id="status-filter"
            className="field w-full mb-5"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All statuses</option>
            {Object.entries(documentStatuses).map(([v, t]) => (
              <option key={v} value={v}>
                {t}
              </option>
            ))}
          </select>
          {fetching && (
            <p role="status" className="text-sm text-slate-400">
              Loading requests…
            </p>
          )}
          {requests
            .filter((r) => filter === "all" || r.status === filter)
            .map((r) => (
              <button
                key={r.id}
                onClick={() => detail(r.id)}
                aria-pressed={selected === r.id}
                className="request-list-item"
              >
                <span className={`request-status status-${r.status}`}>
                  {documentStatuses[r.status]}
                </span>
                <strong>{findDocumentType(r.type)?.title}</strong>
                <small>
                  {new Date(r.created_at).toLocaleDateString("en-GB")} ·{" "}
                  {r.id.slice(0, 8)}
                </small>
              </button>
            ))}
          {!fetching &&
            !requests.filter((r) => filter === "all" || r.status === filter)
              .length && (
              <p className="text-sm text-slate-400">
                No requests in this view. Email-only submissions do not appear
                here.
              </p>
            )}
          {next && (
            <button
              className="button-secondary mt-4"
              disabled={fetching}
              onClick={() => list(true)}
            >
              Load more requests
            </button>
          )}
        </aside>
        {record ? (
          <RequestDetails
            key={record.request.id}
            record={record}
            session={session}
            onRefresh={async () => {
              await detail(record.request.id, true);
              await list();
            }}
          />
        ) : (
          <div className="portal-panel flex flex-col justify-center items-center text-center">
            <ShieldCheck size={36} className="text-cyan-300" />
            <h2 className="text-2xl font-semibold mt-5">
              Your information stays private.
            </h2>
            <p className="text-slate-400 mt-3">
              Select a request to see its history, next steps and documents.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
