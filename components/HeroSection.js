import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";
import BackgroundFX from "./BackgroundFX";
import ButtonGlow from "./ButtonGlow";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient bg-[length:200%_200%] animate-gradientShift" />
      <BackgroundFX />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-[20%] h-48 w-48 rounded-full bg-accent/20 blur-3xl animate-float" />
        <div className="absolute right-[10%] top-[15%] h-64 w-64 rounded-full bg-highlight/20 blur-3xl animate-float" />
        <div className="absolute bottom-[10%] left-[25%] h-56 w-56 rounded-full bg-secondary/20 blur-3xl animate-float" />
      </div>

      <div className="section-wrap relative z-10 py-28 md:py-36">
        <div className="max-w-4xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/70"
          >
            Premium Global AI + BPO Infrastructure
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="mt-6 text-5xl font-bold leading-[1.05] md:text-7xl"
          >
            Transforming Global Business Operations with{" "}
            <span className="gradient-text">AI + Human Intelligence</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg md:text-xl text-white/70"
          >
            DEJOIY helps companies scale support, operations and AI-powered services globally.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <ButtonGlow href="/contact">Speak with an expert</ButtonGlow>
            <ButtonGlow href="/services" secondary>
              Explore our services
            </ButtonGlow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}