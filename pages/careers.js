import SectionHeading from "../components/SectionHeading";
import JobListings from "../components/JobListings";

const benefits = [
  "Healthcare",
  "Learning budget",
  "Remote work",
  "Paid leave",
  "Career development"
];

export default function CareersPage() {
  return (
    <div className="section-wrap py-20">
      <div className="rounded-[2.5rem] glass p-10 md:p-16 bg-hero-gradient">
        <p className="text-sm uppercase tracking-[0.25em] text-highlight">Careers</p>
        <h1 className="mt-4 text-5xl md:text-6xl font-bold">Greatness starts here</h1>
        <p className="mt-6 max-w-2xl text-white/70 text-lg">
          Join a team building premium operations, AI services and world-class customer experiences for global businesses.
        </p>
      </div>

      <section className="py-20">
        <SectionHeading
          eyebrow="Benefits"
          title="Why top talent chooses DEJOIY"
          subtitle="We invest in people who want to build, learn and lead."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit, index) => (
            <div
              key={benefit}
              className={`rounded-[2rem] glass p-6 ${
                index % 3 === 0 ? "bg-card-gradient-1" : index % 3 === 1 ? "bg-card-gradient-2" : "bg-card-gradient-3"
              }`}
            >
              <h3 className="text-lg font-semibold">{benefit}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <SectionHeading
          eyebrow="Open roles"
          title="Animated job listings"
          subtitle="Explore current opportunities across operations, AI and client delivery."
        />
        <JobListings />
      </section>
    </div>
  );
}