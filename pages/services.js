import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import { ArrowRight } from "lucide-react";

const services = [
  { title: "Customer Experience", description: "Omnichannel support operations designed to improve retention, response quality and brand trust across digital touchpoints.", image: "/services/customer-experience.jpg", tags: ["Voice & Chat", "Email Support", "Live Agent"] },
  { title: "AI Data Operations", description: "Data annotation, classification, validation and quality assurance workflows to support large-scale AI systems.", image: "/services/ai-data-operations.jpg", tags: ["Annotation", "QA Pipelines", "Validation"] },
  { title: "Trust & Safety", description: "Fraud detection support, escalation handling, policy operations and risk-sensitive review processes.", image: "/services/trust-safety.jpg", tags: ["Fraud Review", "Policy Ops", "Risk Support"] },
  { title: "Content Moderation", description: "Human-led and AI-augmented moderation pipelines for social, commerce and media ecosystems.", image: "/services/content-moderation.jpg", tags: ["AI-Augmented", "24/7 Coverage", "Global Scale"] },
  { title: "Sales Support", description: "Lead qualification, CRM support, outbound enablement and operational assistance for revenue teams.", image: "/services/sales-support.jpg", tags: ["Lead Qualification", "CRM Support", "Outbound"] },
  { title: "AI Model Training", description: "Training, evaluation, red teaming and reinforcement support for enterprise AI deployment.", image: "/services/ai-model-training.jpg", tags: ["RLHF", "Red Teaming", "Evaluation"] },
  { title: "Back Office Operations", description: "Structured workflows for documentation, reconciliation, admin processing and operational throughput.", image: "/services/back-office.jpg", tags: ["Documentation", "Admin Processing", "Reconciliation"] },
  { title: "Financial Compliance", description: "Verification support, structured compliance workflows and high-trust operational environments.", image: "/services/financial-compliance.jpg", tags: ["KYC", "Compliance", "Verification"] }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <div className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(37,99,235,0.2) 0%, transparent 60%)" }} />
        <div className="section-wrap relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="badge mb-5 inline-flex">Services</span>
            <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight max-w-4xl" style={{ color: "#F8FAFC" }}>
              Modern services for<br />enterprise execution
            </h1>
            <p className="mt-5 text-base md:text-lg max-w-xl leading-relaxed" style={{ color: "#94a3b8" }}>
              Every service line is designed for operational clarity, scale and premium user outcomes.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-wrap pb-24">
        <div className="space-y-5">
          {services.map((service, index) => (
            <motion.section
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`grid gap-0 rounded-3xl overflow-hidden md:grid-cols-2 ${
                index % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""
              }`}
              style={{
                background: "rgba(11,18,38,0.82)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 4px 32px rgba(0,0,0,0.4)"
              }}
            >
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#4f6ef7" }}>
                    0{index + 1}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight" style={{ color: "#F8FAFC" }}>{service.title}</h2>
                <p className="mt-4 text-sm md:text-[15px] leading-relaxed" style={{ color: "#94a3b8" }}>{service.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-[11.5px]"
                      style={{
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.06)",
                        color: "#CBD5E1"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 w-fit"
                  style={{ color: "#64748b" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#F8FAFC"}
                  onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
                >
                  Get started
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="relative overflow-hidden min-h-[280px] md:min-h-0 group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: "280px" }}
                />
                <div
                  className="absolute inset-0"
                  style={index % 2 !== 0
                    ? { background: "linear-gradient(to left, rgba(2,6,23,0.55), transparent)" }
                    : { background: "linear-gradient(to right, rgba(2,6,23,0.55), transparent)" }
                  }
                />
              </div>
            </motion.section>
          ))}
        </div>

        <div className="mt-16 relative overflow-hidden rounded-3xl p-10 md:p-14 text-center cta-block">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.14) 0%, transparent 50%, rgba(6,182,212,0.1) 100%)" }} />
          <div className="relative max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: "#F8FAFC" }}>Ready to get started?</h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "#94a3b8" }}>Tell us your operational challenge and we'll design the right solution.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#020617] hover:bg-white/90 transition-all duration-200">
                Speak with an expert <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
