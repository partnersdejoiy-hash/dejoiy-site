import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { findService } from "../data/services";
export default function ServiceCard({ slug, title, description, index = 0 }) {
  const service = findService(slug || title);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: (index % 4) * 0.05, duration: 0.45 }}
    >
      <Link
        href={`/services/${service?.slug || "customer-experience"}`}
        className="service-tile group"
      >
        <div className="flex justify-between items-center">
          <span className="service-number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <ArrowUpRight
            size={20}
            className="text-slate-400 group-hover:text-white transition-colors"
          />
        </div>
        <h3 className="mt-8 text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          {description}
        </p>
        <span className="mt-7 inline-flex text-sm text-blue-200">
          Explore service <span className="sr-only">: {title}</span>
        </span>
      </Link>
    </motion.div>
  );
}
