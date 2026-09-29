import PageIntro from "../components/PageIntro";
import JobListings from "../components/JobListings";
import Link from "next/link";
export default function Careers() {
  return (
    <>
      <PageIntro
        eyebrow="Careers at DEJOIY"
        title="Good work starts with good people."
        description="Bring your curiosity, care and problem-solving skills to customer experience and business operations."
      >
        <a href="#roles" className="button-primary mt-7">
          Explore roles ↓
        </a>
      </PageIntro>
      <section className="section-wrap">
        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {[
            [
              "People first",
              "Listen carefully, communicate clearly and make every interaction count.",
            ],
            [
              "Learn through the work",
              "Build process knowledge through feedback, collaboration and practice.",
            ],
            [
              "Own the outcome",
              "Bring care to the details and take responsibility for the next step.",
            ],
          ].map(([t, d]) => (
            <div className="glass rounded-3xl p-7" key={t}>
              <h2 className="text-xl font-semibold">{t}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mt-4">{d}</p>
            </div>
          ))}
        </div>
        <div id="roles" className="pb-20">
          <span className="badge mb-5">Join the conversation</span>
          <h2 className="section-title">Roles we hire for</h2>
          <p className="section-copy mb-8">
            Explore a role and register your interest. Availability, location,
            compensation and working arrangements are confirmed by our team
            during recruitment.
          </p>
          <JobListings />
          <p className="text-sm text-slate-400 mt-8">
            Have another skill to share?{" "}
            <Link className="text-blue-200" href="/careers/general-interest">
              Send a general application ↗
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
