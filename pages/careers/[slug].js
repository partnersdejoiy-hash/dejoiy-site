import Link from "next/link";
import PageIntro from "../../components/PageIntro";
import SEO from "../../components/SEO";
import ApplicationForm from "../../components/ApplicationForm";
import { jobs } from "../../data/jobs";
const general = {
  slug: "general-interest",
  title: "General application",
  dept: "Careers",
  location: "Discuss with our team",
  description:
    "Tell us about your skills and the kind of work you would like to do at DEJOIY.",
  responsibilities: ["Share your relevant experience and interests."],
  skills: ["Describe the strengths you would bring to the team."],
};
export default function Role({ job }) {
  return (
    <>
      <SEO title={job.title + " — Careers"} description={job.description} />
      <PageIntro
        eyebrow={job.dept}
        title={job.title}
        description={job.description}
      />
      <div className="section-wrap grid lg:grid-cols-2 gap-12 pb-20">
        <div>
          <Link href="/careers#roles" className="text-blue-200 text-sm">
            ← All roles
          </Link>
          <p className="mt-6 text-slate-400">{job.location}</p>
          {[
            ["What the work involves", job.responsibilities],
            ["What you bring", job.skills],
          ].map(([title, items]) => (
            <section key={title} className="mt-9">
              <h2 className="text-2xl font-semibold mb-5">{title}</h2>
              <ul className="list-disc pl-5 space-y-4 text-slate-300 leading-relaxed">
                {items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          ))}
          <p className="text-sm text-slate-400 mt-9">
            This form registers your interest. Our team will review your
            application against relevant opportunities and confirm the role
            details directly.
          </p>
        </div>
        <div className="glass rounded-3xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Introduce yourself</h2>
          <ApplicationForm role={job.title} />
        </div>
      </div>
    </>
  );
}
export function getStaticPaths() {
  return {
    paths: [...jobs, general].map((j) => ({ params: { slug: j.slug } })),
    fallback: false,
  };
}
export function getStaticProps({ params }) {
  return {
    props: { job: [...jobs, general].find((j) => j.slug === params.slug) },
  };
}
