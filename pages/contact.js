import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import { Mail, MapPin, Clock } from "lucide-react";

const contactDetails = [
  { icon: <Mail size={16} />, label: "Business email", value: "hello@corp.dejoiy.com", href: "mailto:hello@corp.dejoiy.com" },
  { icon: <MapPin size={16} />, label: "Headquarters", value: "Delhi, India", href: null },
  { icon: <Clock size={16} />, label: "Office hours", value: "Mon – Fri, 9am – 6pm IST", href: null }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb orb-1" style={{ top: "-200px", left: "-100px", opacity: 0.35 }} />
          <div className="orb orb-2" style={{ top: "-100px", right: "-80px", opacity: 0.28 }} />
        </div>
        <div className="section-wrap relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="badge mb-5 inline-flex">Contact</span>
            <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight" style={{ color: "#F8FAFC" }}>
              Let's build your next<br />
              <span className="gradient-text">operating advantage</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed max-w-xl" style={{ color: "#94a3b8" }}>
              Tell us about your goals and DEJOIY will design the right support, AI operations or back-office solution.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-wrap pb-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-4 space-y-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card rounded-3xl p-6 space-y-5">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-start gap-3.5">
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.28)", color: "#93c5fd" }}
                  >
                    {detail.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-wider mb-1" style={{ color: "#64748b" }}>
                      {detail.label}
                    </div>
                    {detail.href ? (
                      <a href={detail.href} className="text-sm font-medium transition-colors" style={{ color: "#F8FAFC" }}>
                        {detail.value}
                      </a>
                    ) : (
                      <div className="text-sm font-medium" style={{ color: "#F8FAFC" }}>{detail.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card rounded-3xl p-6">
              <div className="text-[11px] font-semibold uppercase tracking-wider mb-4" style={{ color: "#64748b" }}>
                What to expect
              </div>
              <div className="space-y-3">
                {[
                  "Response within 1 business day",
                  "No-obligation consultation",
                  "Tailored solution recommendation",
                  "Clear implementation timeline"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[13px]" style={{ color: "#94a3b8" }}>
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-[17px] font-semibold mb-6" style={{ color: "#F8FAFC" }}>Send us a message</h2>
              <ContactForm buttonText="Send message" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
