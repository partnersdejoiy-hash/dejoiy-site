import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
export default function CallToAction() {
  const reduced = useReducedMotion();
  return (
    <section className="interior-cta">
      <div className="section-wrap">
        <span className="intro-label">Your next chapter starts here</span>
        <motion.h2
          initial={reduced ? false : { y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Let’s make
          <br />a connection<span>.</span>
        </motion.h2>
        <div className="cta-bottom">
          <p>
            Bring the challenge. We’ll work through
            <br />
            the possibilities, together.
          </p>
          <Link href="/contact" className="button-primary">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
