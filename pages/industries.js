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
        <div className="section-wrap relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="badge mb-5 inline-flex">Industries</span>
            <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight max-w-4xl">
              Sector expertise built for<br />modern operations
            </h1>
            <p className="mt-5 text-base md:text-lg text-white/50 max-w-xl leading-relaxed">
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
              className="group relative overflow-hidden rounded-3xl border border-white/[0.07] min-h-[300px] cursor-pointer"
            >
              <img
                src={industry.image}
                alt={industry.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-[#020617]/20 group-hover:from-[#020617]/95 transition-colors duration-500" />

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-[16px] font-semibold text-white leading-tight">{industry.title}</h3>
                <p className="mt-2 text-[12.5px] text-white/55 leading-relaxed">{industry.description}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[11.5px] font-medium text-white/30 group-hover:text-white/60 transition-colors duration-300">
                  Explore
                  <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
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
