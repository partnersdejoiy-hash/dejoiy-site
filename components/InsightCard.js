import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
export default function InsightCard({
  slug,
  category,
  title,
  excerpt,
  image,
  index = 0,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
      className="insight-card"
    >
      <Link href={`/insights/${slug}`} className="group block h-full">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <span className="eyebrow">{category}</span>
          <h3 className="text-xl font-semibold mt-4 leading-snug">{title}</h3>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            {excerpt}
          </p>
          <span className="inline-block mt-6 text-sm text-blue-200">
            Read article <span aria-hidden="true">↗</span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
