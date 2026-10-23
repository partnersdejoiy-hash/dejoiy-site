import PageIntro from "../components/PageIntro";
import ServiceExplorer from "../components/ServiceExplorer";
import WorkflowStory from "../components/WorkflowStory";
import CallToAction from "../components/CallToAction";
export default function Services() {
  return (
    <>
      <PageIntro
        eyebrow="Our services"
        title="Expertise that connects."
        description="Customer care, back-office support and specialist AI workflows. Connect the right people and processes to the work that matters."
      />
      <ServiceExplorer />
      <WorkflowStory />
      <CallToAction />
    </>
  );
}
