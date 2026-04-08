import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function MegaMenu({ open, items, centered = false }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`${
            centered
              ? "mt-2 w-full rounded-2xl border border-white/[0.08] bg-[#0a0c22]/95 backdrop-blur-2xl shadow-mega p-4"
              : "absolute left-0 top-full mt-2 w-[720px] rounded-2xl border border-white/[0.08] bg-[#0a0c22]/95 backdrop-blur-2xl shadow-mega p-4"
          }`}
        >
          <div className="grid grid-cols-3 gap-1.5">
            {items.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group rounded-xl px-4 py-3.5 hover:bg-white/[0.05] transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-white/60 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-200">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-[13px] font-medium text-white/80 group-hover:text-white transition-colors">
                      {item.title}
                      {item.href?.startsWith("http") && (
                        <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                      )}
                    </div>
                    <p className="mt-0.5 text-[11.5px] leading-relaxed text-white/40 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
