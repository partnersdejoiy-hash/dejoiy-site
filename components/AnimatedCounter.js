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
      className="group relative overflow-hidden rounded-3xl p-8 text-center transition-all duration-500 cursor-default"
      style={{
        background: "rgba(11,18,38,0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)"
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(200px circle at 50% 100%, rgba(124,58,237,0.1), transparent)",
          borderRadius: "1.5rem"
        }}
      />

      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        style={{ border: "1px solid rgba(124,58,237,0.25)", boxShadow: "0 0 40px rgba(37,99,235,0.08)" }}
      />

      {icon && (
        <div
          className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.25)",
            color: "#c4b5fd"
          }}
        >
          {icon}
        </div>
      )}

      <div
        ref={countRef}
        className="stat-number text-[2.8rem] md:text-5xl font-bold leading-none tracking-tight"
        style={{
          background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #c084fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}
      >
        0{suffix}
      </div>
      <p className="mt-3 text-[13.5px] font-medium" style={{ color: "#64748b" }}>{label}</p>

      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)" }}
      />
    </div>
  );
}
