import { motion } from "framer-motion";
import Link from "next/link";
import BackgroundFX from "./BackgroundFX";
import { ArrowRight } from "lucide-react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      <BackgroundFX />

      <div className="section-wrap relative z-10 py-28 md:py-32 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-5xl"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="badge">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6B5CFF] inline-block" />
              Premium Global AI + BPO Infrastructure
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.04] tracking-tight"
          >
            Transforming global<br />
            <span className="gradient-text">operations with</span><br />
            <span className="gradient-text">AI + humans.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base md:text-lg text-white/55 leading-relaxed"
          >
            DEJOIY helps companies scale support, AI services and operations globally —
            combining intelligent automation with human precision.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#05071a] hover:bg-white/90 transition-all duration-200 shadow-sm"
            >
              Speak with an expert
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.05] px-6 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/[0.09] transition-all duration-200"
            >
              Explore services
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-16 flex flex-wrap items-center gap-8"
          >
            {[
              { value: "250+", label: "Enterprise clients" },
              { value: "38+", label: "Countries" },
              { value: "4200+", label: "Agents onboarded" },
              { value: "120M+", label: "AI models trained" }
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-xs text-white/40 tracking-wide">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05071a] to-transparent pointer-events-none" />
    </section>
  );
}
