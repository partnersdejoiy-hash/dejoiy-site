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
        background: "rgba(11,18,38,0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 4px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)"
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(220px circle at 50% 100%, rgba(124,58,237,0.15), transparent)",
          borderRadius: "1.5rem"
        }}
      />

      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        style={{ border: "1px solid rgba(124,58,237,0.35)", boxShadow: "0 0 50px rgba(37,99,235,0.1)" }}
      />

      {icon && (
        <div
          className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
          style={{
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(124,58,237,0.38)",
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
      <p className="mt-3 text-[13.5px] font-medium" style={{ color: "#94a3b8" }}>{label}</p>

      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)" }}
      />
    </div>
  );
}
