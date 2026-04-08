import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import { ArrowRight } from "lucide-react";

const industries = [
  { title: "Retail & eCommerce", image: "/industries/retail.jpg", description: "Customer support, returns, fraud review and digital commerce operations at scale." },
  { title: "Technology", image: "/industries/technology.jpg", description: "Platform support, AI operations, QA workflows and enterprise assistance." },
  { title: "Healthcare", image: "/industries/healthcare.jpg", description: "Sensitive support workflows built with precision, trust and strict structure." },
  { title: "Financial Services", image: "/industries/financial.jpg", description: "Compliance-aware operations, verification workflows and support services." },
  { title: "Travel & Logistics", image: "/industries/travel.jpg", description: "Booking support, issue resolution and logistics coordination workflows." },
  { title: "Social Media", image: "/industries/social-media.jpg", description: "Content operations, moderation and creator ecosystem support." },
  { title: "Gaming", image: "/industries/gaming.jpg", description: "Player support, moderation and always-on live operations workflows." },
  { title: "Education", image: "/industries/education.jpg", description: "Enrollment support, learner assistance and digital education operations." }
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen">
      <div className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(6,182,212,0.16) 0%, transparent 60%)" }} />
        <div className="section-wrap relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="badge badge-cyan mb-5 inline-flex">Industries</span>
            <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight max-w-4xl" style={{ color: "#F8FAFC" }}>
              Sector expertise built for<br />modern operations
            </h1>
            <p className="mt-5 text-base md:text-lg max-w-xl leading-relaxed" style={{ color: "#94a3b8" }}>
              DEJOIY supports diverse industries with tailored workflows, trained talent and premium execution quality.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-wrap pb-24">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl min-h-[300px] cursor-pointer"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                transition: "border-color 0.4s ease, box-shadow 0.4s ease"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(6,182,212,0.38)";
                e.currentTarget.style.boxShadow = "0 24px 70px rgba(0,0,0,0.55), 0 0 50px rgba(6,182,212,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
              }}
            >
              <img
                src={industry.image}
                alt={industry.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                style={{ transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              />
              <div className="absolute inset-0 transition-all duration-500" style={{ background: "linear-gradient(to top, #020617 0%, rgba(2,6,23,0.75) 45%, rgba(2,6,23,0.2) 80%, transparent 100%)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(to top, rgba(2,6,23,0.97) 0%, rgba(2,6,23,0.6) 50%, rgba(2,6,23,0.1) 100%)" }} />

              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.7), transparent)" }}
              />

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-[16px] font-semibold leading-tight" style={{ color: "#F8FAFC" }}>{industry.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: "#94a3b8" }}>{industry.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[11.5px] font-medium transition-colors duration-300" style={{ color: "#64748b" }}>
                  <span className="group-hover:text-[#67e8f9] transition-colors duration-300">Explore</span>
                  <ArrowRight size={12} className="transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#67e8f9]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <SectionHeading
            eyebrow="Get started"
            title="Your industry, our expertise"
            subtitle="Whatever your sector, DEJOIY delivers tailored operational solutions with measurable results."
          />
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#020617] hover:bg-white/90 transition-all duration-200 shadow-sm"
          >
            Speak with an expert
            <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
