import SectionHeading from "../components/SectionHeading";
import InsightCard from "../components/InsightCard";

const insights = [
  {
    category: "Articles",
    title: "How AI + human workflows are redefining global operations",
    excerpt: "Why the strongest enterprise models combine automation, governance and people-led judgment."
  },
  {
    category: "Case Studies",
    title: "Scaling customer support for high-growth digital brands",
    excerpt: "A modern framework for support quality, speed and customer loyalty."
  },
  {
    category: "Reports",
    title: "The future of trust & safety operations",
    excerpt: "Emerging challenges, new standards and operational design patterns for digital platforms."
  },
  {
    category: "News",
    title: "DEJOIY expands premium enterprise service capabilities",
    excerpt: "New investments in AI operations, delivery systems and talent acceleration."
  }
];

export default function InsightsPage() {
  return (
    <div className="section-wrap py-20">
      <SectionHeading
        eyebrow="Insights"
        title="Articles, reports and thought leadership"
        subtitle="Explore ideas, frameworks and updates shaping the future of AI services and enterprise operations."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {insights.map((item) => (
          <InsightCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}