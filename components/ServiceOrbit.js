import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const core = [
  {
    name: "Customer support",
    line: "Voice, chat and email",
    detail:
      "Trained teams handle conversations end to end, with clear ownership from first contact to resolution.",
    href: "/services/customer-experience",
    size: "wide",
  },
  {
    name: "Back-office support",
    line: "Everyday operations",
    detail:
      "Documentation, reconciliation and administrative workflows built around accuracy.",
    href: "/services/back-office",
    size: "tall",
  },
  {
    name: "Data entry",
    line: "Structured and checked",
    detail:
      "Careful capture and processing, separated from quality review so errors are caught early.",
    href: "/services/back-office",
    size: "base",
  },
  {
    name: "Technical support",
    line: "Tiered troubleshooting",
    detail:
      "Guided diagnosis, documented fixes and clean escalation to your product teams.",
    href: "/services/customer-experience",
    size: "base",
  },
  {
    name: "Human-in-the-loop AI",
    line: "People who guide the models",
    detail:
      "Labelling, evaluation and review that keep AI output grounded in human judgment.",
    href: "/services/ai-data-operations",
    size: "wide",
  },
  {
    name: "Quality review",
    line: "Calibrated scorecards",
    detail:
      "Independent checks, shared scorecards and regular calibration across every workflow.",
    href: "/services/trust-safety",
    size: "base",
  },
];

export default function ServiceOrbit() {
  return (
    <section className="section-wrap orbit-section" aria-labelledby="orbit-title">
      <div className="orbit-head" data-reveal>
        <span className="eyebrow">Our services</span>
        <h2 id="orbit-title" className="section-title">
          Six disciplines.
          <br />
          <em className="serif-accent">One connected orbit.</em>
        </h2>
        <p className="section-copy">
          Start with one service or combine several. Each one shares the same
          playbooks, quality checks and escalation paths.
        </p>
      </div>
      <ol className="orbit-grid">
        {core.map((item, i) => (
          <li key={item.name} className={`orbit-cell orbit-${item.size}`} data-reveal>
            <Link href={item.href} className="bezel orbit-card group">
              <span className="bezel-core">
                <span className="orbit-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                  <i />
                </span>
                <span className="orbit-line">{item.line}</span>
                <span className="orbit-name">{item.name}</span>
                <span className="orbit-detail">{item.detail}</span>
                <span className="orbit-go" aria-hidden="true">
                  <ArrowUpRight size={16} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
