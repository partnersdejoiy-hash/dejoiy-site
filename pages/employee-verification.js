import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import VerificationForm from "../components/VerificationForm";
import { ShieldCheck, Clock, Lock, FileText } from "lucide-react";

const steps = [
  { icon: <FileText size={16} />, title: "Submit request", description: "Complete the verification form with the employee's details and your contact information." },
  { icon: <ShieldCheck size={16} />, title: "DEJOIY reviews", description: "Our HR team verifies the information against our employment records." },
  { icon: <Clock size={16} />, title: "Response within 3 days", description: "You'll receive a formal verification response within 3 business days." },
  { icon: <Lock size={16} />, title: "Secure & confidential", description: "All requests are handled securely and in compliance with data privacy standards." }
];

export default function EmployeeVerificationPage() {
  return (
    <div className="min-h-screen">
      <div className="relative py-28 overflow-hidden">
        <div className="section-wrap relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <span className="badge mb-5 inline-flex">Employee Verification</span>
            <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight">
              Verify past DEJOIY<br />employees professionally
            </h1>
            <p className="mt-5 text-base text-white/50 leading-relaxed max-w-xl">
              Submit a formal background verification request. Our HR team will review and respond within 3 business days.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="section-wrap pb-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <motion.div
            className="lg:col-span-4 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card rounded-3xl p-6">
              <div className="text-[11px] font-medium uppercase tracking-wider text-white/30 mb-5">How it works</div>
              <div className="space-y-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-white/50">
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-[13.5px] font-semibold text-white">{step.title}</div>
                      <div className="mt-1 text-[12px] text-white/45 leading-relaxed">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-3xl p-6">
              <div className="text-[11px] font-medium uppercase tracking-wider text-white/30 mb-3">Contact</div>
              <div className="text-[13px] text-white/50 leading-relaxed">
                For urgent verification requests, contact us directly at{" "}
                <a href="mailto:employment.verification@corp.dejoiy.com" className="text-white/80 hover:text-white transition-colors">
                  employment.verification@corp.dejoiy.com
                </a>
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
              <h2 className="text-[17px] font-semibold text-white mb-6">Verification request form</h2>
              <VerificationForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
