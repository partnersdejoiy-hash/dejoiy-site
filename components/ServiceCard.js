import { motion } from "framer-motion";

export default function ServiceCard({
  title,
  description,
  icon,
  gradient = "bg-card-gradient-1"
}) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className={`group relative overflow-hidden rounded-[2rem] ${gradient} glass p-6 glow-border`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl group-hover:scale-125 transition-transform duration-500" />
      <div className="relative z-10">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-3 text-white/65">{description}</p>
      </div>
    </motion.div>
  );
}