import PageIntro from "../components/PageIntro";
export default function Terms() {
  return (
    <>
      <PageIntro
        eyebrow="Website information"
        title="Terms of use."
        description="Information about browsing the DEJOIY business website and making an enquiry."
      />
      <article className="section-wrap pb-20">
        <div className="article-body">
          <h2>Information and enquiries</h2>
          <p>
            This website describes DEJOIY services and delivery approaches.
            Submitting an enquiry requests a conversation; it does not create a
            service agreement. Scope, pricing, responsibilities and service
            levels are established separately in an agreed engagement.
          </p>
          <h2>Examples and opportunities</h2>
          <p>
            Illustrative delivery examples explain an approach and do not
            represent verified client results. Careers submissions register
            interest; availability and employment terms are confirmed during
            recruitment.
          </p>
          <h2>Responsible use</h2>
          <p>
            Provide accurate information and submit documents only when you have
            permission to share them. Do not use the website to send spam,
            harmful files or requests that attempt to obtain another person’s
            information without authorisation.
          </p>
          <h2>Brand and external links</h2>
          <p>
            DEJOIY brand assets and website materials are presented for
            information about our business. External websites have their own
            terms and privacy practices.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about the website or its content can be sent to{" "}
            <a className="text-blue-200" href="mailto:hello@corp.dejoiy.com">
              hello@corp.dejoiy.com
            </a>
            .
          </p>
        </div>
      </article>
    </>
  );
}
