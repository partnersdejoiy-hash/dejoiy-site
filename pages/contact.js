import Link from "next/link";
import PageIntro from "../components/PageIntro";
import ContactForm from "../components/ContactForm";
export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Let’s talk"
        title="Big possibilities. One conversation."
        description="Tell us about your customers, your operation and what needs to change. We’ll help work through the right next step."
      />
      <section className="section-wrap contact-experience">
        <aside>
          <span className="intro-label">Start with a hello</span>
          <h2>
            Good connections
            <br />
            start here.
          </h2>
          <a className="contact-email" href="mailto:hello@corp.dejoiy.com">
            hello@corp.dejoiy.com ↗
          </a>
          <dl>
            <div>
              <dt>Based in</dt>
              <dd>Delhi, India</dd>
            </div>
            <div>
              <dt>Office hours</dt>
              <dd>Mon–Fri, 9am–6pm IST</dd>
            </div>
          </dl>
          <div className="contact-support">
            <h3>Here for something else?</h3>
            <p>
              Careers, employee documents and request tracking have their own
              dedicated routes.
            </p>
            <Link href="/help">Find the right team ↗</Link>
          </div>
        </aside>
        <div className="contact-form-shell">
          <span className="intro-label">Tell us what’s on your mind</span>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
