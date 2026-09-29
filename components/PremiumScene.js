import { Component, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
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

// Official MIT-licensed ThreeUI Community renderer; loaded only on capable desktops.
const LiquidForm = dynamic(
  () =>
    import("@designcodeio/threeui/components/LiquidFormBackground").then(
      (m) => m.LiquidFormBackground,
    ),
  { ssr: false, loading: () => null },
);
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
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function PremiumScene() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "40px" });
  const reduced = useReducedMotion();
  const [capable, setCapable] = useState(false);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);
  const [settled, setSettled] = useState(false);
  const [slowDevice, setSlowDevice] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setSettled(true), 1700);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const media = window.matchMedia(
      "(min-width: 900px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const evaluate = () => {
      if (!media.matches || navigator.connection?.saveData) {
        setCapable(false);
        return;
      }
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl", {
        failIfMajorPerformanceCaveat: true,
      });
      setCapable(!!gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
    const visibility = () => setVisible(!document.hidden);
    evaluate();
    visibility();
    media.addEventListener("change", evaluate);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      media.removeEventListener("change", evaluate);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const moving = !reduced && !paused && visible && inView;
  const renderShader = capable && moving && settled && !slowDevice;
  useEffect(() => {
    if (!renderShader) return;
    let frame,
      started = 0,
      frames = 0;
    const deadline = performance.now() + 8000;
    const sample = (time) => {
      if (!ref.current?.querySelector(".dejoiy-liquid canvas")) {
        if (time > deadline) {
          setSlowDevice(true);
          return;
        }
        frame = requestAnimationFrame(sample);
        return;
      }
      if (!started) started = time;
      frames++;
      if (time - started >= 2000) {
        if ((frames * 1000) / (time - started) < 22) setSlowDevice(true);
        return;
      }
      frame = requestAnimationFrame(sample);
    };
    const contextLost = () => setSlowDevice(true);
    const host = ref.current;
    host?.addEventListener("webglcontextlost", contextLost, true);
    frame = requestAnimationFrame(sample);
    return () => {
      cancelAnimationFrame(frame);
      host?.removeEventListener("webglcontextlost", contextLost, true);
    };
  }, [renderShader]);
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
        <div className="scene-halo" />
        <div className="connection-sculpture">
          <span />
          <span />
          <span />
        </div>
        {renderShader && (
          <SceneBoundary>
            <LiquidForm
              className="dejoiy-liquid"
              speed={0.36}
              morph={0.7}
              mouseAmount={0.11}
              camera={5.8}
              tintAmount={0.18}
              tintHue={235}
            />
          </SceneBoundary>
        )}
        <div className="scene-orbit orbit-a">
          <i />
        </div>
        <div className="scene-orbit orbit-b">
          <i />
        </div>
        <div className="scene-coordinate coordinate-one">PEOPLE</div>
        <div className="scene-coordinate coordinate-two">PROCESS</div>
        <div className="scene-coordinate coordinate-three">INTELLIGENCE</div>
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
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
