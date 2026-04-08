import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Brain, Database, Headphones, ShieldCheck, Briefcase } from "lucide-react";

const services = [
  {
    id: "ai",
    label: "AI Operations",
    icon: <Brain size={16} />,
    color: "#6B5CFF",
    description: "Human-in-the-loop AI workflows — annotation, validation and model evaluation at enterprise scale.",
    viz: "neural"
  },
  {
    id: "data",
    label: "Data Intelligence",
    icon: <Database size={16} />,
    color: "#2E7BFF",
    description: "Structured data pipelines that transform raw inputs into actionable business intelligence.",
    viz: "pipeline"
  },
  {
    id: "cx",
    label: "Customer Experience",
    icon: <Headphones size={16} />,
    color: "#FF4FD8",
    description: "Omnichannel support operations with premium response quality at global scale.",
    viz: "flow"
  },
  {
    id: "trust",
    label: "Trust & Safety",
    icon: <ShieldCheck size={16} />,
    color: "#00D4AA",
    description: "Policy enforcement, fraud review and risk management for modern digital platforms.",
    viz: "shield"
  },
  {
    id: "ops",
    label: "Back Office Ops",
    icon: <Briefcase size={16} />,
    color: "#FF9A3C",
    description: "Resilient admin workflows, reconciliation and documentation processing pipelines.",
    viz: "workflow"
  }
];

function NeuralViz({ color }) {
  const nodes = [
    { x: 80,  y: 80  }, { x: 200, y: 50  }, { x: 320, y: 80  },
    { x: 120, y: 180 }, { x: 240, y: 160 }, { x: 360, y: 190 },
    { x: 80,  y: 280 }, { x: 220, y: 270 }, { x: 340, y: 300 }
  ];
  const edges = [[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[3,6],[4,7],[5,8],[6,7],[7,8]];

  return (
    <svg viewBox="0 0 440 360" className="w-full h-full">
      {edges.map(([a, b], i) => (
        <motion.path
          key={i}
          d={`M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`}
          stroke={`${color}40`}
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 2.5, delay: i * 0.15, repeat: Infinity, repeatDelay: 1 }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle cx={n.x} cy={n.y} r={16}
            fill={`${color}08`} stroke={`${color}20`} strokeWidth="1"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          />
          <circle cx={n.x} cy={n.y} r={5} fill={color}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </g>
      ))}
    </svg>
  );
}

