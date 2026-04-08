import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const NODES = [
  { id: 0, x: 68,  y: 72  },
  { id: 1, x: 178, y: 44  },
  { id: 2, x: 292, y: 68  },
  { id: 3, x: 388, y: 108 },
  { id: 4, x: 92,  y: 172 },
  { id: 5, x: 220, y: 158 },
  { id: 6, x: 336, y: 196 },
  { id: 7, x: 52,  y: 282 },
  { id: 8, x: 186, y: 292 },
  { id: 9, x: 318, y: 260 },
  { id: 10, x: 408, y: 312 },
];

const EDGES = [
  [0,1],[0,4],[1,2],[1,5],[2,3],[2,5],[3,6],
  [4,5],[4,7],[5,6],[5,8],[6,9],[7,8],[8,9],[9,10],[6,10]
];

const PULSE_COLORS = [
  "rgba(46,123,255,0.9)",
  "rgba(107,92,255,0.9)",
  "rgba(255,79,216,0.8)",
];

function getPath(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - 24;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

function EdgeLine({ from, to, index, inView }) {
  const pathRef = useRef(null);
  const d = getPath(from, to);
  const delay = index * 0.08;

  return (
    <g>
      <path d={d} stroke="rgba(107,92,255,0.12)" strokeWidth="1" fill="none" />
      <motion.path
        ref={pathRef}
        d={d}
        stroke={PULSE_COLORS[index % PULSE_COLORS.length]}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: [0, 1, 0], opacity: [0, 0.8, 0] } : { pathLength: 0, opacity: 0 }}
        transition={{
          pathLength: { delay, duration: 2.5, repeat: Infinity, repeatDelay: index * 0.3 + 1.5, ease: "easeInOut" },
          opacity: { delay, duration: 2.5, repeat: Infinity, repeatDelay: index * 0.3 + 1.5, ease: "easeInOut" }
        }}
      />
    </g>
  );
}

function NodeCircle({ node, index, inView }) {
  const color = PULSE_COLORS[index % PULSE_COLORS.length];
  const delay = 0.5 + index * 0.12;

  return (
    <g>
      <motion.circle
        cx={node.x} cy={node.y} r={18}
        fill="rgba(107,92,255,0.04)"
        stroke="rgba(107,92,255,0.12)"
        strokeWidth="1"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: [0, 1.2, 1], opacity: 1 } : {}}
        transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx={node.x} cy={node.y} r={18}
        fill="transparent"
        stroke={color}
        strokeWidth="1"
        initial={{ scale: 1, opacity: 0 }}
        animate={inView ? { scale: [1, 1.8, 1], opacity: [0, 0.4, 0] } : {}}
        transition={{ delay: delay + 0.4, duration: 2.5, repeat: Infinity, repeatDelay: Math.random() * 2, ease: "easeOut" }}
      />
      <motion.circle
        cx={node.x} cy={node.y} r={5}
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </g>
  );
}

export default function NeuralNetworkViz() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(107,92,255,0.08) 0%, transparent 70%)",
            filter: "blur(30px)",
            transform: "scale(1.3)"
          }}
        />
        <svg
          viewBox="0 0 460 360"
          className="w-full max-w-[480px] drop-shadow-lg"
          style={{ overflow: "visible" }}
        >
          <defs>
            <radialGradient id="glow-blue" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(46,123,255,0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <g>
            {EDGES.map(([a, b], i) => (
              <EdgeLine key={i} from={NODES[a]} to={NODES[b]} index={i} inView={inView} />
            ))}
          </g>
          <g>
            {NODES.map((node, i) => (
              <NodeCircle key={node.id} node={node} index={i} inView={inView} />
            ))}
          </g>

          <motion.text
            x="220" y="335"
            textAnchor="middle"
            fill="rgba(255,255,255,0.2)"
            fontSize="9"
            fontFamily="Inter, sans-serif"
            letterSpacing="2"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 1 }}
          >
            DEJOIY · AI OPERATIONS NETWORK
          </motion.text>
        </svg>
      </motion.div>
    </div>
  );
}
