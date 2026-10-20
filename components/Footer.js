import Link from "next/link";

const places = [
  ["hello@corp.dejoiy.com", "mailto:hello@corp.dejoiy.com"],
  ["dejoiy.co.in", "https://www.dejoiy.co.in"],
  ["dejoiy.com", "https://www.dejoiy.com"],
];

const columns = [
  ["Company", [["About", "/about"], ["Our people", "/our-people"], ["Careers", "/careers"], ["Contact", "/contact"]]],
  ["Explore", [["Services", "/services"], ["Industries", "/industries"], ["Resources", "/resources"], ["Insights", "/insights"], ["Delivery examples", "/case-studies"]]],
  ["Help", [["Help & documents", "/help"], ["Employee documents", "/employee-documents"], ["Employee verification", "/employee-verification"], ["Track a request", "/help/track"]]],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-name" aria-hidden="true">DEJOIY</p>
      <div className="footer-row">
        <ul className="footer-places">
          {places.map(([label, href]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="footer-cols">
          {columns.map(([title, links]) => (
            <div key={title}>
              <h2>{title}</h2>
              <ul>
                {links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="footer-legal">
        <span>
          © {new Date().getFullYear()} DEJOIY · YOU + JOY · Founder &amp; CEO Jyoti Sharma
        </span>
        <span className="footer-legal-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="#main-content">Back to top</a>
        </span>
      </div>
    </footer>
  );
}
