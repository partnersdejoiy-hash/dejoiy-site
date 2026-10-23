import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
const items = [
  {
    name: "People",
    title: "Make room for human judgment.",
    description:
      "Empathy, context and care belong in every workflow. We build around the people delivering the service and the people receiving it.",
    detail: "Listen → Understand → Act",
    color: "pink",
  },
  {
    name: "Process",
    title: "Give every next step an owner.",
    description:
      "Clear roles, documented decisions and thoughtful handoffs make an operation easier to run. We map the exceptions as carefully as the routine.",
    detail: "Map → Deliver → Review",
    color: "blue",
  },
  {
    name: "Technology",
    title: "Let technology support the work.",
    description:
      "Automation helps with repeatable tasks. Human review stays in the plan wherever a decision needs context, accountability and care.",
    detail: "Assist → Check → Improve",
    color: "cyan",
  },
];
export default function PrincipleExplorer() {
  const [active, setActive] = useState(0),
    reduced = useReducedMotion(),
    item = items[active];
  return (
    <section className={`principle-section principle-${item.color}`}>
      <div className="section-wrap principle-layout">
        <div>
          <span className="intro-label">What holds it all together</span>
          <h2>
            Better, by
            <br />
            working together.
          </h2>
          <div
            className="principle-choices"
            role="group"
            aria-label="Explore our principles"
          >
            {items.map((x, i) => (
              <button
                key={x.name}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                <span>0{i + 1}</span>
                {x.name} ↗
              </button>
            ))}
          </div>
        </div>
        <div className="principle-detail" aria-live="polite">
          <div className="principle-symbol" aria-hidden="true">
            {items.map((x, i) => (
              <motion.span
                key={x.name}
                animate={{
                  rotate: active * 25 + i * 36,
                  scale: active === i ? 1 : 0.83,
                }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 90, damping: 22 }
                }
              />
            ))}
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span className="principle-path">{item.detail}</span>
        </div>
      </div>
    </section>
  );
}
