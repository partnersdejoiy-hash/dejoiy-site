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
            Employee-document requests include your name, email, location,
            employee ID if supplied, request type and message. Verification
            requests include the requesting organisation, employee details,
            purpose and an authorisation letter.
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
          <h2>Private document requests, when available</h2>
          <p>
            When the private request centre is active, request details, PDF
            documents, review updates and access records are stored in our
            configured private PostgreSQL database. Only the verified requester
            and approved DEJOIY reviewers can access a request through the
            application. Documents are served as authenticated downloads, not
            public links. Email notifications contain access instructions rather
            than document attachments.
          </p>
          <p>
            Access links expire after 15 minutes and can be used once. A
            necessary, secure session cookie keeps private access available for
            up to eight hours for requesters and one hour for reviewers. The
            server stores hashes of access tokens. Portal records expire after
            90 days; expired records are unavailable through the portal and are
            removed through scheduled retention maintenance. Provider backups
            may follow their own retention settings. Email-only submissions
            remain subject to the receiving mailbox’s retention settings.
          </p>
          <p>
            Verifying an email confirms access to that inbox. It does not
            establish an entitlement to employment information. The people team
            must review authority and the underlying records before releasing a
            document. PDF checks validate file format and size; they are not a
            malware scan.
          </p>
          <h2>Technical information</h2>
          <p>
            Hosting services may process connection information to deliver and
            protect the website. The form service temporarily uses a hashed
            network address to limit repeated submissions within a running
            server instance. When private tracking is active, shared database
            limits help protect access-link requests and submissions. The public
            website does not require a visitor account or add advertising
            cookies.
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
