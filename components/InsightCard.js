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
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          border: "1px solid rgba(107,92,255,0.25)",
          boxShadow: "0 0 80px rgba(107,92,255,0.06) inset"
        }}
      />

      <div className="relative h-48 overflow-hidden bg-white/[0.03]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale-[30%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/30 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="badge badge-blue text-[10px]">{category}</span>
        </div>
        <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-white/40">
          <Clock size={10} />
          {readTime}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-[15px] font-semibold text-white leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="mt-3 text-[13px] text-white/45 leading-relaxed line-clamp-3">{excerpt}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-white/30 group-hover:text-[#b8aaff] transition-colors duration-300">
            Read article
            <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}
