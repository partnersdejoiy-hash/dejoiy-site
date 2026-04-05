import SectionHeading from "../components/SectionHeading";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="section-wrap py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact us"
            title="Let’s build your next operating advantage"
            subtitle="Tell us about your goals and DEJOIY will design the right support, AI operations or back-office solution."
          />
          <div className="rounded-[2rem] glass p-6 bg-card-gradient-3">
            <p className="text-white/70">
              Whether you need customer experience teams, trust & safety operations,
              AI training pipelines or back-office support, our experts can help you scale fast.
            </p>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}