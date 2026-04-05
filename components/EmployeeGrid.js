import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const employees = [
  {
    name: "Aarav Menon",
    role: "VP, Global Operations",
    quote: "Execution excellence is our unfair advantage.",
    image: "/employees/emp1.jpg"
  },
  {
    name: "Siya Sharma",
    role: "Director, AI Services",
    quote: "Human intelligence powers every successful AI workflow.",
    image: "/employees/emp2.jpg"
  },
  {
    name: "Rohan Iyer",
    role: "Head of Client Success",
    quote: "We design support systems customers actually remember.",
    image: "/employees/emp3.jpg"
  },
  {
    name: "Mira Patel",
    role: "Security & Compliance Lead",
    quote: "Trust is built into every process we deliver.",
    image: "/employees/emp4.jpg"
  }
];

export default function EmployeeGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {employees.map((employee, index) => (
        <motion.div
          key={employee.name}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className="group relative overflow-hidden rounded-[2rem] glass min-h-[380px]"
        >
          <img
            src={employee.image}
            alt={employee.name}
            className="h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-primary/40 to-transparent opacity-80" />

          <div className="absolute inset-0 flex translate-y-8 flex-col justify-end p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <h3 className="text-xl font-semibold">{employee.name}</h3>
            <p className="text-highlight">{employee.role}</p>
            <p className="mt-3 text-sm text-white/75">“{employee.quote}”</p>
            <a
              href="#"
              className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label={`LinkedIn profile for ${employee.name}`}
            >
              <Linkedin size={18} />
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}