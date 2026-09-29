import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { MessageSquare, Route, Headphones, ShieldCheck } from "lucide-react";
const steps = [
  [
    "Understand",
    "Start with your customers",
    "Map contact reasons, business goals and the moments that need a human touch.",
    MessageSquare,
  ],
  [
    "Design",
    "Give every request a clear path",
    "Define channels, ownership and escalation rules before the first handoff.",
    Route,
  ],
  [
    "Deliver",
    "Equip people to do their best work",
    "Bring playbooks, training and approved tools into one consistent workflow.",
    Headphones,
  ],
  [
    "Improve",
    "Close the loop with quality",
    "Review interactions, learn from exceptions and turn feedback into better service.",
    ShieldCheck,
  ],
];
export default function WorkflowStory() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start .8", "end .6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  return (
    <section ref={ref} className="section-wrap section-space">
      <div className="workflow-layout">
        <div className="workflow-heading">
          <span className="badge mb-5">The DEJOIY approach</span>
          <h2 className="section-title">
            Great service is a system.
            <br />
            <span className="gradient-text">We connect the pieces.</span>
          </h2>
          <p className="section-copy">
            From the first enquiry to the final quality review, every step
            should have a purpose and an owner.
          </p>
        </div>
        <div className="workflow-steps">
          <div className="workflow-track" aria-hidden="true">
            <motion.div
              style={{ scaleY: reduced ? 1 : progress, transformOrigin: "top" }}
            />
          </div>
          {steps.map(([name, title, description, Icon], i) => (
            <motion.article
              key={name}
              className="workflow-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
            >
              <span className="workflow-node">
                <Icon size={18} />
              </span>
              <span className="eyebrow">
                0{i + 1} / {name}
              </span>
              <h3 className="text-xl font-semibold mt-3">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mt-3">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
