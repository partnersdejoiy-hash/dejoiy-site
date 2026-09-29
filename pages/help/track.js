import { useRouter } from "next/router";
import PageIntro from "../../components/PageIntro";
import SEO from "../../components/SEO";
import { RequestDesk } from "../../components/DocumentPortal";
export default function Track({ enabled }) {
  const router = useRouter();
  return (
    <>
      <SEO title="Track a request" noindex />
      <PageIntro
        eyebrow="Private request centre"
        title="A clear view of what’s next."
        description="Access your document requests, see updates and securely receive information from our team."
      />
      <section className="section-wrap pb-20">
        <RequestDesk
          enabled={enabled}
          selectedId={
            typeof router.query.request === "string"
              ? router.query.request
              : undefined
          }
        />
      </section>
    </>
  );
}
export async function getServerSideProps({ res }) {
  res.setHeader("Cache-Control", "private, no-store");
  const { portalAvailable } = await import("../../lib/documents/store.mjs");
  return { props: { enabled: await portalAvailable() } };
}
