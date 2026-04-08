import { motion } from "framer-motion";

const PARTICLE_POSITIONS = [
  { x: 12, y: 23, delay: 0 }, { x: 34, y: 8, delay: 0.6 }, { x: 67, y: 45, delay: 1.2 },
  { x: 89, y: 72, delay: 0.3 }, { x: 23, y: 61, delay: 1.8 }, { x: 56, y: 19, delay: 0.9 },
  { x: 78, y: 88, delay: 0.4 }, { x: 45, y: 33, delay: 2.1 }, { x: 91, y: 15, delay: 1.5 },
  { x: 8,  y: 77, delay: 0.7 }, { x: 63, y: 55, delay: 2.4 }, { x: 38, y: 92, delay: 1.1 },
  { x: 72, y: 28, delay: 0.2 }, { x: 19, y: 46, delay: 1.7 }, { x: 85, y: 63, delay: 2.8 },
  { x: 31, y: 11, delay: 0.5 }, { x: 54, y: 80, delay: 1.3 }, { x: 76, y: 39, delay: 2.0 },
  { x: 15, y: 67, delay: 0.8 }, { x: 48, y: 4,  delay: 2.6 }, { x: 92, y: 51, delay: 1.6 },
  { x: 27, y: 84, delay: 0.1 }, { x: 61, y: 17, delay: 2.3 }, { x: 83, y: 94, delay: 1.0 }
];

function ParticleDot({ x, y, delay }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ left: `${x}%`, top: `${y}%`, width: "2px", height: "2px",
        background: "rgba(148,163,184,0.5)" }}
      animate={{ opacity: [0, 0.8, 0], scale: [0, 1.5, 0] }}
      transition={{ duration: 3.5, delay, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
    />
  );
}

export default function BackgroundFX() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb orb-1" style={{ top: "-200px", left: "-140px" }} />
      <div className="orb orb-2" style={{ top: "-100px", right: "-100px" }} />
      <div className="orb orb-3" style={{ bottom: "40px", left: "35%" }} />

      <div className="absolute inset-0 grid-lines opacity-100" />

      {PARTICLE_POSITIONS.map((p, i) => (
        <ParticleDot key={i} x={p.x} y={p.y} delay={p.delay} />
      ))}

      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)",
          filter: "blur(60px)"
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.3), rgba(124,58,237,0.3), transparent)" }}
      />
    </div>
  );
}
