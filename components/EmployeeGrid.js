import { motion } from "framer-motion";

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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {teams.map((team, index) => (
        <motion.div
          key={team.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="group relative overflow-hidden rounded-[2rem] glass min-h-[380px]"
        >
          <img
            src={team.image}
            alt={team.name}
            className="h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-primary/40 to-transparent opacity-80" />

          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="translate-y-6 opacity-100 transition-all duration-500 group-hover:translate-y-0">
              <h3 className="text-xl font-semibold">{team.name}</h3>
              <p className="text-highlight">{team.role}</p>
              <p className="mt-3 text-sm text-white/75">{team.quote}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
