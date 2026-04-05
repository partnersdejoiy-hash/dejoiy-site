import SectionHeading from "../components/SectionHeading";
import { Linkedin } from "lucide-react";

const people = [
  {
    name: "Jyoti Sharma",
    role: "Founder, Director",
    quote: "Execution excellence is our unfair advantage.",
    image: "/employees/emp1.jpg"
  },
  {
    name: "Anil Sharma",
    role: "Managing Director, Co-founder",
    quote: "Human intelligence powers every successful AI workflow.",
    image: "/employees/emp2.jpg"
  },
  {
    name: "Deepak Sharmar",
    role: "Chief Technology & Operations Lead",
    quote: "We design support systems customers actually remember.",
    image: "/employees/emp3.jpg"
  },
  {
    name: "Komal Sharma",
    role: "Brand & Communications Coordinator",
    quote: "Trust is built into every process we deliver.",
    image: "/employees/emp4.jpg"
  },
  {
    name: "Dharmendra Sharma",
    role: "Strategic Advisor",
    quote: "Scalable systems begin with disciplined execution.",
    image: "/employees/emp5.jpg"
  },
  {
    name: "Deepanshu Chander Yaduvanshi",
    role: "Web Developer & Digital Infrastructure Engineer",
    quote: "People strategy is business strategy.",
    image: "/employees/emp6.jpg"
  },
  {
    name: "Syed Adnan Alir",
    role: "Business Manager",
    quote: "Operational quality is built one process at a time.",
    image: "/employees/emp7.jpg"
  },
  {
    name: "Khushi Sharma",
    role: "Operations Support",
    quote: "Speed matters, but consistency wins trust.",
    image: "/employees/emp8.jpg"
  },
  {
    name: "Harjoi Bajaj",
    role: "Brand Ambassador",
    quote: "The best operations feel invisible and indispensable.",
    image: "/employees/emp9.jpg"
  }
];

export default function OurPeoplePage() {
  return (
    <div className="section-wrap py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 min-h-[360px]">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/30" />

        <div className="relative z-10 p-10 md:p-16">
          <p className="text-sm uppercase tracking-[0.25em] text-highlight">
            Our People
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl md:text-6xl font-bold">
            The team powering premium execution at global scale
          </h1>
          <p className="mt-6 max-w-2xl text-white/70 text-lg">
            DEJOIY combines operational rigor, service excellence and AI-first thinking
            through a team built for modern enterprise delivery.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              Operations Leaders
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              AI Specialists
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              Client Success Experts
            </span>
          </div>
        </div>
      </div>

      <section className="py-20">
        <SectionHeading
          eyebrow="Leadership & Team"
          title="Meet the people behind DEJOIY"
          subtitle="A modern workforce built around empathy, precision, security and execution quality."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {people.map((person, index) => (
            <div
              key={`${person.name}-${index}`}
              className="group relative overflow-hidden rounded-[2rem] glass min-h-[400px]"
            >
              <img
                src={person.image}
                alt={person.name}
                className="h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-primary/40 to-transparent opacity-90" />

              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="translate-y-8 opacity-90 transition-all duration-500 group-hover:translate-y-0">
                  <h3 className="text-xl font-semibold">{person.name}</h3>
                  <p className="text-highlight">{person.role}</p>
                  <p className="mt-3 text-sm text-white/75">“{person.quote}”</p>

                  <a
                    href="#"
                    className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                    aria-label={`LinkedIn profile for ${person.name}`}
                  >
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="rounded-[2.5rem] glass p-10 md:p-14 bg-card-gradient-2">
          <p className="text-sm uppercase tracking-[0.25em] text-highlight">
            Growing Team
          </p>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold">
            We are thrileed to have more people on this wall of us!
          </h2>
          <p className="mt-4 max-w-3xl text-white/70 text-lg">
            “The people you see here are shaping DEJOIY today — and we’re thrilled to welcome many more innovators, builders, and dreamers to this wall.”
          </p>
        </div>
      </section>
    </div>
  );
}
