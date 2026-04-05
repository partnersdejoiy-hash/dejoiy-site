import { motion } from "framer-motion";

const jobs = [
  {
    title: "Customer Experience Specialist",
    location: "Delhi / Remote",
    type: "Full-time"
  },
  {
    title: "AI Data Operations Analyst",
    location: "Delhi / Remote",
    type: "Full-time"
  },
  {
    title: "Trust & Safety Associate",
    location: "Delhi",
    type: "Full-time"
  },
  {
    title: "Business Operations Manager",
    location: "Delhi / Remote",
    type: "Full-time"
  }
];

export default function JobListings() {
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <motion.div
          key={job.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          whileHover={{ scale: 1.01 }}
          className="glass rounded-[2rem] p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p className="mt-2 text-white/60">
              {job.location} • {job.type}
            </p>
          </div>
          <button className="rounded-full bg-gradient-to-r from-accent via-secondary to-highlight px-5 py-3 text-sm font-semibold shadow-glow hover:scale-[1.03] transition-all">
            Apply now
          </button>
        </motion.div>
      ))}
    </div>
  );
}