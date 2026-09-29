import PageIntro from "../components/PageIntro";
import InsightCard from "../components/InsightCard";
import { insights } from "../data/insights";
export default function Examples() {
  return (
    <>
      <PageIntro
        eyebrow="Delivery examples"
        title="See how the approach comes together."
        description="Explore an illustrative operating scenario, from the first challenge to the measures used to review delivery. Verified client outcomes will be published only with approval."
      />
      <div className="section-wrap pb-20 grid md:grid-cols-2 gap-6">
        {insights
          .filter((a) => a.illustrative)
          .map((a) => (
            <InsightCard key={a.slug} {...a} />
          ))}
      </div>
    </>
  );
}
