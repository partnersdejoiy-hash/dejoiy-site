import { useState } from "react";
import PageIntro from "../components/PageIntro";
import InsightCard from "../components/InsightCard";
import { insights } from "../data/insights";
const topics = ["All", ...new Set(insights.map((a) => a.category))];
export default function Insights() {
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("All");
  const items = insights.filter(
    (a) =>
      (topic === "All" || a.category === topic) &&
      `${a.title} ${a.excerpt}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  return (
    <>
      <PageIntro
        eyebrow="Ideas & perspectives"
        title="Better questions. Better operations."
        description="Practical guides to customer experience, AI-assisted workflows and thoughtful service delivery."
      />
      <section className="section-wrap pb-20">
        <label className="help-search mb-6 max-w-xl">
          <span className="sr-only">Search insights</span>
          <input
            type="search"
            placeholder="Search articles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <div
          role="group"
          aria-label="Filter insights"
          className="flex flex-wrap gap-2 mb-6"
        >
          {topics.map((t) => (
            <button
              className={topic === t ? "button-primary" : "button-secondary"}
              aria-pressed={topic === t}
              key={t}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="text-sm text-slate-400 mb-6" aria-live="polite">
          {items.length} {items.length === 1 ? "article" : "articles"} · {topic}
        </p>
        {!items.length && (
          <div className="help-empty mb-6">
            <p>No articles match your search.</p>
            <button
              className="button-secondary mt-4"
              onClick={() => {
                setSearch("");
                setTopic("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((a, i) => (
            <InsightCard key={a.slug} {...a} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
