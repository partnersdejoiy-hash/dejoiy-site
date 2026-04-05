import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function MegaMenu({ open, items }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.25 }}
          className="fixed center-[50vw] -translate-x-1/2 top-[88px] w-[860px] max-w-[90vw] rounded-[2rem] glass-strong mega-shadow p-6 overflow-hidden"
        >
          <div className="grid grid-cols-3 gap-4 w-full">
            {items.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="rounded-3xl p-4 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-accent/30 to-highlight/20 flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-highlight transition-colors">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-white/60">{item.description}</p>
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
