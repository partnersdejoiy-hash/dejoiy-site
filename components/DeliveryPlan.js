import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
const stages = [
  [
    "Discover",
    "Start with the context",
    "Work through inputs, decision rights and the exceptions that need a person’s judgment.",
  ],
  [
    "Prepare",
    "Make the next step clear",
    "Agree the playbook, access and ownership before moving into a scoped delivery plan.",
  ],
  [
    "Improve",
    "Learn from the work",
    "Review quality together and use the findings to refine the process, guidance and coaching.",
  ],
];
export default function DeliveryPlan({ service }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  return (
    <section
      className="delivery-plan"
      aria-label={`${service.title} delivery plan`}
    >
      <div className="explorer-heading">
        <span className="intro-label">From possibility to a working plan</span>
        <h2>
          Built around
          <br />
          your operation.
        </h2>
      </div>
      <div className="delivery-plan-layout">
        <div
          className="plan-steps"
          role="group"
          aria-label="Explore delivery stages"
        >
          {service.tasks.map((task, i) => (
            <button
              key={task}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
            >
              <span>
                0{i + 1} / {stages[i][0]}
              </span>
              <h3>{task}</h3>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div className="plan-panel">
          <div className="plan-meter" aria-hidden="true">
            {stages.map((stage, i) => (
              <motion.span
                key={stage[0]}
                animate={{
                  scaleX: i <= active ? 1 : 0.1,
                  opacity: i <= active ? 1 : 0.25,
                }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 120, damping: 25 }
                }
              />
            ))}
          </div>
          <div aria-live="polite">
            <span className="intro-label">
              0{active + 1} / {stages[active][0]}
            </span>
            <h3>{stages[active][1]}</h3>
            <p>{stages[active][2]}</p>
          </div>
          <div className="plan-measures">
            <span className="intro-label">Agree the measures that matter</span>
            <ul>
              {service.measures.map((m) => (
                <li key={m}>
                  {m}
                  <span aria-hidden="true">↗</span>
                </li>
              ))}
            </ul>
            <p>
              Scope, access controls, service levels and reporting are agreed
              before delivery. These are planning measures, not performance
              guarantees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
