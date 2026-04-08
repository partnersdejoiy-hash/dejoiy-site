import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundFX from "./BackgroundFX";
import {
  ArrowRight, Brain, Headphones, ShieldCheck, Globe,
  Zap, Database, TrendingUp, Sparkles
} from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const floatingBadges = [
  { icon: <Brain size={13} />, label: "AI Operations", delay: 0, top: "22%", right: "8%" },
  { icon: <Headphones size={13} />, label: "Customer Support", delay: 0.4, top: "40%", right: "3%" },
  { icon: <ShieldCheck size={13} />, label: "Trust & Safety", delay: 0.8, top: "58%", right: "10%" },
  { icon: <Database size={13} />, label: "Data Pipelines", delay: 0.2, top: "30%", left: "2%" },
  { icon: <Globe size={13} />, label: "38+ Countries", delay: 0.6, top: "50%", left: "5%" },
  { icon: <TrendingUp size={13} />, label: "Revenue Ops", delay: 1.0, top: "68%", left: "1%" },
];

function FloatingBadge({ icon, label, delay, ...pos }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute hidden xl:flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] backdrop-blur-md px-3 py-1.5 text-[11.5px] text-white/70"
      style={{
        ...pos,
        animation: `float ${5 + delay * 2}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      <span className="text-[#b8aaff]">{icon}</span>
      {label}
    </motion.div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      <BackgroundFX />

      {floatingBadges.map((badge) => (
        <FloatingBadge key={badge.label} {...badge} />
      ))}

      <div className="section-wrap relative z-10 py-28 md:py-36 w-full">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl">
          <motion.div variants={fadeUp} className="mb-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6B5CFF]/30 bg-[#6B5CFF]/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#b8aaff]">
              <Sparkles size={12} className="animate-pulse" />
              Premium Global AI + BPO Infrastructure
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(3rem,8vw,6.5rem)] font-bold leading-[1.02] tracking-tight"
          >
            Transforming global<br />
            <span className="relative">
              <span className="gradient-text">operations with</span>
            </span>
            <br />
            <span className="gradient-text">AI + humans.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-lg text-base md:text-[18px] text-white/50 leading-relaxed"
          >
            DEJOIY helps companies scale support, AI services and operations
            globally — combining intelligent automation with human precision.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[#05071a] shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-300"
            >
              <span className="relative z-10">Speak with an expert</span>
              <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-gradient-to-r from-white via-white to-[#f0f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.04] px-7 py-3.5 text-[14px] font-medium text-white/75 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.25] transition-all duration-300"
            >
              Explore services
              <ArrowRight size={15} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-20 pt-8 border-t border-white/[0.06] flex flex-wrap items-center gap-x-10 gap-y-6"
          >
            {[
              { value: "250+", label: "Enterprise clients" },
              { value: "38+", label: "Countries served" },
              { value: "4,200+", label: "Agents onboarded" },
              { value: "120M+", label: "AI models trained" }
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-[2rem] font-bold gradient-text tracking-tight leading-none stat-number">
                  {stat.value}
                </span>
                <span className="text-[11.5px] text-white/35 tracking-wide">{stat.label}</span>
              </div>
            ))}

            <div className="ml-auto hidden sm:flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-2.5">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-[#05071a] bg-gradient-to-br from-[#2E7BFF] to-[#6B5CFF]"
                  />
                ))}
              </div>
              <span className="text-[11.5px] text-white/45 ml-1">Trusted by 250+ enterprises</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#05071a] to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
