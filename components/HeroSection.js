import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowDown, ArrowRight } from "lucide-react";
import PremiumScene from "./PremiumScene";
export default function HeroSection() {
  const reduced = useReducedMotion();
  return (
    <section className="bpo-hero premium-hero">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="section-wrap relative z-10 w-full">
        <div className="hero-layout">
          <div className="hero-editorial">
            <div className="hero-kicker">
              <span className="status-dot" /> PEOPLE. PURPOSE. POSSIBILITY.
            </div>
            <h1 aria-label="Human at heart. Exceptional by design.">
              {["Human at", "heart.", "Exceptional", "by design."].map(
                (line, i) => (
                  <span className="hero-line" aria-hidden="true" key={line}>
                    <motion.span
                      className={i > 1 ? "hero-ink" : undefined}
                      initial={reduced ? false : { y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.12 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ),
              )}
            </h1>
            <p className="hero-description">
              Customer experience. Business operations. AI-assisted delivery.
              Connected by people who care about getting it right.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/contact" className="button-primary">
                Build with DEJOIY <ArrowUpRight size={18} />
              </Link>
              <Link href="/services" className="button-secondary">
                Explore our expertise <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-footnote">
              <span>BPO & CUSTOMER EXPERIENCE</span>
              <a href="#our-approach">
                Discover the difference <ArrowDown size={14} />
              </a>
            </div>
          </div>
          <PremiumScene />
        </div>
      </div>
    </section>
  );
}
