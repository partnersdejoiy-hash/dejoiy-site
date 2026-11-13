import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Headphones,
  Workflow,
  ShieldCheck,
  Pause,
  Play,
} from "lucide-react";
import Link from "next/link";

const capabilities = [
  {
    label: "Customer care",
    title: "Every conversation counts.",
    detail: "Voice, chat and email. One considered customer experience.",
    slug: "customer-experience",
    icon: Headphones,
  },
  {
    label: "Operations",
    title: "Clarity in every handoff.",
    detail: "People, playbooks and processes working in the same direction.",
    slug: "back-office",
    icon: Workflow,
  },
  {
    label: "Quality",
    title: "Human judgment, built in.",
    detail:
      "Thoughtful review and clear escalation at the moments that matter.",
    slug: "trust-safety",
    icon: ShieldCheck,
  },
];
export default function PremiumScene() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "40px" });
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState(false);
  useEffect(() => {
    const visibility = () => setVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  const moving = !reduced && !paused && visible && inView;
  // Tabs rotate on their own until someone picks one
  useEffect(() => {
    if (!moving || picked) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % capabilities.length), 6500);
    return () => clearTimeout(t);
  }, [moving, picked, active]);
  const selected = capabilities[active];
  const Icon = selected.icon;
  return (
    <div
      ref={ref}
      className={`premium-scene ${moving ? "scene-moving" : "scene-still"}`}
    >
      <div className="scene-topline">
        <span>
          <i /> THE CONNECTED ENTERPRISE
        </span>
        <span>DEJOIY / 01</span>
      </div>
      <div className="scene-art" aria-hidden="true">
        <div className={`stage stage-${active}`} key={active}>
          {active === 0 && <CareStage />}
          {active === 1 && <OpsStage />}
          {active === 2 && <QualityStage />}
        </div>
      </div>
      <button
        type="button"
        className="scene-pause"
        onClick={() => setPaused(!paused)}
        aria-label={paused ? "Play hero animation" : "Pause hero animation"}
        aria-pressed={paused}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
      </button>
      <div className="scene-detail" aria-live="polite" aria-atomic="true">
        <span className="scene-detail-icon">
          <Icon size={21} />
        </span>
        <motion.div
          key={selected.slug}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2>{selected.title}</h2>
          <p>{selected.detail}</p>
          <Link href={`/services/${selected.slug}`}>
            Explore {selected.label.toLowerCase()} <ArrowUpRight size={13} />
          </Link>
        </motion.div>
      </div>
      <div className="scene-switcher" aria-label="Explore capabilities">
        {capabilities.map((item, i) => (
          <button
            type="button"
            key={item.slug}
            aria-pressed={active === i}
            onClick={() => {
              setActive(i);
              setPicked(true);
            }}
          >
            <span>0{i + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// 01 Customer care: a conversation that gets resolved
function CareStage() {
  return (
    <div className="care">
      <div className="care-chips">
        <span>Voice</span>
        <span className="on">Chat</span>
        <span>Email</span>
      </div>
      <p className="bubble bubble-in">Hi! My order still hasn&apos;t arrived.</p>
      <p className="typing">
        <i />
        <i />
        <i />
      </p>
      <p className="bubble bubble-out">Found it. It reaches you tomorrow by 10 am.</p>
      <p className="bubble bubble-in small">That&apos;s perfect, thank you!</p>
      <span className="sticker">Resolved in 2 min</span>
    </div>
  );
}
// 02 Operations: a ticket moves through the board
function OpsStage() {
  return (
    <div className="ops">
      {["Queue", "Working", "Done"].map((c, i) => (
        <div className={`ops-col ops-col-${i}`} key={c}>
          <b>{c}</b>
          <span className="ops-card ghost" />
          <span className="ops-card ghost short" />
        </div>
      ))}
      <span className="ops-mover">
        <b>#4821</b> Refund check
      </span>
      <span className="ops-count">
        <b>128</b> handled today
      </span>
    </div>
  );
}
// 03 Quality: score ring fills, checks tick in
function QualityStage() {
  return (
    <div className="qa">
      <div className="qa-ring">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" className="qa-track" />
          <circle cx="60" cy="60" r="50" className="qa-fill" />
        </svg>
        <span>
          <b>97%</b>QA score
        </span>
      </div>
      <ul>
        <li>Tone checked</li>
        <li>Policy followed</li>
        <li>Escalated on time</li>
      </ul>
    </div>
  );
}
