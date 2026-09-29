import PageIntro from "../components/PageIntro";
import ServiceCard from "../components/ServiceCard";
import CallToAction from "../components/CallToAction";
import { services } from "../data/services";
export default function Services() {
  return (
    <>
      <PageIntro
        eyebrow="Our services"
        title="The support behind your next stage of growth."
        description="Customer care, back-office support and specialist workflows. Explore the service that fits your business, then shape the delivery plan with us."
      />
      <section className="section-wrap pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} {...s} index={i} />
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
