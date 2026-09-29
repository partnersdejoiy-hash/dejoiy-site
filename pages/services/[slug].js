import Link from "next/link";
import Image from "next/image";
import PageIntro from "../../components/PageIntro";
import SEO from "../../components/SEO";
import WorkflowStory from "../../components/WorkflowStory";
import { services } from "../../data/services";
export default function Service({ service }) {
  return (
    <>
      <SEO title={service.title} description={service.description} />
      <PageIntro
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
        <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden">
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
        <div className="grid md:grid-cols-2 gap-10 py-12">
          <div>
            <span className="eyebrow">Delivery approach</span>
            <h2 className="text-2xl font-semibold mt-4">
              What we work through with you
            </h2>
            <ul className="space-y-5 mt-6">
              {service.tasks.map((t, i) => (
                <li
                  key={t}
                  className="flex gap-4 text-slate-300 leading-relaxed"
                >
                  <span className="text-purple-300 text-sm pt-1">0{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-3xl p-8">
            <span className="eyebrow">Quality and accountability</span>
            <h2 className="text-2xl font-semibold mt-4">
              Agree the measures that matter.
            </h2>
            <ul className="mt-6 space-y-4">
              {service.measures.map((m) => (
                <li
                  key={m}
                  className="border-b border-white/10 pb-4 text-slate-200"
                >
                  {m}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-slate-400 leading-relaxed">
              Scope, access controls, service levels and reporting are agreed
              before delivery. These are planning measures, not performance
              guarantees.
            </p>
          </div>
        </div>
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
