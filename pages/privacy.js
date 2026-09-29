import PageIntro from "../components/PageIntro";
export default function Privacy() {
  return (
    <>
      <PageIntro
        eyebrow="Privacy"
        title="Your information, handled with care."
        description="This notice explains the information collected through the DEJOIY business website."
      />
      <article className="section-wrap pb-20">
        <div className="article-body">
          <h2>Information you choose to send</h2>
          <p>
            Business enquiries include your name, work email, company, country,
            selected service and message. Applications include your contact
            details, role of interest, experience and any CV you attach.
            Verification requests include the requesting organisation, employee
            details, purpose and an authorisation letter.
          </p>
          <h2>How submissions are used</h2>
          <p>
            We use your information to review and respond to the request you
            submitted. Please share only what is relevant. Do not send
            passwords, payment details, government identification numbers or
            unrelated sensitive documents through these forms.
          </p>
          <h2>Delivery and service providers</h2>
          <p>
            This website is hosted on Vercel. Form submissions and attachments
            are processed through Resend and delivered to the relevant DEJOIY
            email inbox. Attachments are not published as public website links.
            Hosting, email providers and receiving mail systems may retain
            service records according to their own settings and policies.
          </p>
          <h2>Technical information</h2>
          <p>
            Hosting services may process connection information to deliver and
            protect the website. The form service temporarily uses a hashed
            network address to limit repeated submissions within a running
            server instance. The application does not require a visitor account
            or add advertising cookies.
          </p>
          <h2>Questions and requests</h2>
          <p>
            For questions about a submission, or to request access, correction
            or deletion of information you supplied, contact{" "}
            <a className="text-blue-200" href="mailto:hello@corp.dejoiy.com">
              hello@corp.dejoiy.com
            </a>
            . We may need enough information to identify your request and
            confirm that it concerns you.
          </p>
          <h2>Employee verification</h2>
          <p>
            Submit a verification request only when you are authorised to do so.
            Include an appropriate authorisation letter and limit the request to
            the information required for your stated purpose.
          </p>
        </div>
      </article>
    </>
  );
}
