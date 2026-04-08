import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

export default function InsightCard({ category, title, excerpt, image, index = 0, readTime = "5 min read" }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        background: "rgba(11,18,38,0.85)",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          border: "1px solid rgba(124,58,237,0.4)",
          boxShadow: "0 0 80px rgba(124,58,237,0.1) inset, 0 20px 60px rgba(0,0,0,0.5)"
        }}
      />

      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-[#020617]/35 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="badge badge-blue text-[10px]">{category}</span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px]" style={{ color: "#94a3b8" }}>
          <Clock size={10} />
          {readTime}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-[15px] font-semibold leading-snug line-clamp-2" style={{ color: "#F8FAFC" }}>
          {title}
        </h3>
        <p className="mt-3 text-[13px] leading-relaxed line-clamp-3" style={{ color: "#94a3b8" }}>{excerpt}</p>
        <div className="mt-5 flex items-center justify-between">
          <span
            className="flex items-center gap-1.5 text-[12px] font-medium transition-colors duration-300 group-hover:text-[#c4b5fd]"
            style={{ color: "#64748b" }}
          >
            Read article
            <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
