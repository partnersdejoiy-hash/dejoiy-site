import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Pause,
  Play,
  Plus,
  Minus,
  Headphones,
  MessageSquare,
  Mail,
} from "lucide-react";
import { services } from "../data/services";
import { insights } from "../data/insights";
const Scene = dynamic(() => import("./ConnectionScene"), { ssr: false });
const chapters = [
  {
    word: "Connect.",
    title: "Every channel.\nReal connection.",
    body: "Voice, chat or email. Bring every customer conversation into a shared experience, with a clear path to the right person.",
    detail: "Customer experience & sales support",
    href: "/services/customer-experience",
  },
  {
    word: "Understand.",
    title: "Smart systems.\nHuman care.",
    body: "People bring context to the work. We connect playbooks, human judgment and quality review before the next decision is made.",
    detail: "AI operations, moderation & trust",
    href: "/services/ai-data-operations",
  },
  {
    word: "Resolve.",
    title: "Make every\nhandoff count.",
    body: "Clear ownership. Agreed escalation paths. A feedback loop that helps your next customer experience become a better one.",
    detail: "Business operations & quality",
    href: "/services/back-office",
  },
];
const groups = [
  {
    name: "Customer experience",
    headline: "Care that feels like your brand.",
    copy: "Be there for the conversations that matter, with ownership from first contact to resolution.",
    image: "/services/customer-experience.jpg",
    slugs: ["customer-experience", "sales-support"],
  },
  {
    name: "AI & digital trust",
    headline: "Human care. Clear standards.",
    copy: "Bring context, calibration and consistent review to the work that needs a human perspective.",
    image: "/services/ai-data-operations.jpg",
    slugs: [
      "ai-data-operations",
      "ai-model-training",
      "trust-safety",
      "content-moderation",
    ],
  },
  {
    name: "Business operations",
    headline: "Better flow. From input to outcome.",
    copy: "Connect documentation, processing and review in an operation built around accuracy and accountability.",
    image: "/services/back-office.jpg",
    slugs: ["back-office", "financial-compliance"],
  },
];
const stages = [
  [
    "Understand",
    "Start with your customers.",
    "Map business goals, contact reasons and the moments that need a human touch.",
  ],
  [
    "Design",
    "Give every request a path.",
    "Define channels, responsibilities, knowledge and escalation rules before the first handoff.",
  ],
  [
    "Deliver",
    "Equip people for good work.",
    "Bring playbooks, training and agreed tools into one consistent workflow.",
  ],
  [
    "Improve",
    "Close the loop with quality.",
    "Review interactions, learn from exceptions and turn feedback into practical improvements.",
  ],
];
function ArrowLink({ children, href, className = "" }) {
  return (
    <Link href={href} className={`dejoiy-link ${className}`}>
      {children}
      <span>
        <ArrowUpRight size={19} strokeWidth={1.5} />
      </span>
    </Link>
  );
}
function Reveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ y: [32, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export default function BusinessHome() {
  const story = useRef(null),
    photo = useRef(null),
    manifesto = useRef(null),
    film = useRef(null);
  const progressRef = useRef(0);
  const [view, setView] = useState(-1),
    [channel, setChannel] = useState(0),
    [paused, setPaused] = useState(false),
    [group, setGroup] = useState(0),
    [stage, setStage] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    let revert,
      disposed = false;
    Promise.all([import("gsap"), import("gsap/dist/ScrollTrigger")]).then(
      ([g, s]) => {
        if (disposed) return;
        const gsap = g.gsap || g.default,
          ScrollTrigger = s.ScrollTrigger || s.default;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          ScrollTrigger.create({
            trigger: story.current,
            start: "top top",
            end: "bottom bottom",
            onUpdate: (self) => {
              progressRef.current = self.progress;
              story.current.style.setProperty(
                "--story-progress",
                self.progress,
              );
              story.current
                .querySelectorAll(".chapter-track i")
                .forEach((bar, i) => {
                  bar.style.transform = `scaleX(${Math.max(0, Math.min(1, self.progress * 3 - i))})`;
                });
              setView(
                self.progress < 0.08
                  ? -1
                  : Math.min(2, Math.floor(self.progress * 3)),
              );
            },
          });
          if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            gsap.fromTo(
              photo.current.querySelector(".human-aperture"),
              { clipPath: "inset(13% 17% 13% 17% round 150px)", scale: 0.9 },
              {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: photo.current,
                  start: "top top",
                  end: "55% bottom",
                  scrub: 1,
                },
              },
            );
            gsap.fromTo(
              photo.current.querySelector("img"),
              { scale: 1.16 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: photo.current,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 1,
                },
              },
            );
            gsap.fromTo(
              photo.current.querySelector(".human-photo-copy"),
              { y: 80, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: photo.current,
                  start: "20% top",
                  end: "50% top",
                  scrub: 1,
                },
              },
            );
            gsap.to(manifesto.current.querySelectorAll(".manifesto-word"), {
              color: "#121835",
              stagger: 0.13,
              ease: "none",
              scrollTrigger: {
                trigger: manifesto.current,
                start: "top 65%",
                end: "bottom 55%",
                scrub: 1,
              },
            });
          }
        });
        revert = () => context.revert();
        ScrollTrigger.refresh();
      },
    );
    return () => {
      disposed = true;
      revert?.();
    };
  }, []);
  const current = Math.max(0, view);
  const started = view >= 0;
  const jump = (i) => {
    const rect = story.current.getBoundingClientRect();
    const top =
      scrollY +
      rect.top +
      (story.current.offsetHeight - innerHeight) * (i / 3 + 0.11);
    window.scrollTo({ top, behavior: reduced ? "instant" : "smooth" });
  };
  const selected = groups[group];
  return (
    <div className="business-world dejoiy-v2">
      <section
        ref={story}
        className={`connection-story ${started ? "story-started" : ""}`}
        aria-label="The DEJOIY connection"
      >
        <div className="connection-stage">
          <div className="story-copy">
            <div className="story-intro">
              <span className="story-marker">
                <span /> People-led. Possibility-driven.
              </span>
              <h1>
                Good business.
                <br />
                Great humans.
              </h1>
              <p>
                Customer experience, business operations and AI. Connected by
                people who care about getting it right.
              </p>
              <ArrowLink href="/contact" className="primary">
                Build your next chapter
              </ArrowLink>
            </div>
            <div className="chapter-copy" aria-live="off">
              {chapters.map((c, i) => (
                <div
                  className={`chapter-text ${i === current ? "is-current" : ""}`}
                  key={c.word}
                  aria-hidden={i !== current}
                >
                  <span className="chapter-word">{c.word}</span>
                  <h2>
                    {c.title.split("\n").map((t, n) => (
                      <span key={t}>
                        {t}
                        {n === 0 && <br />}
                      </span>
                    ))}
                  </h2>
                  <p>{c.body}</p>
                  <ArrowLink href={c.href}>{c.detail}</ArrowLink>
                </div>
              ))}
            </div>
          </div>
          <div className="story-visual">
            <Scene
              progressRef={progressRef}
              phase={view}
              channel={channel}
              paused={paused}
            />
            <div className="scene-annotation annotation-top">
              <span className="annotation-dot" />
              The DEJOIY connection
            </div>
            <div className="scene-annotation annotation-bottom">
              <span>
                {
                  [
                    "A conversation starts here.",
                    "Human judgment enters the loop.",
                    "A clear path to resolution.",
                  ][current]
                }
              </span>
              <button
                type="button"
                onClick={() => setPaused(!paused)}
                aria-label={
                  paused ? "Play 3D experience" : "Pause 3D experience"
                }
                aria-pressed={paused}
              >
                {paused ? <Play size={15} /> : <Pause size={15} />}
              </button>
            </div>
            <div
              className={`signal-label signal-label-${current}`}
              aria-hidden="true"
            >
              <span className="signal-spark" />
              {
                [
                  `${["Voice", "Chat", "Email"][channel]} conversation starts`,
                  "Context meets care",
                  "Ownership → resolution",
                ][current]
              }
            </div>
          </div>
          <div className="story-controls">
            <div
              className="channel-switch"
              aria-label="Choose a customer channel"
            >
              {[
                ["Voice", Headphones],
                ["Chat", MessageSquare],
                ["Email", Mail],
              ].map(([name, Icon], i) => (
                <button
                  key={name}
                  onClick={() => setChannel(i)}
                  aria-pressed={channel === i}
                >
                  <Icon size={17} strokeWidth={1.5} />
                  {name}
                </button>
              ))}
            </div>
            <div className="story-chapters" aria-label="Explore the connection">
              {chapters.map((c, i) => (
                <button
                  key={c.word}
                  onClick={() => jump(i)}
                  aria-current={current === i ? "step" : undefined}
                >
                  <span className="chapter-track">
                    <i
                      style={{
                        transform: `scaleX(${Math.max(0, Math.min(1, progressRef.current * 3 - i))})`,
                      }}
                    />
                  </span>
                  {c.word}
                </button>
              ))}
            </div>
            <a href="#human" className="story-scroll">
              Scroll to connect <ArrowDown size={17} />
            </a>
          </div>
        </div>
      </section>
      <section ref={photo} className="human-reveal" id="human">
        <div className="human-sticky">
          <div className="human-aperture">
            <Image
              src="/brand/careers-hero.jpg"
              fill
              sizes="100vw"
              alt="Illustrative workplace collaboration"
            />
            <div className="human-photo-copy">
              <h2>
                People make
                <br />
                it matter.
              </h2>
              <p>
                Technology makes connections possible.
                <br />
                People make them matter.
              </p>
              <ArrowLink href="/our-people">
                Meet the people behind DEJOIY
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>
      <section className="human-manifesto" ref={manifesto}>
        <p>
          {"A great experience is never just a process. It is someone listening. Someone taking ownership. Someone making the next step feel effortless."
            .split(" ")
            .map((word, i) => (
              <span className="manifesto-word" key={i}>
                {word}{" "}
              </span>
            ))}
        </p>
        <span>That’s the human difference.</span>
      </section>
      <section className="expertise-chapter" id="expertise">
        <Reveal className="v2-heading">
          <h2>
            One partner.
            <br />
            Many strengths.
          </h2>
          <p>
            Your challenges don’t live in separate boxes. Neither should the
            teams solving them.
          </p>
        </Reveal>
        <div
          className="expertise-tabs"
          role="tablist"
          aria-label="Explore expertise"
        >
          {groups.map((g, i) => (
            <button
              role="tab"
              key={g.name}
              id={`expertise-tab-${i}`}
              aria-controls="expertise-panel"
              aria-selected={group === i}
              tabIndex={group === i ? 0 : -1}
              onClick={() => setGroup(i)}
              onKeyDown={(e) => {
                if (
                  ["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)
                ) {
                  e.preventDefault();
                  const n =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 2
                        : (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                  setGroup(n);
                  document.getElementById(`expertise-tab-${n}`)?.focus();
                }
              }}
            >
              {g.name}
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </button>
          ))}
        </div>
        <div
          className="expertise-stage"
          role="tabpanel"
          id="expertise-panel"
          aria-labelledby={`expertise-tab-${group}`}
        >
          <div className="expertise-stage-photo">
            <Image
              src={selected.image}
              fill
              sizes="(max-width:760px) 100vw, 50vw"
              alt={`Illustrative ${selected.name.toLowerCase()} setting`}
            />
          </div>
          <div className="expertise-stage-copy">
            <h3>{selected.headline}</h3>
            <p>{selected.copy}</p>
            <div>
              {selected.slugs.map((slug) => (
                <ArrowLink href={`/services/${slug}`} key={slug}>
                  {services.find((s) => s.slug === slug).title}
                </ArrowLink>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="delivery-chapter-v2">
        <Reveal className="v2-heading">
          <h2>
            Good service.
            <br />
            By design.
          </h2>
          <p>
            From the first conversation to the next improvement. Every step has
            a purpose—and an owner.
          </p>
        </Reveal>
        <div className="delivery-workspace">
          <div className="delivery-spine" aria-hidden="true">
            <div className="delivery-wire" />
            <div
              className="delivery-pulse"
              style={{ transform: `translateY(${stage * 88}px)` }}
            />
            <span>Understand</span>
            <span>Design</span>
            <span>Deliver</span>
            <span>Improve</span>
          </div>
          <div className="delivery-steps">
            {stages.map(([name, title, copy], i) => (
              <div
                key={name}
                className={`delivery-row ${stage === i ? "is-open" : ""}`}
              >
                <button
                  onClick={() => setStage(i)}
                  aria-expanded={stage === i}
                  aria-controls={`delivery-${i}`}
                >
                  <span>{name}</span>
                  {stage === i ? <Minus size={22} /> : <Plus size={22} />}
                </button>
                <div hidden={stage !== i} id={`delivery-${i}`}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="industries-chapter-v2">
        <Reveal className="v2-heading">
          <h2>
            Your world.
            <br />
            Our focus.
          </h2>
          <div>
            <p>
              Customer expectations change by industry. Our approach starts with
              yours.
            </p>
            <ArrowLink href="/industries">Find your industry</ArrowLink>
          </div>
        </Reveal>
        <div
          className="industry-film-v2"
          ref={film}
          role="region"
          aria-label="Industries"
          tabIndex={0}
        >
          {[
            ["Retail & commerce", "retail"],
            ["Technology", "technology"],
            ["Travel & hospitality", "travel"],
            ["Financial services", "financial"],
          ].map(([name, slug], i) => (
            <Link
              key={slug}
              href={`/industries#${slug}`}
              className={`industry-window industry-window-${i}`}
            >
              <div>
                <Image
                  src={`/industries/${slug}.jpg`}
                  fill
                  sizes="(max-width:760px) 80vw, 34vw"
                  alt={`Illustrative ${name.toLowerCase()} setting`}
                />
                <span>
                  <ArrowUpRight size={24} strokeWidth={1.5} />
                </span>
              </div>
              <h3>{name}</h3>
            </Link>
          ))}
        </div>
        <div className="film-controls">
          <p>Different worlds. The same care.</p>
          <div>
            {[-1, 1].map((d) => (
              <button
                key={d}
                aria-label={d === 1 ? "Next industries" : "Previous industries"}
                onClick={() =>
                  film.current?.scrollBy({
                    left: d * film.current.clientWidth * 0.65,
                    behavior: reduced ? "auto" : "smooth",
                  })
                }
              >
                <ArrowRight
                  size={21}
                  style={{ transform: d === -1 ? "rotate(180deg)" : undefined }}
                />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="thinking-chapter">
        <Reveal className="v2-heading">
          <h2>
            A fresh
            <br />
            perspective.
          </h2>
          <ArrowLink href="/insights">Explore our thinking</ArrowLink>
        </Reveal>
        <div className="thinking-stories">
          {insights.slice(0, 3).map((item, i) => (
            <Link
              href={`/insights/${item.slug}`}
              key={item.slug}
              className={`thinking-story thinking-${i}`}
            >
              <div className="thinking-image">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width:760px) 100vw, 50vw"
                />
              </div>
              <span>{item.category}</span>
              <h3>
                {
                  [
                    "Support customers can rely on",
                    "Where human judgment belongs",
                    "Make policy review consistent",
                  ][i]
                }
                <ArrowUpRight size={22} strokeWidth={1.5} />
              </h3>
              <p>{item.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="future-chapter">
        <div className="future-mark" aria-hidden="true">
          D
        </div>
        <Reveal>
          <h2>
            What’s next?
            <br />
            Let’s build it.
          </h2>
          <p>
            Tell us what your customers and operations need.
            <br />
            We’ll work through the right approach with you.
          </p>
          <ArrowLink className="primary" href="/contact">
            Start a conversation
          </ArrowLink>
        </Reveal>
      </section>
      <section className="help-band-v2">
        <h2>Here to help.</h2>
        <div>
          <ArrowLink href="/careers">Your next career move</ArrowLink>
          <ArrowLink href="/employee-documents">Employee documents</ArrowLink>
          <ArrowLink href="/employee-verification">
            Employment verification
          </ArrowLink>
          <ArrowLink href="/help">Help & request tracking</ArrowLink>
        </div>
      </section>
    </div>
  );
}
