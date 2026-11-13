import Link from "next/link";

const groups = [
  {
    title: "Company",
    links: [
      ["About DEJOIY", "/about"],
      ["Our people", "/our-people"],
      ["Careers", "/careers"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Explore",
    links: [
      ["Services", "/services"],
      ["Industries", "/industries"],
      ["Resource library", "/resources"],
      ["Insights", "/insights"],
      ["Delivery examples", "/case-studies"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Help & documents", "/help"],
      ["Employee documents", "/employee-documents"],
      ["Employee verification", "/employee-verification"],
      ["Track a request", "/help/track"],
    ],
  },
  {
    title: "DEJOIY network",
    links: [
      ["dejoiy.co.in", "https://www.dejoiy.co.in"],
      ["Marketplace", "https://www.dejoiy.com"],
      ["Dmail", "https://mail.dejoiy.com"],
      ["Joi AI", "https://joi-ai.dejoiy.com"],
    ],
  },
];

const external = (href) => href.startsWith("http");

export default function Footer() {
  return (
    <footer className="gz-footer">
      <div className="section-wrap">
        <div className="gz-footer-top">
          <div>
            <Link href="/" aria-label="DEJOIY home" className="gz-footer-logo">
              <img src="/brand/dejoiy-wordmark.svg" width="476" height="150" alt="DEJOIY" />
            </Link>
            <p className="gz-footer-about">
              People-led service. Technology-enabled operations. Built around
              your customers.
            </p>
            <a className="gz-link" href="mailto:hello@corp.dejoiy.com">
              hello@corp.dejoiy.com
            </a>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h2>{g.title}</h2>
              <ul>
                {g.links.map(([label, href]) => (
                  <li key={href}>
                    {external(href) ? (
                      <a className="gz-link" href={href} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    ) : (
                      <Link className="gz-link" href={href}>
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="gz-footer-big" aria-hidden="true">
          :D<span>ejoiy</span> <em>business</em>
        </div>
        <div className="gz-footer-bottom">
          <span>© {new Date().getFullYear()} DEJOIY India Private Limited. All rights reserved.</span>
          <nav aria-label="Legal" className="gz-footer-legal">
            <a className="gz-link" href="https://www.dejoiy.co.in/terms">Terms</a>
            <a className="gz-link" href="https://www.dejoiy.co.in/privacy">Privacy</a>
            <a className="gz-link" href="https://www.dejoiy.co.in/legal#business">Business rules</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
