import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "../components/SectionHeading";
import { Linkedin, ArrowRight } from "lucide-react";

const people = [
  { name: "Jyoti Sharma", role: "Founder, Director", quote: "Execution excellence is our unfair advantage.", image: "/employees/emp1.jpg" },
  { name: "Anil Sharma", role: "Managing Director, Co-founder", quote: "Human intelligence powers every successful AI workflow.", image: "/employees/emp2.jpg" },
  { name: "Deepak Sharmar", role: "Chief Technology & Operations Lead", quote: "We design support systems customers actually remember.", image: "/employees/emp3.jpg" },
  { name: "Komal Sharma", role: "Brand & Communications Coordinator", quote: "Trust is built into every process we deliver.", image: "/employees/emp4.jpg" },
  { name: "Dharmendra Sharma", role: "Strategic Advisor", quote: "Scalable systems begin with disciplined execution.", image: "/employees/emp5.jpg" },
  { name: "Deepanshu Chander Yaduvanshi", role: "Web Developer & Digital Infrastructure Engineer", quote: "People strategy is business strategy.", image: "/employees/emp6.jpg" },
  { name: "Syed Adnan Alir", role: "Business Manager", quote: "Operational quality is built one process at a time.", image: "/employees/emp7.jpg" },
  { name: "Khushi Sharma", role: "Operations Support", quote: "Speed matters, but consistency wins trust.", image: "/employees/emp8.jpg" },
  { name: "Harjoi Bajaj", role: "Brand Ambassador", quote: "The best operations feel invisible and indispensable.", image: "/employees/emp9.jpg" }
];

export default function OurPeoplePage() {
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
            className="max-w-4xl"
          >
            <span className="badge mb-5 inline-flex">Our People</span>
            <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight" style={{ color: "#F8FAFC" }}>
              The team powering<br />
              <span className="gradient-text">premium execution</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: "#94a3b8" }}>
              DEJOIY combines operational rigor, service excellence and AI-first thinking through a team built for modern enterprise delivery.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Operations Leaders", "AI Specialists", "Client Success Experts"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full px-4 py-2 text-[12.5px]"
                  style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.07)", color: "#CBD5E1" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-wrap pb-24">
        <section>
          <SectionHeading
            eyebrow="Leadership & Team"
            title="Meet the people behind DEJOIY"
            subtitle="A modern workforce built around empathy, precision, security and execution quality."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {people.map((person, index) => (
              <motion.div
                key={`${person.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl min-h-[380px] cursor-pointer"
                style={{
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  transition: "border-color 0.4s ease, box-shadow 0.4s ease"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                  e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.55), 0 0 50px rgba(124,58,237,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4)";
                }}
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/65 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug" style={{ color: "#F8FAFC" }}>{person.name}</h3>
                    <p className="text-[11.5px] font-medium mt-0.5" style={{ color: "#c4b5fd" }}>{person.role}</p>
                    <p className="mt-2.5 text-[12px] leading-relaxed italic" style={{ color: "#94a3b8" }}>"{person.quote}"</p>
                    <a
                      href="#"
                      aria-label={`LinkedIn profile for ${person.name}`}
                      className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200"
                      style={{ border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.08)", color: "#94a3b8" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#F8FAFC"; e.currentTarget.style.background = "rgba(255,255,255,0.14)"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
                    >
                      <Linkedin size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="relative overflow-hidden rounded-3xl p-10 md:p-14 cta-block">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.14) 0%, transparent 50%, rgba(6,182,212,0.1) 100%)" }} />
            <div className="relative max-w-3xl">
              <span className="badge mb-5 inline-flex">Growing Team</span>
              <h2 className="text-2xl md:text-4xl font-bold leading-tight" style={{ color: "#F8FAFC" }}>
                We're thrilled to welcome more people to this wall
              </h2>
              <p className="mt-4 text-sm md:text-base leading-relaxed max-w-2xl" style={{ color: "#94a3b8" }}>
                The people you see here are shaping DEJOIY today — and we're excited to welcome many more innovators, builders and dreamers to our team.
              </p>
              <Link
                href="/careers"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#020617] hover:bg-white/90 transition-all duration-200"
              >
                See open roles
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
