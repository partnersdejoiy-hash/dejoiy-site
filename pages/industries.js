import SectionHeading from "../components/SectionHeading";

const industries = [
  {
    title: "Retail & eCommerce",
    image: "/industries/retail.jpg",
    description: "Customer support, returns, fraud review and digital commerce operations."
  },
  {
    title: "Technology",
    image: "/industries/technology.jpg",
    description: "Platform support, AI operations, QA workflows and enterprise assistance."
  },
  {
    title: "Healthcare",
    image: "/industries/healthcare.jpg",
    description: "Sensitive support workflows built with precision, trust and structure."
  },
  {
    title: "Financial Services",
    image: "/industries/financial.jpg",
    description: "Compliance-aware operations, verification workflows and support services."
  },
  {
    title: "Travel & Logistics",
    image: "/industries/travel.jpg",
    description: "Booking support, issue resolution and logistics coordination workflows."
  },
  {
    title: "Social Media",
    image: "/industries/social-media.jpg",
    description: "Content operations, moderation and creator ecosystem support."
  },
  {
    title: "Gaming",
    image: "/industries/gaming.jpg",
    description: "Player support, moderation and always-on live operations workflows."
  },
  {
    title: "Education",
    image: "/industries/education.jpg",
    description: "Enrollment support, learner assistance and education operations."
  }
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
            key={industry.title}
            className="group relative overflow-hidden rounded-[2rem] border border-white/10 min-h-[360px]"
          >
            <img
              src={industry.image}
              alt={industry.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/65 to-primary/20" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="mb-4 w-fit rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-md">
                Industry {index + 1}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold">{industry.title}</h3>
              <p className="mt-4 max-w-xl text-white/75">{industry.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}