import { motion } from "framer-motion";
import { Linkedin, ArrowRight } from "lucide-react";

const teams = [
  {
    name: "Customer Experience Team",
    role: "Omnichannel Support Excellence",
    quote: "Delivering responsive, human-centered support at global scale.",
    image: "/employees/team1.jpg",
    accent: "#2563EB",
    glow: "rgba(37,99,235,0.25)"
  },
  {
    name: "AI Data Operations Team",
    role: "Annotation, Validation & QA",
    quote: "Powering next-generation AI systems with structured human intelligence.",
    image: "/employees/team2.jpg",
    accent: "#7C3AED",
    glow: "rgba(124,58,237,0.25)"
  },
  {
    name: "Trust & Safety Team",
    role: "Policy Enforcement & Risk Review",
    quote: "Protecting platforms through disciplined moderation and review workflows.",
    image: "/employees/team3.jpg",
    accent: "#06B6D4",
    glow: "rgba(6,182,212,0.25)"
  },
  {
    name: "Web Design & Digital Team",
    role: "Design, Development & Experience",
    quote: "Building premium digital experiences that look sharp and perform better.",
    image: "/employees/team4.jpg",
    accent: "#8B5CF6",
    glow: "rgba(139,92,246,0.25)"
  }
];

export default function EmployeeGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {teams.map((team, index) => (
        <motion.div
          key={team.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -10, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
          className="group relative overflow-hidden rounded-3xl cursor-pointer min-h-[420px]"
          style={{
            background: "rgba(15,23,42,0.7)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)"
          }}
        >
          <img
            src={team.image}
            alt={team.name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: "scale(1)", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />

          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              background: `linear-gradient(to top, #020617 0%, rgba(2,6,23,0.82) 38%, rgba(2,6,23,0.25) 65%, transparent 100%)`
            }}
          />

          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(to top, rgba(2,6,23,0.98) 0%, rgba(2,6,23,0.78) 42%, rgba(2,6,23,0.12) 100%)`
            }}
          />

          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
            style={{
              border: `1px solid ${team.accent}70`,
              boxShadow: `0 0 50px ${team.glow} inset, 0 0 80px ${team.glow}`
            }}
          />

          <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${team.accent}90, transparent)` }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
                style={{ color: team.accent }}
              >
                {team.role}
              </p>
              <h3 className="text-[15px] font-semibold leading-snug" style={{ color: "#F8FAFC" }}>
                {team.name}
              </h3>
              <p
                className="mt-2.5 text-[12.5px] leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500"
                style={{ color: "#CBD5E1" }}
              >
                "{team.quote}"
              </p>

              <div className="mt-4 flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.09)",
                    color: "#CBD5E1"
                  }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={13} />
                </a>
                <span
                  className="flex items-center gap-1 text-[11.5px] ml-1 transition-colors cursor-pointer hover:opacity-90 font-medium"
                  style={{ color: team.accent }}
                >
                  View team <ArrowRight size={11} />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
