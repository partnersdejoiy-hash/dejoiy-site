import { motion } from "framer-motion";

export default function IndustryGrid({ industries }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((industry, index) => (
        <motion.div
          key={industry.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-2xl p-5 group"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="h-2 w-2 rounded-full shrink-0" style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)" }} />
            <h3 className="text-[14px] font-semibold" style={{ color: "#F8FAFC" }}>{industry.title}</h3>
          </div>
          <p className="text-[12.5px] leading-relaxed" style={{ color: "#94a3b8" }}>{industry.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
