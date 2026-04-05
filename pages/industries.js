import SectionHeading from "../components/SectionHeading";

const industries = [
  "Retail & eCommerce",
  "Technology",
  "Healthcare",
  "Financial Services",
  "Travel & Logistics",
  "Social Media",
  "Gaming",
  "Education"
];

export default function IndustriesPage() {
  return (
    <div className="section-wrap py-20">
      <SectionHeading
        eyebrow="Industries"
        title="Sector expertise built for modern operations"
        subtitle="DEJOIY supports diverse industries with tailored workflows, trained talent and premium execution quality."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {industries.map((industry, index) => (
          <div
            key={industry}
            className={`rounded-[2rem] glass p-8 ${
              index % 3 === 0 ? "bg-card-gradient-1" : index % 3 === 1 ? "bg-card-gradient-2" : "bg-card-gradient-3"
            }`}
          >
            <h3 className="text-2xl font-semibold">{industry}</h3>
            <p className="mt-4 text-white/70">
              We build dedicated operating models for {industry.toLowerCase()} with domain-aware teams,
              measurable SLAs and scalable support infrastructure.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}