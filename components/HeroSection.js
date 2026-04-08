import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundFX from "./BackgroundFX";
import dynamic from "next/dynamic";
const NeuralNetworkViz = dynamic(() => import("./NeuralNetworkViz"), { ssr: false });
import { ArrowRight, Sparkles, Brain, Headphones, ShieldCheck, Database, Globe, TrendingUp } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const floatingBadges = [
  { icon: <Brain size={12} />,      label: "AI Operations",    delay: 0,   top: "14%", right: "4%" },
  { icon: <Headphones size={12} />, label: "CX at Scale",      delay: 0.3, top: "38%", right: "1%" },
  { icon: <ShieldCheck size={12} />,label: "Trust & Safety",   delay: 0.6, top: "62%", right: "5%" },
  { icon: <Database size={12} />,   label: "Data Pipelines",   delay: 0.2, top: "20%", left: "0%" },
  { icon: <Globe size={12} />,      label: "38+ Countries",    delay: 0.5, top: "46%", left: "2%" },
  { icon: <TrendingUp size={12} />, label: "Revenue Ops",      delay: 0.8, top: "70%", left: "0%" },
];

function FloatingBadge({ icon, label, delay, ...pos }) {
  return (
    <div className="absolute hidden xl:block z-20" style={pos}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [10, 0, -8, 0, 10] }}
        transition={{
          opacity: { delay: delay + 1.4, duration: 0.6 },
          y: { delay: delay + 1.4, duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }
        }}
        className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] backdrop-blur-md px-2.5 py-1.5 text-[11px] text-white/65 whitespace-nowrap"
      >
        <span className="text-[#b8aaff]">{icon}</span>
        {label}
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      <BackgroundFX />

      <div className="section-wrap relative z-10 py-24 md:py-32 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-[#b8aaff]">
                <Sparkles size={11} className="animate-pulse" />
                Premium Global AI + BPO Infrastructure
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[clamp(2.6rem,6.5vw,5.5rem)] font-bold leading-[1.03] tracking-tight"
            >
              AI services for the<br />
              <span className="gradient-text">intelligent enterprise</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-[16px] text-white/50 leading-relaxed"
            >
              DEJOIY combines intelligent automation with human precision — delivering scalable support, AI operations and back-office excellence globally.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-white px-7 py-3.5 text-[14px] font-semibold text-[#020617] shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-300"
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
              className="mt-12 pt-8 border-t border-white/[0.06] flex flex-wrap gap-x-8 gap-y-5"
            >
              {[
                { value: "250+", label: "Enterprise clients" },
                { value: "38+",  label: "Countries" },
                { value: "4,200+", label: "Agents" },
                { value: "120M+", label: "Models trained" }
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="text-[1.75rem] font-bold gradient-text tracking-tight leading-none stat-number">
                    {stat.value}
                  </span>
                  <span className="text-[11px] text-white/30 tracking-wide">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative hidden lg:flex items-center justify-center min-h-[420px]">
            {floatingBadges.map((badge) => (
              <FloatingBadge key={badge.label} {...badge} />
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <NeuralNetworkViz />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
      >
        <span className="text-[9.5px] uppercase tracking-[0.22em] text-white/20">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
        />
      </motion.div>
    </section>
  );
}
