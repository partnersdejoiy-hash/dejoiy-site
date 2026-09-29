import { motion } from "framer-motion";
export default function PageIntro({ eyebrow, title, description, children }) {
  return (
    <section className="page-intro">
      <div className="section-wrap relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
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
