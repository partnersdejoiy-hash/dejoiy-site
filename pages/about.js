import Link from "next/link";
import PageIntro from "../components/PageIntro";
import WorkflowStory from "../components/WorkflowStory";
import CallToAction from "../components/CallToAction";
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="About DEJOIY"
        title="Human connection is at the heart of the work."
        description="DEJOIY brings customer experience, business process support and AI-assisted operations together. Our focus is clear: give people the process, context and tools to deliver better service."
      />
      <section className="section-wrap grid md:grid-cols-3 gap-5">
        {[
          [
            "People",
            "Empathy and judgment matter. We build workflows around the people delivering the service and the people receiving it.",
          ],
          [
            "Process",
            "Clear roles, documented decisions and thoughtful handoffs make an operation easier to run and improve.",
          ],
          [
            "Technology",
            "Automation should support the work. Human review stays part of the plan wherever context and judgment are needed.",
          ],
        ].map(([t, d]) => (
          <div key={t} className="glass p-8 rounded-3xl">
            <h2 className="text-2xl font-semibold">{t}</h2>
            <p className="mt-5 text-slate-400 leading-relaxed">{d}</p>
          </div>
        ))}
        <Link
          className="button-secondary md:col-span-3 justify-self-start mt-5"
          href="/our-people"
        >
          Meet our people ↗
        </Link>
      </section>
      <WorkflowStory />
      <CallToAction />
    </>
  );
}
