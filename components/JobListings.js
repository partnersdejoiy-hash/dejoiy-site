import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";

const jobs = [
  { title: "Customer Experience Specialist", location: "Delhi / Remote", type: "Full-time", dept: "CX Operations" },
  { title: "AI Data Operations Analyst", location: "Delhi / Remote", type: "Full-time", dept: "AI Services" },
  { title: "Trust & Safety Associate", location: "Delhi", type: "Full-time", dept: "Trust & Safety" },
  { title: "Business Operations Manager", location: "Delhi / Remote", type: "Full-time", dept: "Operations" }
];

export default function JobListings() {
  return (
    <div className="space-y-2">
      {jobs.map((job, index) => (
        <motion.div
          key={job.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="group glass-card rounded-2xl px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="shrink-0">
              <span className="badge text-[10px]">{job.dept}</span>
            </div>
            <div>
              <h3 className="text-[15px] font-semibold text-white group-hover:text-white/90 transition-colors">{job.title}</h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[12px] text-white/40">
                <span className="flex items-center gap-1">
                  <MapPin size={11} /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} /> {job.type}
                </span>
              </div>
            </div>
          </div>
          <button className="shrink-0 flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-white/70 group-hover:text-white group-hover:bg-white/[0.08] group-hover:border-white/[0.16] transition-all duration-200">
            Apply now
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
