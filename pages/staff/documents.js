import SEO from "../../components/SEO";
import PageIntro from "../../components/PageIntro";
import { RequestDesk } from "../../components/DocumentPortal";
export default function Staff({ enabled }) {
  return (
    <>
      <SEO title="Document review desk" noindex />
      <PageIntro
        eyebrow="DEJOIY · staff only"
        title="Thoughtful review. Clear ownership."
        description="Review authorised requests, ask for missing information and release documents only after checking the underlying records."
      />
      <section className="section-wrap pb-20">
        <RequestDesk enabled={enabled} staff />
      </section>
    </>
  );
}
export async function getServerSideProps({ res }) {
  res.setHeader("Cache-Control", "private, no-store");
  const { portalAvailable } = await import("../../lib/documents/store.mjs");
  return { props: { enabled: await portalAvailable() } };
}
