import { useState } from "react";
import PageIntro from "../components/PageIntro";
import InsightCard from "../components/InsightCard";
import { insights } from "../data/insights";
const topics = ["All", ...new Set(insights.map((a) => a.category))];
export default function Insights() {
  const [topic, setTopic] = useState("All");
  const items = insights.filter((a) => topic === "All" || a.category === topic);
  return (
    <>
      <PageIntro
        eyebrow="Ideas & perspectives"
        title="Better questions. Better operations."
        description="Practical guides to customer experience, AI-assisted workflows and thoughtful service delivery."
      />
      <section className="section-wrap pb-20">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((a, i) => (
            <InsightCard key={a.slug} {...a} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
