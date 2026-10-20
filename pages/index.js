import Link from "next/link";
import HelpRoutes from "../components/HelpRoutes";
import HeroSection from "../components/HeroSection";
import ExperienceStatement from "../components/ExperienceStatement";
import ServiceOrbit from "../components/ServiceOrbit";
import AIServicesViz from "../components/AIServicesViz";
import WorkflowStory from "../components/WorkflowStory";
import WorldPresence from "../components/WorldPresence";
import EmployeeGrid from "../components/EmployeeGrid";
import CallToAction from "../components/CallToAction";
import InsightCard from "../components/InsightCard";
import { insights } from "../data/insights";
export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="signal-strip" aria-label="What DEJOIY delivers">
        <div className="signal-track">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
              {[
                "Customer support",
                "Voice · Chat · Email",
                "Back-office support",
                "Data entry",
                "Technical support",
                "Human-in-the-loop AI",
                "Quality review",
              ].map((item) => (
                <li key={item}>
                  <span aria-hidden="true">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <ExperienceStatement />
      <ServiceOrbit />
      <div className="section-wrap orbit-more">
        <Link href="/services" className="button-ghost">
          See all eight service lines ↗
        </Link>
      </div>
      <WorkflowStory />
      <section className="section-wrap section-space">
        <span className="badge mb-5">Explore the workflow</span>
        <h2 className="section-title">
          Human expertise.
          <br />
          <em className="serif-accent">Intelligent connections.</em>
        </h2>
        <p className="section-copy mb-10">
          Choose a capability to explore its workflow. These diagrams illustrate
          the approach, rather than live operational data.
        </p>
        <AIServicesViz />
      </section>
      <section className="section-wrap section-space">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge mb-5">Designed for your market</span>
            <h2 className="section-title">
              Connected teams.
              <br />
              Considered coverage.
            </h2>
            <p className="section-copy">
              Build support around your customers’ location, language and
              working hours. Start with the regions that matter to your
              business.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                ["Clear ownership", "Defined handoffs and escalation paths."],
                [
                  "Quality controls",
                  "Shared scorecards and regular calibration.",
                ],
              ].map(([t, d]) => (
                <div className="glass rounded-2xl p-5" key={t}>
                  <h3 className="font-semibold text-sm">{t}</h3>
                  <p className="text-sm text-slate-400 mt-2">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <WorldPresence />
        </div>
      </section>
      <section className="section-wrap section-space">
        <div className="section-heading-row">
          <div>
            <span className="badge mb-5">People make the difference</span>
            <h2 className="section-title">
              Built by people.
              <br />
              For people.
            </h2>
          </div>
          <Link href="/our-people" className="button-secondary">
            Meet our people ↗
          </Link>
        </div>
        <EmployeeGrid />
      </section>
      <section className="section-wrap section-space">
        <div className="section-heading-row">
          <div>
            <span className="badge mb-5">Ideas for better operations</span>
            <h2 className="section-title">A closer look at the work.</h2>
          </div>
          <Link href="/insights" className="button-secondary">
            Explore insights ↗
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {insights.slice(0, 3).map((a, i) => (
            <InsightCard key={a.slug} {...a} index={i} />
          ))}
        </div>
      </section>
      <section className="section-wrap section-space">
        <div className="section-heading-row">
          <div>
            <span className="badge mb-5">Here to help</span>
            <h2 className="section-title">The right place to start.</h2>
          </div>
          <Link href="/help" className="button-secondary">
            Help & Documents ↗
          </Link>
        </div>
        <HelpRoutes compact />
      </section>
      <CallToAction />
    </>
  );
}
