import { motion } from "framer-motion";
import { fadeInUp } from "../animations/fadeInUp";

export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-12`}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-highlight">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-5xl font-bold leading-tight gradient-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-white/70">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}