import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const capabilities = [
  {
    label: "Customer care",
    title: "Every conversation counts.",
    detail: "Voice, chat and email. One considered customer experience.",
    slug: "customer-experience",
  },
  {
    label: "Operations",
    title: "Clarity in every handoff.",
    detail: "People, playbooks and processes working in the same direction.",
    slug: "back-office",
  },
  {
    label: "Quality",
    title: "Human judgment, built in.",
    detail:
      "Thoughtful review and clear escalation at the moments that matter.",
    slug: "trust-safety",
  },
];

/* Glass "mission panel" floating beside the 3D core in the hero. */
export default function PremiumScene() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const selected = capabilities[active];
  return (
    <div className="bezel mission-panel">
      <div className="bezel-core">
        <div className="mission-top">
          <span>
            <i aria-hidden="true" /> Mission control
          </span>
          <span>DEJOIY / 0{active + 1}</span>
        </div>
        <div className="mission-detail" aria-live="polite" aria-atomic="true">
          <motion.div
            key={selected.slug}
            initial={reduced ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>{selected.title}</h2>
            <p>{selected.detail}</p>
            <Link href={`/services/${selected.slug}`}>
              Explore {selected.label.toLowerCase()}
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
        <div className="mission-switcher" role="group" aria-label="Explore capabilities">
          {capabilities.map((item, i) => (
            <button
              type="button"
              key={item.slug}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
