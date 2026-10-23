import Link from "next/link";
import PageIntro from "../components/PageIntro";
import PrincipleExplorer from "../components/PrincipleExplorer";
import WorkflowStory from "../components/WorkflowStory";
import CallToAction from "../components/CallToAction";
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="About us"
        title="Good business. A human beginning."
        description="DEJOIY brings customer experience, business process support and AI-assisted operations together. People, context and care are how we connect the pieces."
      >
        <Link href="/our-people" className="button-primary mt-7">
          Meet the people behind the work ↗
        </Link>
      </PageIntro>
      <PrincipleExplorer />
      <WorkflowStory />
      <CallToAction />
    </>
  );
}
