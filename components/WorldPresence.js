import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const REGIONS = [
  { id: "na",  label: "North America", city: "New York",      clients: "85+",  cx: "20%", cy: "38%" },
  { id: "eu",  label: "Europe",        city: "London",         clients: "72+",  cx: "45%", cy: "28%" },
  { id: "in",  label: "India",         city: "Delhi",          clients: "120+", cx: "64%", cy: "44%" },
  { id: "me",  label: "Middle East",   city: "Dubai",          clients: "34+",  cx: "57%", cy: "46%" },
  { id: "ap",  label: "Asia Pacific",  city: "Singapore",      clients: "61+",  cx: "76%", cy: "52%" },
  { id: "af",  label: "Africa",        city: "Johannesburg",   clients: "18+",  cx: "50%", cy: "62%" },
];

const CONNECTIONS = [
  ["na","eu"],["eu","in"],["in","me"],["in","ap"],["eu","me"],["na","in"],
];

function Dot({ region, index, inView, hovered, onHover }) {
  const isHovered = hovered === region.id;

  return (
    <div
      className="absolute"
      style={{ left: region.cx, top: region.cy, transform: "translate(-50%,-50%)" }}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.4 + index * 0.12, duration: 0.5, ease: [0.16,1,0.3,1] }}
        className="relative cursor-pointer"
        onMouseEnter={() => onHover(region.id)}
        onMouseLeave={() => onHover(null)}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "rgba(107,92,255,0.4)" }}
          animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4, ease: "easeOut" }}
        />
        <motion.div
          className="relative h-3 w-3 rounded-full border border-white/30"
          animate={isHovered ? { scale: 1.5 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", boxShadow: "0 0 10px rgba(107,92,255,0.8)" }}
        />
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: -14, scale: 1 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap z-20"
          >
            <div className="rounded-xl border border-white/[0.12] bg-[#0d0f2a]/95 backdrop-blur-md px-3 py-2 text-center shadow-xl">
              <div className="text-[11px] font-semibold text-white">{region.label}</div>
              <div className="text-[10px] text-white/50">{region.city}</div>
              <div className="text-[11px] font-bold text-[#b8aaff] mt-0.5">{region.clients} clients</div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default function WorldPresence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(null);

  const getPos = (regionId) => {
    const r = REGIONS.find(r => r.id === regionId);
    return { x: r.cx, y: r.cy };
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative w-full overflow-hidden rounded-3xl border border-white/[0.06]" style={{ paddingBottom: "46%" }}>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          opacity: 0.35
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020617] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/60 via-transparent to-[#020617]/60 pointer-events-none" />

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 46"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          {CONNECTIONS.map(([a, b], i) => {
            const posA = getPos(a);
            const posB = getPos(b);
            const x1 = parseFloat(posA.x);
            const y1 = parseFloat(posA.y);
            const x2 = parseFloat(posB.x);
            const y2 = parseFloat(posB.y);
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(107,92,255,0.25)"
                strokeWidth="0.15"
                strokeDasharray="0.6 0.4"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 0.8, 0.4] } : {}}
                transition={{ delay: 0.8 + i * 0.15, duration: 1.5, ease: "easeOut" }}
              />
            );
          })}
        </svg>

        {REGIONS.map((region, i) => (
          <Dot
            key={region.id}
            region={region}
            index={i}
            inView={inView}
            hovered={hovered}
            onHover={setHovered}
          />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute top-4 left-4"
        >
          <span className="badge text-[9px]">Live Operations Map</span>
        </motion.div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-5">
        {[
          { value: "38+", label: "Countries" },
          { value: "250+", label: "Enterprise clients" },
          { value: "24/7", label: "Global coverage" }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2 + i * 0.1, duration: 0.5, ease: [0.16,1,0.3,1] }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-center"
          >
            <div className="text-[1.6rem] font-bold gradient-text leading-none stat-number">{stat.value}</div>
            <div className="mt-1.5 text-[11.5px] text-white/40">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
