import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpRight,
  FileCheck2,
  Mail,
  ClipboardCheck,
} from "lucide-react";
import SEO from "../../components/SEO";
import HelpRoutes from "../../components/HelpRoutes";
import { helpFAQs } from "../../data/help";
export default function Help() {
  const [query, setQuery] = useState("");
  const faqs = helpFAQs.filter((f) =>
    `${f.question} ${f.answer} ${f.category}`
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <SEO
        title="Help & Documents"
        description="Find the right team, request employee documents, check verification requirements and explore DEJOIY guides."
      />
      <section className="help-hero section-wrap">
        <div>
          <Link href="/" className="help-breadcrumb">
            DEJOIY / SUPPORT CENTRE
          </Link>
          <span className="badge mt-8 mb-5">People first. Every step.</span>
          <h1>
            Good support starts
            <br />
            with a <span className="gradient-text">clear next step.</span>
          </h1>
          <p>
            Here for your business. Here for your career.
            <br className="hidden sm:block" /> Here when you need a little help.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a href="#find-help" className="button-primary">
              Find the right team <ArrowUpRight size={17} />
            </a>
            <Link href="/help/track" className="button-secondary">
              Track a request
            </Link>
          </div>
        </div>
        <div className="help-hero-card">
          <div className="flex justify-between items-center">
            <span className="eyebrow">A little clarity goes a long way</span>
            <FileCheck2 className="text-cyan-300" />
          </div>
          <h2>
            Your next step,
            <br />
            made simple.
          </h2>
          {[
            [Mail, "Choose your request", "Find the right place to start."],
            [
              ClipboardCheck,
              "Know what to prepare",
              "See exactly what the team needs.",
            ],
            [
              FileCheck2,
              "Get the right next step",
              "Clear guidance throughout the process.",
            ],
          ].map(([Icon, t, d], i) => (
            <div className="help-mini-step" key={t}>
              <span>
                <Icon size={18} />
              </span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <small>0{i + 1}</small>
            </div>
          ))}
          <p className="help-card-foot">
            No account needed to explore or enquire.
          </p>
        </div>
      </section>
      <section id="find-help" className="section-wrap pb-16 scroll-mt-28">
        <div className="section-heading-row">
          <div>
            <span className="eyebrow">START HERE</span>
            <h2 className="text-3xl font-semibold mt-3">
              What brings you to DEJOIY?
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm">
            Four clear paths. The right team.
            <br />
            Less searching, more moving forward.
          </p>
        </div>
        <HelpRoutes />
      </section>
      <section className="section-wrap help-faq-section">
        <div>
          <span className="eyebrow">Answers, without the wait</span>
          <h2 className="section-title mt-4">
            A few things
            <br />
            you might be asking.
          </h2>
          <p className="section-copy">Find a quick answer before you start.</p>
          <label className="help-search">
            <Search size={19} aria-hidden="true" />
            <span className="sr-only">Search help topics</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search letters, careers, privacy…"
              type="search"
            />
          </label>
          <p className="text-xs text-slate-400 mt-3" aria-live="polite">
            {faqs.length} matching topics
          </p>
        </div>
        <div className="help-faqs">
          {faqs.map((f) => (
            <details key={f.question}>
              <summary>
                {f.question}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.answer}</p>
              {f.href && <Link href={f.href}>{f.label} ↗</Link>}
            </details>
          ))}
          {!faqs.length && (
            <div className="help-empty">
              <h3>No matching topics yet.</h3>
              <p>Try “letter” or “verification”, or contact our team.</p>
              <button
                className="button-secondary mt-4"
                onClick={() => setQuery("")}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>
      <section className="section-wrap py-16">
        <div className="help-resource-banner">
          <div>
            <span className="eyebrow">Practical ideas. Open access.</span>
            <h2>
              Useful knowledge,
              <br />
              ready when you are.
            </h2>
            <p>Explore guides and checklists before your next conversation.</p>
          </div>
          <Link href="/resources" className="button-secondary">
            Visit the resource library <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
