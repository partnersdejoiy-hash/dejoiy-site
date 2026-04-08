import { motion } from "framer-motion";

const PARTICLE_POSITIONS = [
  { x: 12, y: 23, delay: 0 }, { x: 34, y: 8, delay: 0.6 }, { x: 67, y: 45, delay: 1.2 },
  { x: 89, y: 72, delay: 0.3 }, { x: 23, y: 61, delay: 1.8 }, { x: 56, y: 19, delay: 0.9 },
  { x: 78, y: 88, delay: 0.4 }, { x: 45, y: 33, delay: 2.1 }, { x: 91, y: 15, delay: 1.5 },
  { x: 8, y: 77, delay: 0.7 }, { x: 63, y: 55, delay: 2.4 }, { x: 38, y: 92, delay: 1.1 },
  { x: 72, y: 28, delay: 0.2 }, { x: 19, y: 46, delay: 1.7 }, { x: 85, y: 63, delay: 2.8 },
  { x: 31, y: 11, delay: 0.5 }, { x: 54, y: 80, delay: 1.3 }, { x: 76, y: 39, delay: 2.0 },
  { x: 15, y: 67, delay: 0.8 }, { x: 48, y: 4, delay: 2.6 }, { x: 92, y: 51, delay: 1.6 },
  { x: 27, y: 84, delay: 0.1 }, { x: 61, y: 17, delay: 2.3 }, { x: 83, y: 94, delay: 1.0 }
];

function ParticleDot({ x, y, delay }) {
  return (
    <motion.div
      className="absolute w-px h-px bg-white/60 rounded-full"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        opacity: [0, 0.7, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: 3.5,
        delay,
        repeat: Infinity,
        repeatDelay: 4,
        ease: "easeInOut"
      }}
    />
  );
}

export default function BackgroundFX() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb orb-1" style={{ top: "-180px", left: "-120px" }} />
      <div className="orb orb-2" style={{ top: "-80px", right: "-80px" }} />
      <div className="orb orb-3" style={{ bottom: "60px", left: "35%" }} />

      <div className="absolute inset-0 grid-lines opacity-100" />

      {PARTICLE_POSITIONS.map((p, i) => (
        <ParticleDot key={i} x={p.x} y={p.y} delay={p.delay} />
      ))}

      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(107,92,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)"
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
