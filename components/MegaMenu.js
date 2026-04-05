import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function MegaMenu({ open, items, centered = false }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`${
            centered
              ? "mt-4 w-full rounded-[2rem] glass-strong mega-shadow p-6"
              : "absolute left-0 top-full mt-4 w-[860px] rounded-[2rem] glass-strong mega-shadow p-6"
          }`}
        >
          <div className="grid grid-cols-3 gap-4">
            {items.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="rounded-3xl p-5 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-accent/30 to-highlight/20 flex items-center justify-center text-white shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-highlight transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-white/60 leading-relaxed">
                      {item.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm text-accent">
                      Explore <ChevronRight size={16} />
                    </span>
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
