import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Headphones,
  Workflow,
  BrainCircuit,
  ShieldCheck,
  ScanEye,
  MessagesSquare,
  Network,
  FileCheck2,
} from "lucide-react";
import { findService } from "../data/services";
export default function ServiceCard({ slug, title, description, index = 0 }) {
  const service = findService(slug || title);
  const reduced = useReducedMotion();
  const Icon = [
    Headphones,
    Workflow,
    BrainCircuit,
    ShieldCheck,
    ScanEye,
    MessagesSquare,
    Network,
    FileCheck2,
  ][index % 8];
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: (index % 4) * 0.05, duration: 0.45 }}
    >
      <Link
        href={`/services/${service?.slug || "customer-experience"}`}
        className="service-tile group"
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse") return;
          const rect = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty(
            "--spot-x",
            `${e.clientX - rect.left}px`,
          );
          e.currentTarget.style.setProperty(
            "--spot-y",
            `${e.clientY - rect.top}px`,
          );
        }}
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
        <div className="service-symbol" aria-hidden="true">
          <Icon size={32} strokeWidth={1.3} />
          <span />
        </div>
        <h3 className="mt-5 text-xl font-semibold">{title}</h3>
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
