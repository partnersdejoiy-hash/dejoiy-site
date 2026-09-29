export const services = [
  {
    slug: "customer-experience",
    title: "Customer Experience",
    short: "Support that feels like your brand.",
    description:
      "Voice, chat and email support with clear ownership from first contact to resolution.",
    image: "/services/customer-experience.jpg",
    tags: ["Voice & chat", "Email support", "Escalations"],
    tasks: [
      "Map customer journeys and common contact reasons.",
      "Build a shared knowledge base and escalation playbook.",
      "Coach agents with a consistent quality scorecard.",
    ],
    measures: [
      "Customer satisfaction",
      "First-contact resolution",
      "Response and resolution time",
    ],
  },
  {
    slug: "back-office",
    title: "Back Office Operations",
    short: "Bring order to everyday operations.",
    description:
      "Documentation, data processing and administrative workflows designed around accuracy and accountability.",
    image: "/services/back-office.jpg",
    tags: ["Data processing", "Documentation", "Reconciliation"],
    tasks: [
      "Document inputs, approval rules and exception paths.",
      "Separate processing from quality review.",
      "Track backlogs and resolve recurring causes of rework.",
    ],
    measures: ["Processing accuracy", "Turnaround time", "Backlog age"],
  },
  {
    slug: "ai-data-operations",
    title: "AI Data Operations",
    short: "Better data. More dependable AI.",
    description:
      "Human annotation, validation and quality review for structured AI data workflows.",
    image: "/services/ai-data-operations.jpg",
    tags: ["Annotation", "Validation", "Data quality"],
    tasks: [
      "Define annotation guidelines and sample acceptance criteria.",
      "Calibrate reviewers using a shared reference set.",
      "Review ambiguous cases before releasing a dataset.",
    ],
    measures: ["Reviewer agreement", "Acceptance rate", "Rework volume"],
  },
  {
    slug: "trust-safety",
    title: "Trust & Safety",
    short: "Careful decisions at critical moments.",
    description:
      "Policy-based review, fraud-support queues and escalation operations for digital platforms.",
    image: "/services/trust-safety.jpg",
    tags: ["Policy operations", "Risk review", "Escalations"],
    tasks: [
      "Translate your policies into decision guides.",
      "Route sensitive exceptions to authorised decision makers.",
      "Review decision consistency and appeal feedback.",
    ],
    measures: ["Decision quality", "Escalation turnaround", "Appeal outcomes"],
  },
  {
    slug: "content-moderation",
    title: "Content Moderation",
    short: "Human judgment for digital communities.",
    description:
      "Context-aware review of user content, supported by defined policies and quality checks.",
    image: "/services/content-moderation.jpg",
    tags: ["Content review", "Policy calibration", "Quality checks"],
    tasks: [
      "Agree content categories and escalation thresholds.",
      "Plan reviewer training and wellbeing requirements.",
      "Use quality sampling to identify policy ambiguity.",
    ],
    measures: ["Review accuracy", "Queue age", "Policy consistency"],
  },
  {
    slug: "sales-support",
    title: "Sales Support",
    short: "Give your sales team time to sell.",
    description:
      "Lead qualification, CRM upkeep and follow-up coordination for organised revenue operations.",
    image: "/services/sales-support.jpg",
    tags: ["Lead qualification", "CRM support", "Follow-up"],
    tasks: [
      "Agree your qualification criteria and handoff rules.",
      "Keep CRM records consistent and actionable.",
      "Coordinate follow-up in your approved channels.",
    ],
    measures: [
      "Record completeness",
      "Qualified handoffs",
      "Follow-up turnaround",
    ],
  },
  {
    slug: "ai-model-training",
    title: "AI Model Training",
    short: "Human feedback with a clear standard.",
    description:
      "Human evaluation and feedback workflows that help teams assess model behaviour and output quality.",
    image: "/services/ai-model-training.jpg",
    tags: ["Human evaluation", "Feedback", "Quality review"],
    tasks: [
      "Translate model goals into evaluation rubrics.",
      "Calibrate reviewers on representative examples.",
      "Document disagreements and recurring failure patterns.",
    ],
    measures: ["Rubric agreement", "Evaluation coverage", "Review quality"],
  },
  {
    slug: "financial-compliance",
    title: "Financial Compliance Support",
    short: "Disciplined support for sensitive workflows.",
    description:
      "Document review and verification support within your organisation’s approved policies and controls.",
    image: "/services/financial-compliance.jpg",
    tags: ["Document review", "Verification support", "Exception handling"],
    tasks: [
      "Define the permitted scope and access requirements.",
      "Document checks and route exceptions for approval.",
      "Maintain an auditable handoff to your authorised team.",
    ],
    measures: [
      "Completeness of checks",
      "Exception turnaround",
      "Review accuracy",
    ],
  },
];
export function findService(value) {
  return services.find((s) => s.slug === value || s.title === value);
}
