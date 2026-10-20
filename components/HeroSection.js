import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";

/**
 * HeroSection — an editorial, type-led hero. The fixed CosmosCanvas flies
 * behind it; the orbital system sits deliberately off-centre in the upper
 * right, so the headline and the 3D share one composition. No card grids,
 * no blobs — just type, motion and space.
 */
export default function HeroSection() {
  const ref = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const drift = () => {
      x += (tx - x) * 0.05;
      y += (ty - y) * 0.05;
      if (ref.current) {
        ref.current.style.setProperty("--hx", x.toFixed(3));
        ref.current.style.setProperty("--hy", y.toFixed(3));
      }
      raf = requestAnimationFrame(drift);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(drift);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="u-hero" aria-label="DEJOIY BPO introduction">
      <div className="u-hero-frame section-wrap">
        <p className="u-kicker" data-reveal>
          <span className="u-pulse-dot" aria-hidden="true" />
          People · Purpose · Possibility
        </p>

        <h1 className="u-hero-title" data-lines>
          <span data-line className="u-line">
            Human at <em>heart.</em>
          </span>
          <span data-line className="u-line">
            Exceptional by <em>design.</em>
          </span>
        </h1>

        <div className="u-hero-foot" data-reveal>
          <p className="u-lede">
            Customer experience. Business operations. AI-assisted delivery —
            connected by people who care about getting it right.
          </p>
          <div className="u-hero-ctas">
            <Link href="/contact" className="u-btn-solid">
              Build with DEJOIY <ArrowUpRight size={17} />
            </Link>
            <Link href="/services" className="u-btn-ghost">
              Explore our expertise
            </Link>
          </div>
        </div>

        <div className="u-hero-meta" data-reveal>
          <span>BPO &amp; Customer Experience</span>
          <span className="u-hero-meta-rule" />
          <a href="#capabilities" className="u-scroll-cue">
            Descend <ArrowDown size={14} />
          </a>
        </div>
      </div>

      <p className="u-hero-side" aria-hidden="true">
        DEJOIY / 01 — The Connected Enterprise
      </p>
    </section>
  );
}
