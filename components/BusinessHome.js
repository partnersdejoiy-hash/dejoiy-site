import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Plus,
  Minus,
  Pause,
  Play,
} from "lucide-react";
import { services } from "../data/services";
import { insights } from "../data/insights";
const Scene = dynamic(() => import("./ConnectionScene"), { ssr: false });
const pathways = [
  {
    label: "Customer experience",
    title: "Make every conversation count.",
    description:
      "Voice, chat and email support that brings clear ownership to every customer interaction.",
    slugs: ["customer-experience", "sales-support"],
    image: "/services/customer-experience.jpg",
    alt: "Illustrative customer support setting",
    note: "Care that carries your brand.",
  },
  {
    label: "Business operations",
    title: "Give good work a clear path.",
    description:
      "Accurate processing, thoughtful documentation and dependable handoffs for your everyday operations.",
    slugs: ["back-office", "financial-compliance"],
    image: "/services/back-office.jpg",
    alt: "Illustrative business operations setting",
    note: "Clarity from input to outcome.",
  },
  {
    label: "AI & digital trust",
    title: "Put human judgment to work.",
    description:
      "Human review, evaluation and policy-led decisions for the moments automation cannot handle alone.",
    slugs: [
      "ai-data-operations",
      "ai-model-training",
      "trust-safety",
      "content-moderation",
    ],
    image: "/services/ai-data-operations.jpg",
    alt: "Illustration of AI data workflows",
    note: "Intelligence needs perspective.",
  },
];
const stages = [
  [
    "Understand",
    "Start with your customers.",
    "We map your goals, customer journeys and contact reasons to find the moments that need care.",
    "Discovery, journey mapping, success measures",
  ],
  [
    "Design",
    "Give every request a path.",
    "Together, we define channels, responsibilities, knowledge and escalation rules before the first handoff.",
    "Playbooks, ownership, escalation paths",
  ],
  [
    "Deliver",
    "Equip people to do great work.",
    "Training, agreed tools and clear working practices connect your requirements with day-to-day delivery.",
    "People, training, approved tools",
  ],
  [
    "Improve",
    "Make the next experience better.",
    "Quality reviews and shared feedback help turn recurring issues into practical improvements.",
    "Quality sampling, calibration, feedback",
  ],
];
const industries = [
  ["Retail & commerce", "retail"],
  ["Technology", "technology"],
  ["Travel & hospitality", "travel"],
  ["Financial services", "financial"],
];
function Reveal({ children, className = "", ...props }) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ y: [18, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
export default function BusinessHome() {
  const [active, setActive] = useState(0),
    [stage, setStage] = useState(0),
    [paused, setPaused] = useState(false);
  const chosen = pathways[active];
  const film = useRef(null);
  const reduced = useReducedMotion();
  return (
    <div className="business-world">
      <section className="connection-hero">
        <div className="connection-hero-top">
          <h1>
            Better,
            <br />
            together.
          </h1>
          <motion.div
            className="hero-intro"
            initial={false}
            animate={{ y: [16, 0] }}
            transition={{ duration: 0.7 }}
          >
            <p>
              People-led BPO.
              <br />
              Intelligently connected.
            </p>
            <p>
              We bring care to customer experience, clarity to operations, and
              human judgment to AI.
            </p>
            <Link className="world-button dark" href="/contact">
              Let’s build your next chapter <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </div>
        <div className="hero-object">
          <Scene active={active} paused={paused} />
          <div className="object-caption">
            <span>People. Process. Possibility.</span>
            <button
              onClick={() => setPaused(!paused)}
              aria-label={paused ? "Play 3D animation" : "Pause 3D animation"}
              aria-pressed={paused}
            >
              {paused ? <Play size={16} /> : <Pause size={16} />}
            </button>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#possibilities">
            A more connected way to work <ArrowDown size={18} />
          </a>
          <span>Customer experience · Operations · AI</span>
        </div>
      </section>
      <section className="possibility-chapter" id="possibilities">
        <Reveal className="chapter-heading">
          <h2>
            Your next
            <br />
            possibility.
          </h2>
          <p>
            Bring your customer journeys, everyday processes and specialist
            workflows into focus. Where should we start?
          </p>
        </Reveal>
        <div
          className="pathway-tabs"
          role="tablist"
          aria-label="Explore business needs"
        >
          {pathways.map((p, i) => (
            <button
              key={p.label}
              id={`pathway-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="pathway-panel"
              tabIndex={active === i ? 0 : -1}
              onKeyDown={(e) => {
                if (
                  ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 2
                        : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                  setActive(next);
                  document.getElementById(`pathway-tab-${next}`)?.focus();
                }
              }}
              onClick={() => setActive(i)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div
          className="pathway-panel"
          id="pathway-panel"
          role="tabpanel"
          aria-labelledby={`pathway-tab-${active}`}
        >
          <div className="pathway-photo">
            <Image
              src={chosen.image}
              alt={chosen.alt}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </div>
          <div className="pathway-copy">
            <h3>{chosen.title}</h3>
            <p>{chosen.description}</p>
            <div className="pathway-links">
              {chosen.slugs.map((slug) => {
                const s = services.find((s) => s.slug === slug);
                return (
                  <Link key={slug} href={`/services/${slug}`}>
                    {s.title}
                    <ArrowUpRight size={21} />
                  </Link>
                );
              })}
            </div>
            <Link href="/services" className="world-text-link">
              Explore all our expertise <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
      <section className="human-chapter">
        <Reveal>
          <h2>
            People make
            <br />
            it matter.
          </h2>
        </Reveal>
        <div className="human-story">
          <p>Technology connects the work. People make it matter.</p>
          <div>
            <p>
              Behind every query, every decision and every handoff is a person.
              We build operations around that simple truth—with care, clear
              standards and accountable delivery.
            </p>
            <Link href="/about" className="world-text-link">
              Get to know DEJOIY <ArrowUpRight size={22} />
            </Link>
          </div>
        </div>
        <Reveal className="human-photo">
          <Image
            src="/brand/careers-hero.jpg"
            alt="Illustrative workplace collaboration"
            fill
            sizes="100vw"
          />
          <span>Good work starts with people.</span>
        </Reveal>
      </section>
      <section className="delivery-chapter" id="delivery">
        <Reveal className="chapter-heading">
          <h2>
            Service.
            <br />
            By design.
          </h2>
          <p>
            A connected operation gives each handoff a purpose. Explore how we
            turn your requirements into a considered delivery approach.
          </p>
        </Reveal>
        <div className="delivery-accordion">
          {stages.map(([name, title, copy, detail], i) => (
            <div
              key={name}
              className={`delivery-stage stage-${i} ${stage === i ? "is-open" : ""}`}
            >
              <button
                aria-expanded={stage === i}
                aria-controls={`stage-content-${i}`}
                onClick={() => setStage(i)}
              >
                <span>{name}</span>
                {stage === i ? <Minus size={23} /> : <Plus size={23} />}
              </button>
              <div id={`stage-content-${i}`} hidden={stage !== i}>
                <h3>{title}</h3>
                <p>{copy}</p>
                <span className="stage-detail">{detail}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="industry-chapter">
        <Reveal className="chapter-heading">
          <h2>
            Your world.
            <br />
            Our focus.
          </h2>
          <div>
            <p>
              Different industries. Different challenges. An approach shaped
              around the people you serve.
            </p>
            <Link href="/industries" className="world-text-link">
              Explore your industry <ArrowUpRight size={22} />
            </Link>
          </div>
        </Reveal>
        <div className="industry-controls">
          <span>Explore the industries we support</span>
          <div>
            {[-1, 1].map((direction) => (
              <button
                key={direction}
                aria-label={
                  direction === 1 ? "Next industries" : "Previous industries"
                }
                onClick={() =>
                  film.current?.scrollBy({
                    left: direction * film.current.clientWidth * 0.65,
                    behavior: reduced ? "auto" : "smooth",
                  })
                }
              >
                <ArrowRight
                  size={22}
                  style={{
                    transform: direction === -1 ? "rotate(180deg)" : undefined,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
        <div
          ref={film}
          className="industry-film"
          role="region"
          aria-label="Industry gallery"
          tabIndex={0}
        >
          {industries.map(([name, slug]) => (
            <Link
              href={`/industries#${slug}`}
              key={slug}
              className="industry-frame"
            >
              <div className="industry-image">
                <Image
                  src={`/industries/${slug}.jpg`}
                  fill
                  sizes="(max-width: 760px) 80vw, 35vw"
                  alt={`Illustrative ${name.toLowerCase()} setting`}
                />
              </div>
              <span>
                {name}
                <ArrowUpRight size={23} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="ideas-chapter">
        <Reveal className="chapter-heading">
          <h2>
            A fresh
            <br />
            perspective.
          </h2>
          <Link href="/insights" className="world-text-link">
            Explore our thinking <ArrowUpRight size={22} />
          </Link>
        </Reveal>
        <div className="ideas-layout">
          {insights.slice(0, 3).map((item, i) => (
            <Link
              className={`idea-story idea-${i}`}
              href={`/insights/${item.slug}`}
              key={item.slug}
            >
              <div className="idea-image">
                <Image
                  src={item.image}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                  alt=""
                />
              </div>
              <h3>
                {
                  [
                    "Support you can rely on",
                    "Human judgment in AI",
                    "Consistent policy review",
                  ][i]
                }
                <ArrowUpRight size={23} />
              </h3>
              <p>{item.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="next-chapter">
        <Reveal>
          <h2>
            Next starts
            <br />
            together.
          </h2>
        </Reveal>
        <div className="next-actions">
          <p>
            Tell us what your customers and operations need. We’ll work through
            the right approach with you.
          </p>
          <Link href="/contact" className="world-button dark">
            Start a conversation <ArrowUpRight size={22} />
          </Link>
        </div>
      </section>
      <section className="help-band">
        <h2>Here for something else?</h2>
        <div>
          <Link href="/careers">
            Find your next role <ArrowUpRight size={20} />
          </Link>
          <Link href="/employee-documents">
            Employee documents <ArrowUpRight size={20} />
          </Link>
          <Link href="/employee-verification">
            Verify employment <ArrowUpRight size={20} />
          </Link>
          <Link href="/help">
            Help & request tracking <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
