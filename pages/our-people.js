import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import PageIntro from "../components/PageIntro";
const people = [
  {
    name: "Jyoti Sharma",
    role: "Founder, Director",
    quote: "Execution excellence is our unfair advantage.",
    image: "/employees/emp1.jpg",
  },
  {
    name: "Anil Sharma",
    role: "Managing Director, Co-founder",
    quote: "Human intelligence powers every successful AI workflow.",
    image: "/employees/emp2.jpg",
  },
  {
    name: "Deepak Sharma",
    role: "Chief Technology & Operations Lead",
    quote: "We design support systems customers actually remember.",
    image: "/employees/emp3.jpg",
  },
  {
    name: "Komal Sharma",
    role: "Brand & Communications Coordinator",
    quote: "Trust is built into every process we deliver.",
    image: "/employees/emp4.jpg",
  },
  {
    name: "Dharmendra Sharma",
    role: "Strategic Advisor",
    quote: "Scalable systems begin with disciplined execution.",
    image: "/employees/emp5.jpg",
  },
  {
    name: "Deepanshu Chander Yaduvanshi",
    role: "Web Developer & Digital Infrastructure Engineer",
    quote: "People strategy is business strategy.",
    image: "/employees/emp6.jpg",
  },
  {
    name: "Syed Adnan Alir",
    role: "Business Manager",
    quote: "Operational quality is built one process at a time.",
    image: "/employees/emp7.jpg",
  },
  {
    name: "Khushi Sharma",
    role: "Operations Support",
    quote: "Speed matters, but consistency wins trust.",
    image: "/employees/emp8.jpg",
  },
  {
    name: "Harjoi Bajaj",
    role: "Brand Ambassador",
    quote: "The best operations feel invisible and indispensable.",
    image: "/employees/emp9.jpg",
  },
];

export default function OurPeoplePage() {
  const [selected, setSelected] = useState(0),
    reduced = useReducedMotion(),
    person = people[selected];
  return (
    <>
      <PageIntro
        eyebrow="Our people"
        title="The people make the difference."
        description="Meet the people bringing operational care, technical thinking and human connection to DEJOIY."
      />
      <section className="section-wrap people-experience">
        <div className="people-spotlight">
          <motion.img
            src={person.image}
            alt={person.name}
            key={person.image}
            initial={reduced ? false : { scale: 1.03 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
          />
          <div aria-live="polite">
            <span className="intro-label">The people behind the work</span>
            <h2>{person.name}</h2>
            <p className="person-role">{person.role}</p>
            <blockquote>“{person.quote}”</blockquote>
            <Link href="/careers" className="button-primary">
              Find your place at DEJOIY ↗
            </Link>
          </div>
        </div>
        <div className="people-roster" role="group" aria-label="Meet our team">
          {people.map((p, i) => (
            <button
              key={p.name}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <img src={p.image} alt="" loading="lazy" />
              <span>
                {p.name}
                <small>{p.role}</small>
              </span>
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
