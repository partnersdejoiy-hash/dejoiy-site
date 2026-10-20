import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import PremiumScene from "./PremiumScene";

const lines = [
  { text: "Human at heart.", accent: false },
  { text: "Exceptional", accent: true },
  { text: "by design.", accent: false },
];

export default function HeroSection() {
  const reduced = useReducedMotion();
  return (
    <section className="universe-hero" aria-labelledby="hero-title">
      <div className="section-wrap universe-hero-inner">
        <div className="hero-copy" data-hero-copy>
          <motion.p
            className="hero-kicker"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="status-dot" aria-hidden="true" />
            People. Purpose. Possibility.
          </motion.p>
          <h1 id="hero-title" aria-label="Human at heart. Exceptional by design.">
            {lines.map((line, i) => (
              <span className="hero-line" aria-hidden="true" key={line.text}>
                <motion.span
                  className={line.accent ? "hero-serif" : undefined}
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.18 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero-description">
              Customer support, back-office work and human-in-the-loop AI,
              delivered by people who care about getting it right. DEJOIY
              brings your customer experience into orbit.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="button-primary">
                Build with DEJOIY
                <span className="btn-orb" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </Link>
              <Link href="/services" className="button-ghost">
                Explore our services
              </Link>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="hero-panel-slot"
          initial={reduced ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <PremiumScene />
        </motion.div>
      </div>
      <div className="section-wrap hero-baseline">
        <span>BPO &amp; customer experience</span>
        <span className="hero-tagline">YOU + JOY</span>
        <a href="#our-approach">
          Begin the journey <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
