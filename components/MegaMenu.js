import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function MegaMenu({ open, items }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 w-full rounded-2xl p-3"
          style={{
            background: "rgba(255, 246, 232, 0.97)",
            backdropFilter: "blur(28px) saturate(160%)",
            WebkitBackdropFilter: "blur(28px) saturate(160%)",
            border: "1px solid rgba(20, 20, 20, 0.385)",
            boxShadow: "0 24px 64px rgba(20, 20, 20, 0.165), inset 0 1px 0 rgba(20, 20, 20, 0.018)"
          }}
        >
          <div className="grid grid-cols-3 gap-1">
            {items.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group flex items-start gap-3 rounded-xl px-3.5 py-3 transition-all duration-200"
                style={{ background: "transparent" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    background: "rgba(47, 107, 255, 0.12)",
                    border: "1px solid rgba(47, 107, 255, 0.5)",
                    color: "#2f6bff"
                  }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[13px] font-medium leading-tight" style={{ color: "#3f3f3f" }}>
                    {item.title}
                    {item.href?.startsWith("http") && (
                      <ArrowUpRight size={10} style={{ color: "#6b6b6b" }} />
                    )}
                  </div>
                  <p className="mt-1 text-[11.5px] leading-relaxed line-clamp-2" style={{ color: "#141414" }}>
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
