import Link from "next/link";
import Image from "next/image";
import PageIntro from "../../components/PageIntro";
import SEO from "../../components/SEO";
import DeliveryPlan from "../../components/DeliveryPlan";
import WorkflowStory from "../../components/WorkflowStory";
import { services } from "../../data/services";
export default function Service({ service }) {
  return (
    <>
      <SEO title={service.title} description={service.description} />
      <PageIntro
        image={service.image}
        eyebrow="BPO services"
        title={service.short}
        description={service.description}
      >
        <div className="flex flex-wrap gap-3 mt-7">
          <Link
            href={{ pathname: "/contact", query: { service: service.slug } }}
            className="button-primary"
          >
            Discuss {service.title.toLowerCase()} ↗
          </Link>
          <Link href="/services" className="button-secondary">
            All services
          </Link>
        </div>
      </PageIntro>
      <section className="section-wrap">
        <div className="service-cover relative h-64 md:h-96 rounded-3xl overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 to-transparent" />
          <h2 className="absolute bottom-8 left-8 text-2xl md:text-4xl font-semibold">
            {service.title}
          </h2>
        </div>
        <DeliveryPlan service={service} />
      </section>
      <WorkflowStory />
    </>
  );
}
export function getStaticPaths() {
  return {
    paths: services.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}
export function getStaticProps({ params }) {
  return { props: { service: services.find((s) => s.slug === params.slug) } };
}
