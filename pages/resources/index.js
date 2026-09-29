import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, FileText, BookOpen } from "lucide-react";
import SEO from "../../components/SEO";
import PageIntro from "../../components/PageIntro";
import { resources } from "../../data/resources";
export default function Resources() {
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("All");
  const matches = resources.filter(
    (r) =>
      (category === "All" || r.category === category) &&
      `${r.title} ${r.description} ${r.category}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  return (
    <>
      <SEO
        title="Resource library"
        description="Open DEJOIY guides and downloadable checklists for BPO planning, service delivery and employee verification. No email required."
      />
      <PageIntro
        eyebrow="The DEJOIY resource library"
        title="A little knowledge. A better next move."
        description="Practical guides for better operations and clearer conversations. Read, save and share — no email gate."
      />
      <section className="section-wrap pb-20">
        <div className="resource-toolbar">
          <label className="help-search">
            <Search size={18} />
            <span className="sr-only">Search resources</span>
            <input
              type="search"
              placeholder="Find a guide or checklist…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <Link href="/insights" className="button-secondary">
            <BookOpen size={17} /> Explore articles
          </Link>
        </div>
        <div
          className="flex flex-wrap gap-2 my-7"
          role="group"
          aria-label="Filter resources"
        >
          {["All", ...new Set(resources.map((r) => r.category))].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              className={category === c ? "button-primary" : "button-secondary"}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-400 mb-6" aria-live="polite">
          {matches.length} {matches.length === 1 ? "resource" : "resources"}{" "}
          available
        </p>
        <div className="resource-grid">
          {matches.map((r, i) => (
            <article className="resource-card" key={r.slug}>
              <div className={`resource-cover resource-cover-${i % 3}`}>
                <FileText size={38} strokeWidth={1} />
                <span>
                  DEJOIY
                  <br />
                  FIELD NOTES
                </span>
                <span className="resource-cover-number">
                  0{resources.indexOf(r) + 1}
                </span>
              </div>
              <div className="p-6">
                <span className="eyebrow">{r.category}</span>
                <h2 className="text-xl font-semibold mt-4 leading-snug">
                  <Link href={`/resources/${r.slug}`}>{r.title}</Link>
                </h2>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  {r.description}
                </p>
                <p className="text-xs text-slate-400 mt-6">
                  {r.minutes} min read · TXT · {(r.bytes / 1024).toFixed(1)} KB
                </p>
                <div className="resource-card-actions">
                  <Link href={`/resources/${r.slug}`}>
                    Preview guide <ArrowUpRight size={16} />
                  </Link>
                  <a href={`/resources/${r.filename}`} download>
                    Download TXT
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        {!matches.length && (
          <div className="help-empty">
            <h2 className="text-xl font-semibold">
              No guides match that search.
            </h2>
            <p>Try another topic or browse the full library.</p>
            <button
              className="button-secondary mt-5"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        <div className="help-resource-banner mt-12">
          <div>
            <span className="eyebrow">Put the ideas to work</span>
            <h2>Let’s talk about your operation.</h2>
            <p>
              Bring your questions. We’ll work through the next steps together.
            </p>
          </div>
          <Link href="/contact" className="button-primary">
            Start a conversation <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
