import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import PageIntro from "../components/PageIntro";
import CallToAction from "../components/CallToAction";
const industries = [
  {
    title: "Retail & eCommerce",
    image: "/industries/retail.jpg",
    description:
      "Customer support, returns, fraud review and digital commerce operations at scale.",
  },
  {
    title: "Technology",
    image: "/industries/technology.jpg",
    description:
      "Platform support, AI operations, QA workflows and enterprise assistance.",
  },
  {
    title: "Healthcare",
    image: "/industries/healthcare.jpg",
    description:
      "Sensitive support workflows built with precision, trust and strict structure.",
  },
  {
    title: "Financial Services",
    image: "/industries/financial.jpg",
    description:
      "Compliance-aware operations, verification workflows and support services.",
  },
  {
    title: "Travel & Logistics",
    image: "/industries/travel.jpg",
    description:
      "Booking support, issue resolution and logistics coordination workflows.",
  },
  {
    title: "Social Media",
    image: "/industries/social-media.jpg",
    description:
      "Content operations, moderation and creator ecosystem support.",
  },
  {
    title: "Gaming",
    image: "/industries/gaming.jpg",
    description:
      "Player support, moderation and always-on live operations workflows.",
  },
  {
    title: "Education",
    image: "/industries/education.jpg",
    description:
      "Enrollment support, learner assistance and digital education operations.",
  },
];

export default function IndustriesPage() {
  const [active, setActive] = useState(0),
    reduced = useReducedMotion();
  useEffect(() => {
    const sync = () => {
      const i = industries.findIndex(
        (x) =>
          x.image.split("/").pop().replace(".jpg", "") ===
          window.location.hash.slice(1),
      );
      if (i >= 0) setActive(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const industry = industries[active];
  function select(i) {
    setActive(i);
    window.history.replaceState(
      null,
      "",
      `#${industries[i].image.split("/").pop().replace(".jpg", "")}`,
    );
  }
  return (
    <>
      <PageIntro
        eyebrow="Industries"
        title="Your world. Our shared focus."
        description="Every sector has its own language, pressures and moments that matter. Explore support built around the context of your business."
        image={industry.image}
      />
      <section className="industry-explorer section-wrap">
        <div className="explorer-heading">
          <span className="intro-label">Explore your industry</span>
          <h2>Context changes everything.</h2>
        </div>
        <div className="industry-layout">
          <div
            className="industry-selector"
            role="group"
            aria-label="Choose your industry"
          >
            {industries.map((x, i) => (
              <button
                aria-pressed={active === i}
                key={x.title}
                onClick={() => select(i)}
              >
                <span>0{i + 1}</span>
                {x.title}
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="industry-panel" aria-live="polite">
            <motion.img
              src={industry.image}
              key={industry.image}
              alt=""
              initial={reduced ? false : { scale: 1.07 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="industry-copy">
              <span className="intro-label">Your industry / DEJOIY</span>
              <h3>{industry.title}</h3>
              <p>{industry.description}</p>
              <Link
                href={{
                  pathname: "/contact",
                  query: { industry: industry.title },
                }}
                className="button-primary"
              >
                Discuss your operation ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
      <CallToAction />
    </>
  );
}
