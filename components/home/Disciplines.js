import { useState } from "react";
import Link from "next/link";

const groups = [
  {
    name: "Customer care",
    sum: "Every conversation answered with care and a clear owner.",
    items: [
      ["Customer support", "Trained teams on voice, chat and email, from first contact to resolution.", "/services/customer-experience"],
      ["Voice", "Calls handled with written scripts that leave room for judgement.", "/services/customer-experience"],
      ["Chat", "Fast, friendly replies with clean hand-offs when a case needs more.", "/services/customer-experience"],
      ["Email", "Considered written answers, tracked until the customer is done.", "/services/customer-experience"],
      ["Technical support", "Guided diagnosis, documented fixes and escalation to your product team.", "/services/customer-experience"],
      ["Sales support", "Order help and enquiries handled in your brand's voice.", "/services/sales-support"],
    ],
  },
  {
    name: "Operations",
    sum: "The everyday work behind the scenes, done accurately.",
    items: [
      ["Back-office support", "Documentation, reconciliation and admin built around accuracy.", "/services/back-office"],
      ["Data entry", "Careful capture, kept separate from review so errors surface early.", "/services/back-office"],
      ["Data processing", "Structured inputs, clear approval rules and written exception paths.", "/services/back-office"],
      ["Financial compliance support", "Document checks and case preparation for your compliance team.", "/services/financial-compliance"],
    ],
  },
  {
    name: "Judgement",
    sum: "People who check the work, and the models.",
    items: [
      ["Human-in-the-loop AI", "People who label, evaluate and correct what models produce.", "/services/ai-data-operations"],
      ["AI model training", "Prompt writing, rating and review for teams building models.", "/services/ai-model-training"],
      ["Quality review", "Independent checks against a scorecard everyone has agreed.", "/services/trust-safety"],
      ["Trust & safety", "Policy review and escalation for platforms and communities.", "/services/trust-safety"],
      ["Content moderation", "Consistent decisions on user content, with appeals handled fairly.", "/services/content-moderation"],
    ],
  },
];

export default function Disciplines() {
  const [active, setActive] = useState(groups[0].items[0]);
  return (
    <section className="disciplines chapter" aria-labelledby="disc-title" data-station="drift">
      <div className="wrap">
        <h2 id="disc-title" className="head-s" data-reveal>
          What we look after
        </h2>
        <div className="disc-grid">
          {groups.map((g) => (
            <div className="disc-col" key={g.name} data-reveal>
              <h3>{g.name}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item[0]}>
                    <Link
                      href={item[2]}
                      onMouseEnter={() => setActive(item)}
                      onFocus={() => setActive(item)}
                      data-active={active[0] === item[0] || undefined}
                    >
                      {item[0]}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="disc-sum">{g.sum}</p>
            </div>
          ))}
          <p className="disc-detail" aria-live="polite">
            <strong>{active[0]}.</strong> {active[1]}
          </p>
        </div>
      </div>
    </section>
  );
}
