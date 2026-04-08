import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-14`}
    >
      {eyebrow && (
        <div className={`mb-4 ${center ? "flex justify-center" : ""}`}>
          <span className="badge">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[15px] md:text-base text-white/45 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
