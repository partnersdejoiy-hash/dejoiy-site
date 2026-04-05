import { motion } from "framer-motion";

export default function InsightCard({ category, title, excerpt, image }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="overflow-hidden rounded-[2rem] glass bg-card-gradient-2"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-black/20 px-3 py-1 text-xs uppercase tracking-[0.2em] backdrop-blur-md border border-white/10 text-highlight">
          {category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-4 text-white/65">{excerpt}</p>
        <button className="mt-6 text-sm font-medium text-accent hover:text-white transition-colors">
          Read more →
        </button>
      </div>
    </motion.article>
  );
}