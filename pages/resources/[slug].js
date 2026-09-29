import Link from "next/link";
import { Download, Printer, Check } from "lucide-react";
import SEO from "../../components/SEO";
import PageIntro from "../../components/PageIntro";
import { resources } from "../../data/resources";
export default function Resource({ resource: r }) {
  return (
    <>
      <SEO title={r.title} description={r.description} />
      <PageIntro
        eyebrow={`${r.category} · Field notes`}
        title={r.title}
        description={r.description}
      />
      <section className="section-wrap pb-20 resource-detail">
        <aside className="portal-panel h-fit">
          <Link href="/resources" className="text-sm text-blue-200">
            ← Resource library
          </Link>
          <h2 className="text-lg font-semibold mt-6">At a glance</h2>
          <dl className="resource-meta">
            <div>
              <dt>Format</dt>
              <dd>Web guide + TXT checklist</dd>
            </div>
            <div>
              <dt>Download size</dt>
              <dd>{(r.bytes / 1024).toFixed(1)} KB</dd>
            </div>
            <div>
              <dt>Reading time</dt>
              <dd>{r.minutes} minutes</dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>29 September 2026</dd>
            </div>
          </dl>
          <a
            className="button-primary w-full"
            href={`/resources/${r.filename}`}
            download
          >
            <Download size={17} /> Download checklist
          </a>
          <button
            className="button-secondary w-full mt-3"
            onClick={() => window.print()}
          >
            <Printer size={17} /> Print / save as PDF
          </button>
          <p className="text-xs text-slate-400 mt-4">
            Open access. No email or account required.
          </p>
        </aside>
        <article className="resource-article">
          {r.sections.map(([title, items], i) => (
            <section key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <h2>{title}</h2>
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    <Check size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <div className="document-checklist">
            <p>
              General planning guidance. Scope and response commitments are
              agreed with the DEJOIY team.
            </p>
            <Link
              className="button-secondary mt-4"
              href={
                r.category === "People support"
                  ? "/employee-verification"
                  : "/contact"
              }
            >
              {r.category === "People support"
                ? "Start an authorised request"
                : "Discuss your requirements"}{" "}
              ↗
            </Link>
          </div>
        </article>
      </section>
    </>
  );
}
export function getStaticPaths() {
  return {
    paths: resources.map((r) => ({ params: { slug: r.slug } })),
    fallback: false,
  };
}
export function getStaticProps({ params }) {
  return { props: { resource: resources.find((r) => r.slug === params.slug) } };
}
