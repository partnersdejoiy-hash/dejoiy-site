import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import gsap from "gsap";

export default function AnimatedCounter({ value, suffix = "", label, icon }) {
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
      duration: 2.5,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = `${Math.floor(obj.val)}${suffix}`;
      }
    });
    return () => tween.kill();
  }, [isInView, value, suffix]);

  return (
    <div
      ref={containerRef}
      className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] p-8 text-center hover:bg-white/[0.04] transition-all duration-500 hover:border-white/[0.14] hover:shadow-[0_0_60px_rgba(107,92,255,0.08)]"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(200px circle at 50% 100%, rgba(107,92,255,0.06), transparent)" }}
      />

      {icon && (
        <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#6B5CFF]/10 text-[#b8aaff]">
          {icon}
        </div>
      )}

      <div
        ref={countRef}
        className="stat-number text-[2.8rem] md:text-5xl font-bold leading-none tracking-tight"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #c8d8ff 40%, #e4d4ff 70%, #ffccf5 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}
      >
        0{suffix}
      </div>
      <p className="mt-3 text-[13.5px] font-medium text-white/40">{label}</p>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6B5CFF]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
