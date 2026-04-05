import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AnimatedCounter({ value, suffix = "", label }) {
  const countRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const el = countRef.current;
    if (!el) return;

    const tween = gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power3.out",
      onUpdate: () => {
        el.textContent = `${Math.floor(obj.val)}${suffix}`;
      }
    });

    return () => {
      tween.kill();
    };
  }, [value, suffix]);

  return (
    <div className="rounded-[2rem] glass p-6 text-center bg-card-gradient-3">
      <div
        ref={countRef}
        className="text-4xl md:text-5xl font-bold gradient-text"
      >
        0
      </div>
      <p className="mt-3 text-white/65">{label}</p>
    </div>
  );
}