function PipelineViz({ color }) {
  const bars = [55, 75, 45, 90, 65, 85, 50, 95, 70];
  return (
    <svg viewBox="0 0 440 360" className="w-full h-full">
      <line x1="40" y1="180" x2="400" y2="180" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      {bars.map((h, i) => {
        const barH = h * 1.4;
        const barY = 180 - barH;
        return (
          <g key={i}>
            <motion.rect
              x={40 + i * 42} y={barY} width={28} height={barH}
              rx="4"
              fill={`${color}${i % 2 === 0 ? "60" : "30"}`}
              stroke={`${color}50`} strokeWidth="1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7] }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.circle
              cx={40 + i * 42 + 14} cy={barY - 8} r={3}
              fill={color}
              style={{ filter: `drop-shadow(0 0 4px ${color})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: i * 0.08 + 0.6, duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
            />
          </g>
        );
      })}
      <motion.path
        d="M40,180 Q120,110 200,140 Q280,170 360,100"
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
      />
    </svg>
  );
}

function FlowViz({ color }) {
  const steps = [
    { x: 60,  y: 80,  label: "Inquiry" },
    { x: 220, y: 80,  label: "Route" },
    { x: 380, y: 80,  label: "Resolve" },
    { x: 60,  y: 260, label: "Intake" },
    { x: 220, y: 260, label: "Support" },
    { x: 380, y: 260, label: "Close" },
  ];
  const connections = [[0,1],[1,2],[3,4],[4,5],[0,3],[1,4],[2,5]];
  return (
    <svg viewBox="0 0 440 360" className="w-full h-full">
      {connections.map(([a, b], i) => (
        <motion.path
          key={i}
          d={`M ${steps[a].x} ${steps[a].y} L ${steps[b].x} ${steps[b].y}`}
          stroke={`${color}25`} strokeWidth="1.5" strokeDasharray="4 3"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
        />
      ))}
      {steps.map((s, i) => (
        <g key={i}>
          <motion.rect x={s.x - 36} y={s.y - 22} width={72} height={44} rx="10"
            fill={`${color}10`} stroke={`${color}35`} strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
          />
          <motion.text x={s.x} y={s.y + 4} textAnchor="middle"
            fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="Inter,sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >{s.label}</motion.text>
          <motion.circle cx={s.x} cy={s.y} r={3} fill={color}
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, delay: i * 0.15, repeat: Infinity }}
          />
        </g>
      ))}
    </svg>
  );
}

function ShieldViz({ color }) {
  const rings = [100, 75, 50, 25];
  const orbitAngles = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 440 360" className="w-full h-full">
      <g transform="translate(220,180)">
        {rings.map((r, i) => (
          <motion.circle key={i} cx={0} cy={0} r={r}
            fill="none"
            stroke={`${color}${i === 0 ? "10" : i === 1 ? "18" : i === 2 ? "28" : "50"}`}
            strokeWidth={i === rings.length - 1 ? 2 : 1}
            strokeDasharray={i % 2 === 0 ? "6 3" : ""}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
          />
        ))}
        <motion.circle cx={0} cy={0} r={14} fill={color}
          style={{ filter: `drop-shadow(0 0 12px ${color})` }}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {orbitAngles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * 75;
          const y = Math.sin(rad) * 75;
          return (
            <motion.circle key={i} cx={x} cy={y} r={4} fill={color}
              style={{ filter: `drop-shadow(0 0 6px ${color})` }}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, delay: i * 0.25, repeat: Infinity }}
            />
          );
        })}
        <motion.circle cx={0} cy={0} r={50}
          fill="none" stroke={color} strokeWidth="1"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
      </g>
    </svg>
  );
}

function WorkflowViz({ color }) {
  const tasks = [
    { x: 60,  y: 70  }, { x: 220, y: 70  }, { x: 380, y: 70  },
    { x: 140, y: 180 }, { x: 300, y: 180 },
    { x: 220, y: 290 }
  ];
  const edges = [[0,1],[1,2],[0,3],[1,3],[1,4],[2,4],[3,5],[4,5]];
  return (
    <svg viewBox="0 0 440 360" className="w-full h-full">
      {edges.map(([a, b], i) => (
        <motion.path
          key={i}
          d={`M ${tasks[a].x} ${tasks[a].y} L ${tasks[b].x} ${tasks[b].y}`}
          stroke={`${color}30`} strokeWidth="1.5" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
        />
      ))}
      {tasks.map((t, i) => (
        <g key={i}>
          <motion.rect
            x={t.x - 28} y={t.y - 20} width={56} height={40} rx="8"
            fill={`${color}10`} stroke={`${color}40`} strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
          />
          <motion.circle cx={t.x} cy={t.y} r={4} fill={color}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
          />
        </g>
      ))}
      <motion.circle
        cx={60} cy={70} r={40} fill="none" stroke={color} strokeWidth="1.5"
        animate={{ opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
      />
    </svg>
  );
}

const VIZ_MAP = { neural: NeuralViz, pipeline: PipelineViz, flow: FlowViz, shield: ShieldViz, workflow: WorkflowViz };

export default function AIServicesViz() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const svc = services[active];
  const VizComp = VIZ_MAP[svc.viz];

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-5">
      <div className="lg:col-span-2 space-y-2">
        {services.map((s, i) => (
          <motion.button
            key={s.id}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`group w-full flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-left transition-all duration-300 ${
              active === i
                ? "border border-white/[0.12] bg-white/[0.06]"
                : "border border-transparent hover:border-white/[0.06] hover:bg-white/[0.03]"
            }`}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300"
              style={{
                background: active === i ? `${s.color}20` : "rgba(255,255,255,0.04)",
                color: active === i ? s.color : "rgba(255,255,255,0.4)",
                boxShadow: active === i ? `0 0 16px ${s.color}30` : "none"
              }}
            >
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-[13.5px] font-semibold transition-colors ${active === i ? "text-white" : "text-white/55"}`}>
                {s.label}
              </div>
              {active === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[12px] text-white/40 mt-1 leading-relaxed"
                >
                  {s.description}
                </motion.div>
              )}
            </div>
            {active === i && (
              <motion.div
                layoutId="active-bar"
                className="w-1 h-8 rounded-full shrink-0"
                style={{ background: `linear-gradient(to bottom, ${s.color}, ${s.color}60)` }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <div className="lg:col-span-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={svc.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]"
            style={{ minHeight: "320px" }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 50% 50%, ${svc.color}08, transparent 70%)` }}
            />
            <div className="absolute top-4 left-4 z-10">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] font-medium uppercase tracking-wider"
                style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}35`, color: svc.color }}
              >
                {svc.icon}
                {svc.label}
              </span>
            </div>
            <div className="h-[320px] p-6">
              <VizComp color={svc.color} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
