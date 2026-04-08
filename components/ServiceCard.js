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
    glowRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, rgba(124,58,237,0.14), transparent 60%)`;
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
      whileHover={{ y: -6 }}
      className="group relative rounded-3xl p-6 cursor-pointer overflow-hidden"
      style={{
        background: "rgba(11,18,38,0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)"
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
          background: "linear-gradient(135deg, rgba(37,99,235,0.5), rgba(124,58,237,0.6), rgba(6,182,212,0.4))",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          borderRadius: "1.5rem"
        }}
      />

      <div className="relative z-10">
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-400 group-hover:scale-110"
          style={{
            background: "rgba(37,99,235,0.12)",
            border: "1px solid rgba(37,99,235,0.2)",
            color: "#93c5fd",
          }}
        >
          <motion.div
            whileHover={{ rotate: 5 }}
            className="group-hover:text-[#a5b4fc] transition-colors duration-300"
            style={{ color: "#93c5fd" }}
          >
            {icon}
          </motion.div>
        </div>

        <div
          className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
            filter: "blur(20px)"
          }}
        />

        <h3 className="text-[15px] font-semibold leading-snug" style={{ color: "#F8FAFC" }}>{title}</h3>
        <p className="mt-2.5 text-[13.5px] leading-relaxed" style={{ color: "#94a3b8" }}>{description}</p>

        <div className="mt-5 h-px w-full group-hover:opacity-100 opacity-0 transition-opacity duration-500"
          style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED, #06B6D4)" }}
        />
        <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium transition-colors duration-300"
          style={{ color: "rgba(148,163,184,0.6)" }}
        >
          <span className="group-hover:text-[#93c5fd] transition-colors duration-300">Learn more</span>
          <ArrowRight size={12} className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#93c5fd]" />
        </div>
      </div>

      <div
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          filter: "blur(20px)"
        }}
      />

      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
      />
    </motion.div>
  );
}
