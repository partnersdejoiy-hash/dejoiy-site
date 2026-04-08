import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import InsightCard from "../components/InsightCard";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const insights = [
  {
    category: "Articles",
    title: "How AI + human workflows are redefining global operations",
    excerpt: "Why the strongest enterprise models combine automation, governance and people-led judgment.",
    image: "/insights/article-1.jpg"
  },
  {
    category: "Case Studies",
    title: "Scaling customer support for high-growth digital brands",
    excerpt: "A modern framework for support quality, speed and customer loyalty at scale.",
    image: "/insights/article-2.jpg"
  },
  {
    category: "Reports",
    title: "The future of trust & safety operations",
    excerpt: "Emerging challenges, new standards and operational design patterns for digital platforms.",
    image: "/insights/article-3.jpg"
  },
  {
    category: "News",
    title: "DEJOIY expands premium enterprise service capabilities",
    excerpt: "New investments in AI operations, delivery systems and talent acceleration.",
    image: "/insights/article-4.jpg"
  }
];

const topics = ["All", "AI Operations", "Customer Experience", "Trust & Safety", "Case Studies", "Reports"];

export default function InsightsPage() {
  return (
    <div className="min-h-screen">
      <div className="relative py-28 overflow-hidden">
        <div className="section-wrap relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="badge mb-5 inline-flex">Insights</span>
            <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight max-w-4xl">
              Articles, reports<br />and thought leadership
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/50 max-w-xl leading-relaxed">
              Explore ideas, frameworks and updates shaping the future of AI services and enterprise operations.
            </p>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-2">
            {topics.map((topic, i) => (
              <button
                key={topic}
                className={`rounded-full px-4 py-2 text-[12px] font-medium transition-all duration-200 ${
                  i === 0
                    ? "bg-white text-[#020617]"
                    : "border border-white/[0.1] bg-white/[0.04] text-white/55 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="section-wrap pb-24">
        {insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group mb-6 grid md:grid-cols-2 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] cursor-pointer"
          >
            <div className="relative overflow-hidden min-h-[260px]">
              <img
                src={insights[0].image}
                alt={insights[0].title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: "260px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/60 to-transparent" />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="badge badge-blue self-start mb-5">{insights[0].category}</span>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">{insights[0].title}</h2>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">{insights[0].excerpt}</p>
              <div className="mt-6 flex items-center gap-1.5 text-[12px] font-medium text-white/35 group-hover:text-white/70 transition-colors">
                Read article <ArrowUpRight size={12} />
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insights.slice(1).map((item, i) => (
            <InsightCard key={item.title} {...item} index={i} />
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-white/40">More insights and reports are published regularly.</p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/55 hover:text-white transition-colors duration-200"
          >
            Subscribe for updates
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
