import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Check, ArrowLeft } from "lucide-react";
import PageIntro from "./PageIntro";
import SEO from "./SEO";
import RequestForm from "./RequestForm";
import VerificationForm from "./VerificationForm";
import {
  EmailAccess,
  RequestComposer,
  PortalNotice,
  usePortalSession,
} from "./DocumentPortal";
import { documentTypes, findDocumentType } from "../data/document-types.mjs";
export default function EmployeeDocumentPage({
  enabled,
  verification = false,
}) {
  const [type, setType] = useState(
    verification ? "employment-verification" : "experience-letter",
  );
  const selected = findDocumentType(type);
  const { session, loading, error } = usePortalSession(enabled);
  return (
    <>
      <SEO
        title={verification ? "Employment verification" : "Employee documents"}
        description={
          verification
            ? "Submit an authorised employment verification request with clear requirements."
            : "Request employment letters, clearance updates and help from the DEJOIY people team."
        }
      />
      <PageIntro
        eyebrow="Help & Documents"
        title={
          verification
            ? "The right information. With the right permission."
            : "Your next chapter, with clarity."
        }
        description={
          verification
            ? "A dedicated route for organisations requesting an employment check. Start with the employee’s authorisation."
            : "Request employment documents, follow up on clearance or get help with a final-pay query."
        }
      />
      <section className="section-wrap pb-20">
        <Link
          className="text-sm text-blue-200 inline-flex gap-2 mb-8"
          href="/help"
        >
          <ArrowLeft size={17} /> All support options
        </Link>
        <div className="document-layout">
          <aside>
            <div className="document-type-list">
              {(verification
                ? documentTypes.filter(
                    (t) => t.id === "employment-verification",
                  )
                : documentTypes.filter(
                    (t) => t.id !== "employment-verification",
                  )
              ).map((t) => (
                <button
                  key={t.id}
                  aria-pressed={type === t.id}
                  onClick={() => setType(t.id)}
                >
                  <span>{t.title}</span>
                  <small>{t.description}</small>
                </button>
              ))}
            </div>
            <div className="document-checklist mt-5">
              <ShieldCheck size={24} className="text-cyan-300" />
              <h2 className="mt-4">What you’ll need</h2>
              <ul>
                {selected.checklist.map((c) => (
                  <li key={c}>
                    <Check size={15} aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
              <p>{selected.note}</p>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mt-5">
              Turnaround depends on record checks and the request. The people
              team will confirm the next step after review.
            </p>
            <Link href="/help/track" className="button-secondary mt-5">
              Following up on a request?
            </Link>
          </aside>
          <div>
            {enabled ? (
              loading ? (
                <p role="status">Checking access…</p>
              ) : session?.role === "requester" ? (
                <RequestComposer
                  key={type}
                  initialType={type}
                  session={session}
                />
              ) : (
                <>
                  <PortalNotice message={error} error />
                  {session?.role === "staff" ? (
                    <div className="portal-panel">
                      <p>
                        You currently have staff access. End that session in the
                        review desk before requesting a document as an
                        individual.
                      </p>
                      <Link
                        href="/staff/documents"
                        className="button-secondary mt-5"
                      >
                        Open review desk
                      </Link>
                    </div>
                  ) : (
                    <EmailAccess />
                  )}
                </>
              )
            ) : (
              <div className="portal-panel">
                <span className="eyebrow">Send to the people team</span>
                <h2 className="text-2xl font-semibold mt-3 mb-4">
                  {selected.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  Your request is sent to our team by email. Keep the reference
                  for follow-up; online status tracking is not available yet.
                </p>
                {verification ? (
                  <VerificationForm />
                ) : (
                  <RequestForm
                    key={type}
                    kind="employee-documents"
                    submitLabel="Send document request"
                    initialValues={{ requestType: type }}
                    fields={[
                      {
                        name: "name",
                        label: "Employee full name",
                        autoComplete: "name",
                      },
                      {
                        name: "email",
                        label: "Your email",
                        type: "email",
                        autoComplete: "email",
                      },
                      {
                        name: "employeeId",
                        label: "Employee ID",
                        required: false,
                      },
                      { name: "location", label: "Employment location" },
                      {
                        name: "message",
                        label: "What do you need?",
                        multiline: true,
                        wide: true,
                        placeholder:
                          "Include relevant dates and any deadline. Do not include bank or government ID details.",
                      },
                    ]}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
