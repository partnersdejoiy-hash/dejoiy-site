import { motion } from "framer-motion";

export default function IndustryGrid({ industries }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((industry, index) => (
        <motion.div
          key={industry.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02, y: -6 }}
          className="rounded-[2rem] glass p-6 bg-card-gradient-2"
        >
          <div className="text-lg font-semibold">{industry.title}</div>
          <p className="mt-3 text-sm text-white/65">{industry.description}</p>
        </motion.div>
      ))}
    </div>
  );
}