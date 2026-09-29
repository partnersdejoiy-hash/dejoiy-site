import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SEO from "../../components/SEO";
import PageIntro from "../../components/PageIntro";
import { insights } from "../../data/insights";
export default function Article({ article }) {
  return (
    <>
      <SEO title={article.title} description={article.excerpt} />
      <PageIntro
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
      />
      <article className="section-wrap pb-20">
        <div className="relative h-56 md:h-80 rounded-3xl overflow-hidden mb-10">
          <Image
            src={article.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="article-body">
          <Link href="/insights" className="text-sm text-blue-200">
            ← All insights
          </Link>
          {article.illustrative && (
            <p className="mt-6 p-5 border border-purple-400/30 rounded-xl bg-purple-400/5 text-sm">
              Illustrative delivery example. This is not a client testimonial or
              a claim of achieved results.
            </p>
          )}
          {article.sections.map(([title, body]) => (
            <motion.section
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2>{title}</h2>
              <p>{body}</p>
            </motion.section>
          ))}
          <div className="mt-12 border-t border-white/10 pt-8">
            <p>Want to explore this approach for your business?</p>
            <Link href="/contact" className="button-primary mt-5">
              Talk to DEJOIY ↗
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
export function getStaticPaths() {
  return {
    paths: insights.map((a) => ({ params: { slug: a.slug } })),
    fallback: false,
  };
}
export function getStaticProps({ params }) {
  return { props: { article: insights.find((a) => a.slug === params.slug) } };
}
