import { motion, useReducedMotion } from "framer-motion";
export default function PageIntro({ eyebrow, title, description, children }) {
  const reduced = useReducedMotion();
  return (
    <section className="page-intro">
      <div className="intro-orbits" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="section-wrap relative">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="badge mb-5">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
