import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import JobListings from "../components/JobListings";
import { ArrowRight, Heart, BookOpen, Laptop, TreePine, TrendingUp } from "lucide-react";

const benefits = [
  { title: "Healthcare", description: "Comprehensive health coverage for you and your family.", icon: <Heart size={20} /> },
  { title: "Learning Budget", description: "Annual budget for courses, certifications and conferences.", icon: <BookOpen size={20} /> },
  { title: "Remote Work", description: "Flexible remote and hybrid options across our teams.", icon: <Laptop size={20} /> },
  { title: "Paid Leave", description: "Generous leave policy supporting work-life balance.", icon: <TreePine size={20} /> },
  { title: "Career Development", description: "Structured growth paths and mentorship programs.", icon: <TrendingUp size={20} /> }
];

const values = [
  { title: "Execution excellence", description: "We move fast, operate with discipline and hold ourselves to the highest delivery standards." },
  { title: "AI-first thinking", description: "We build systems that combine human judgment with intelligent automation from day one." },
  { title: "Global mindset", description: "We think across borders, serve clients in 38+ countries and hire talent globally." }
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      <div className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="orb orb-1" style={{ top: "-200px", left: "-100px", opacity: 0.25 }} />
          <div className="orb orb-2" style={{ top: "-100px", right: "-80px", opacity: 0.2 }} />
        </div>
        <div className="section-wrap relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="badge mb-5 inline-flex">Careers</span>
            <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-bold leading-[1.04] tracking-tight">
              Greatness<br />
              <span className="gradient-text">starts here</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-white/50 leading-relaxed">
              Join a team building premium operations, AI services and world-class customer experiences for global businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Global Talent", "AI-First Delivery", "Growth Culture"].map((tag) => (
                <span key={tag} className="rounded-full border border-white/[0.1] bg-white/[0.05] px-4 py-2 text-[12.5px] font-medium text-white/60">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-10">
              <Link
                href="#open-roles"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#05071a] hover:bg-white/90 transition-all duration-200"
              >
                View open roles
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-wrap pb-24 space-y-24">
        <section>
          <SectionHeading
            eyebrow="Values"
            title="How we work"
            subtitle="Our culture is built around execution, learning and building things that matter."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-7"
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/30 mb-4">0{index + 1}</div>
                <h3 className="text-[16px] font-semibold text-white leading-snug">{value.title}</h3>
                <p className="mt-2.5 text-[13.5px] text-white/50 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Benefits"
            title="Why top talent chooses DEJOIY"
            subtitle="We invest in people who want to build, learn and lead — and we show it through meaningful benefits."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-6 group text-center"
              >
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/60 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-200">
                  {benefit.icon}
                </div>
                <h3 className="text-[14px] font-semibold text-white">{benefit.title}</h3>
                <p className="mt-2 text-[12px] text-white/45 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="open-roles">
          <SectionHeading
            eyebrow="Open roles"
            title="Current opportunities"
            subtitle="Explore open positions across operations, AI and client delivery."
          />
          <JobListings />
        </section>

        <section>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0d1040] to-[#080c25] p-10 md:p-14">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2E7BFF]/10 via-transparent to-[#FF4FD8]/10 pointer-events-none" />
            <div className="relative max-w-2xl">
              <span className="badge mb-5 inline-flex">Don't see your role?</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">We're always looking for great people</h2>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">
                Send us your details and tell us how you'd like to contribute. We'll reach out when the right opportunity arises.
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#05071a] hover:bg-white/90 transition-all duration-200"
              >
                Get in touch
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
