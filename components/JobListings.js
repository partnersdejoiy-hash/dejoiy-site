import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { jobs } from "../data/jobs";
export default function JobListings() {
  const [dept, setDept] = useState("All"),
    [query, setQuery] = useState(""),
    reduced = useReducedMotion();
  const filtered = jobs.filter(
    (j) =>
      (dept === "All" || dept === j.dept) &&
      `${j.title} ${j.location}`
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <div className="job-browser">
      <div className="job-toolbar">
        <label className="help-search">
          <span className="sr-only">Search roles</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find your kind of work…"
          />
        </label>
        <div
          className="filter-chips"
          role="group"
          aria-label="Filter roles by team"
        >
          {["All", ...new Set(jobs.map((j) => j.dept))].map((d) => (
            <button
              key={d}
              aria-pressed={dept === d}
              onClick={() => setDept(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} roles to explore · Register your interest
      </p>
      <div>
        {filtered.map((job, i) => (
          <motion.article
            key={job.slug}
            initial={reduced ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
            className="job-row"
          >
            <span className="job-number">0{jobs.indexOf(job) + 1}</span>
            <div>
              <span className="intro-label">{job.dept}</span>
              <h3>
                <Link href={`/careers/${job.slug}`}>{job.title}</Link>
              </h3>
              <p>{job.location}</p>
            </div>
            <Link className="job-link" href={`/careers/${job.slug}`}>
              View role <span aria-hidden="true">↗</span>
              <span className="sr-only">: {job.title}</span>
            </Link>
          </motion.article>
        ))}
      </div>
      {!filtered.length && (
        <div className="help-empty">
          <h3>No roles match your search.</h3>
          <button
            className="button-secondary mt-4"
            onClick={() => {
              setDept("All");
              setQuery("");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
