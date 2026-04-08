import { motion } from "framer-motion";

export default function ServiceCard({ title, description, icon, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-3xl p-6 group"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.07] text-white/70 group-hover:text-white group-hover:bg-white/[0.1] transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold text-white leading-snug">{title}</h3>
      <p className="mt-2.5 text-[13.5px] text-white/50 leading-relaxed">{description}</p>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="mt-4 flex items-center gap-1.5 text-[12px] font-medium text-white/35 group-hover:text-white/70 transition-colors duration-200">
        Learn more
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  );
}
