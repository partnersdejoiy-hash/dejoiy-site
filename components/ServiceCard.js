import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({ title, description, icon, index = 0 }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(107,92,255,0.1), transparent 60%)`;
    glowRef.current.style.opacity = "1";
  };

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl p-6 cursor-pointer overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
        style={{ opacity: 0 }}
      />

      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          padding: "1px",
          background: "linear-gradient(135deg, rgba(46,123,255,0.35), rgba(107,92,255,0.4), rgba(255,79,216,0.25))",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          borderRadius: "1.5rem"
        }}
      />

      <motion.div
        className="relative z-10"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.07] text-white/60 group-hover:text-[#b8aaff] group-hover:bg-[#6B5CFF]/15 group-hover:shadow-[0_0_24px_rgba(107,92,255,0.3)] transition-all duration-400">
          {icon}
        </div>
        <h3 className="text-[15px] font-semibold text-white leading-snug">{title}</h3>
        <p className="mt-2.5 text-[13.5px] text-white/50 leading-relaxed">{description}</p>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent group-hover:via-[#6B5CFF]/30 transition-colors duration-500" />

        <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-white/30 group-hover:text-[#b8aaff] transition-colors duration-300">
          Learn more
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </motion.div>

      <div
        className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-600 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(107,92,255,0.18) 0%, transparent 70%)",
          filter: "blur(24px)"
        }}
      />
    </motion.div>
  );
}
