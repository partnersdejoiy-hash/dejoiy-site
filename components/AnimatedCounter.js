import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";

export default function AnimatedCounter({ value, suffix = "", label }) {
  const countRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (!isInView || started.current) return;
    started.current = true;
    const obj = { val: 0 };
    const el = countRef.current;
    if (!el) return;
    const tween = gsap.to(obj, {
      val: value,
      duration: 2.2,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = `${Math.floor(obj.val)}${suffix}`;
      }
    });
    return () => tween.kill();
  }, [isInView, value, suffix]);

  return (
    <div ref={containerRef} className="group py-8 px-6 text-center rounded-3xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300">
      <div
        ref={countRef}
        className="stat-number text-[2.6rem] md:text-5xl font-bold text-white tracking-tight leading-none"
      >
        0{suffix}
      </div>
      <p className="mt-3 text-[13px] text-white/45 font-medium">{label}</p>
    </div>
  );
}
