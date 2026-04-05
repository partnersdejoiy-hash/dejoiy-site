import SectionHeading from "../components/SectionHeading";

const services = [
  {
    title: "Customer Experience",
    description:
      "Omnichannel support operations designed to improve retention, response quality and brand trust across digital touchpoints.",
    image: "/services/customer-experience.jpg"
  },
  {
    title: "AI Data Operations",
    description:
      "Data annotation, classification, validation and quality assurance workflows to support large-scale AI systems.",
    image: "/services/ai-data-operations.jpg"
  },
  {
    title: "Trust & Safety",
    description:
      "Fraud detection support, escalation handling, policy operations and risk-sensitive review processes.",
    image: "/services/trust-safety.jpg"
  },
  {
    title: "Content Moderation",
    description:
      "Human-led and AI-augmented moderation pipelines for social, commerce and media ecosystems.",
    image: "/services/content-moderation.jpg"
  },
  {
    title: "Sales Support",
    description:
      "Lead qualification, CRM support, outbound enablement and operational assistance for revenue teams.",
    image: "/services/sales-support.jpg"
  },
  {
    title: "AI Model Training",
    description:
      "Training, evaluation, red teaming and reinforcement support for enterprise AI deployment.",
    image: "/services/ai-model-training.jpg"
  },
  {
    title: "Back Office Operations",
    description:
      "Structured workflows for documentation, reconciliation, admin processing and operational throughput.",
    image: "/services/back-office.jpg"
  },
  {
    title: "Financial Compliance",
    description:
      "Verification support, structured compliance workflows and high-trust operational environments.",
    image: "/services/financial-compliance.jpg"
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
              index % 2 === 0 ? "" : "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
            } ${
              index % 3 === 0 ? "bg-card-gradient-1" : index % 3 === 1 ? "bg-card-gradient-2" : "bg-card-gradient-3"
            }`}
          >
            <div className="flex flex-col justify-center">
              <div className="text-sm uppercase tracking-[0.2em] text-highlight">
                Service {index + 1}
              </div>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">{service.title}</h2>
              <p className="mt-4 text-white/70 text-lg">{service.description}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">AI-Augmented</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Enterprise Ready</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Global Scale</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 min-h-[320px] group">
              <img
                src={service.image}
                alt={service.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
              <div className="absolute top-5 right-5 rounded-full bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md border border-white/10">
                DEJOIY
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 p-4">
                  <div className="text-sm text-white/60">Operational Excellence</div>
                  <div className="mt-1 text-lg font-semibold">{service.title}</div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}