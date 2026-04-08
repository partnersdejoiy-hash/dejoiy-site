import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#020617]"
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <img src="/logo.png" alt="DEJOIY" className="h-12 w-12 object-contain" />
              <motion.div
                className="absolute -inset-3 rounded-full border border-[#7C3AED]/40"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center gap-1"
            >
              <span className="text-base font-bold tracking-tight text-white">DEJOIY</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/35">AI Services · BPO</span>
            </motion.div>

            <motion.div className="w-32 h-[2px] rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#06B6D4]"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            exit={{ scaleX: 1, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
            className="absolute inset-0 origin-left bg-[#020617]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
