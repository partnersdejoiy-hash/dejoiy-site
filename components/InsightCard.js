import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function InsightCard({ category, title, excerpt, image, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group glass-card rounded-3xl overflow-hidden cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden bg-white/[0.04]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05071a]/80 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="badge badge-blue text-[10px]">{category}</span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-[15px] font-semibold text-white leading-snug line-clamp-2">{title}</h3>
        <p className="mt-3 text-[13px] text-white/50 leading-relaxed line-clamp-3">{excerpt}</p>
        <div className="mt-5 flex items-center gap-1.5 text-[12px] font-medium text-white/35 group-hover:text-white/70 transition-colors duration-200">
          Read more
          <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.article>
  );
}
