import Link from "next/link";
import { jobs } from "../data/jobs";
export default function JobListings() {
  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <article
          className="glass rounded-2xl p-6 flex flex-col sm:flex-row justify-between gap-5 sm:items-center"
          key={job.slug}
        >
          <div>
            <span className="eyebrow">{job.dept}</span>
            <h3 className="mt-3 text-lg font-semibold">{job.title}</h3>
            <p className="mt-2 text-sm text-slate-400">
              {job.location} · Register your interest
            </p>
          </div>
          <Link
            href={`/careers/${job.slug}`}
            className="button-secondary shrink-0"
          >
            View role & apply ↗<span className="sr-only">: {job.title}</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
