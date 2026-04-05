import SectionHeading from "../components/SectionHeading";

const services = [
  {
    title: "Customer Experience",
    description:
      "Omnichannel support operations designed to improve retention, response quality and brand trust across digital touchpoints."
  },
  {
    title: "AI Data Operations",
    description:
      "Data annotation, classification, validation and quality assurance workflows to support large-scale AI systems."
  },
  {
    title: "Trust & Safety",
    description:
      "Fraud detection support, escalation handling, policy operations and risk-sensitive review processes."
  },
  {
    title: "Content Moderation",
    description:
      "Human-led and AI-augmented moderation pipelines for social, commerce and media ecosystems."
  },
  {
    title: "Sales Support",
    description:
      "Lead qualification, CRM support, outbound enablement and operational assistance for revenue teams."
  },
  {
    title: "AI Model Training",
    description:
      "Training, evaluation, red teaming and reinforcement support for enterprise AI deployment."
  },
  {
    title: "Back Office Operations",
    description:
      "Structured workflows for documentation, reconciliation, admin processing and operational throughput."
  },
  {
    title: "Financial Compliance",
    description:
      "Verification support, structured compliance workflows and high-trust operational environments."
  }
];

export default function ServicesPage() {
  return (
    <div className="section-wrap py-20">
      <SectionHeading
        eyebrow="Services"
        title="Modern services for enterprise execution"
        subtitle="Every service line is designed for operational clarity, scale and premium user outcomes."
      />

      <div className="space-y-8">
        {services.map((service, index) => (
          <section
            key={service.title}
            className={`grid gap-8 rounded-[2.5rem] glass p-8 md:grid-cols-2 md:p-12 ${
              index % 3 === 0 ? "bg-card-gradient-1" : index % 3 === 1 ? "bg-card-gradient-2" : "bg-card-gradient-3"
            }`}
          >
            <div>
              <div className="text-sm uppercase tracking-[0.2em] text-highlight">
                Service {index + 1}
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">{service.title}</h2>
              <p className="mt-4 text-white/70 text-lg">{service.description}</p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 min-h-[240px] flex items-center justify-center">
              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-accent/30 via-secondary/30 to-highlight/30 blur-sm" />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}