import { motion } from "framer-motion";
import { Linkedin, ArrowRight } from "lucide-react";

const teams = [
  {
    name: "Customer Experience Team",
    role: "Omnichannel Support Excellence",
    quote: "Delivering responsive, human-centered support at global scale.",
    image: "/employees/team1.jpg"
  },
  {
    name: "AI Data Operations Team",
    role: "Annotation, Validation & QA",
    quote: "Powering next-generation AI systems with structured human intelligence.",
    image: "/employees/team2.jpg"
  },
  {
    name: "Trust & Safety Team",
    role: "Policy Enforcement & Risk Review",
    quote: "Protecting platforms through disciplined moderation and review workflows.",
    image: "/employees/team3.jpg"
  },
  {
    name: "Web Design & Digital Team",
    role: "Design, Development & Experience",
    quote: "Building premium digital experiences that look sharp and perform better.",
    image: "/employees/team4.jpg"
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
          className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] min-h-[380px] cursor-pointer"
        >
          <img
            src={team.image}
            alt={team.name}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#05071a] via-[#05071a]/55 to-transparent transition-all duration-500 group-hover:from-[#05071a]/95" />

          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              border: "1px solid rgba(107,92,255,0.3)",
              boxShadow: "0 0 60px rgba(107,92,255,0.08) inset"
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-5">
            <div className="transition-all duration-500">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#b8aaff] mb-1.5">
                {team.role}
              </p>
              <h3 className="text-[15px] font-semibold text-white leading-snug">{team.name}</h3>
              <p className="mt-2.5 text-[12.5px] text-white/55 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                "{team.quote}"
              </p>

              <div className="mt-4 flex items-center gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.08] text-white/60 hover:text-white hover:bg-[#0077B5]/30 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={13} />
                </a>
                <span className="flex items-center gap-1 text-[11.5px] text-white/40 ml-1 hover:text-white/70 transition-colors cursor-pointer">
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
