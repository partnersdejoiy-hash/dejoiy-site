import { motion } from "framer-motion";

export default function InsightCard({ category, title, excerpt }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="rounded-[2rem] glass p-6 bg-card-gradient-2"
    >
      <div className="text-xs uppercase tracking-[0.25em] text-highlight">
        {category}
      </div>
      <h3 className="mt-3 text-xl font-semibold">{title}</h3>
      <p className="mt-4 text-white/65">{excerpt}</p>
      <button className="mt-6 text-sm font-medium text-accent hover:text-white transition-colors">
        Read more →
      </button>
    </motion.article>
  );
}