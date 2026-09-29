import Link from "next/link";
import Brand from "./Brand";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap">
        <div className="footer-grid">
          <div>
            <Brand />
            <p className="mt-5 max-w-sm text-slate-400 text-sm leading-relaxed">
              People-led service. Technology-enabled operations. Built around
              your customers.
            </p>
            <a
              className="inline-block mt-4 text-sm text-slate-200"
              href="mailto:hello@corp.dejoiy.com"
            >
              hello@corp.dejoiy.com
            </a>
          </div>
          {[
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
                ["Insights", "/insights"],
                ["Delivery examples", "/case-studies"],
              ],
            },
            {
              title: "DEJOIY network",
              links: [
                ["Brand website", "https://www.dejoiy.co.in"],
                ["Marketplace", "https://www.dejoiy.com"],
                ["Employee verification", "/employee-verification"],
              ],
            },
          ].map((g) => (
            <div key={g.title}>
              <h2 className="text-xs uppercase tracking-widest text-slate-400 mb-5">
                {g.title}
              </h2>
              <ul className="space-y-3 text-sm">
                {g.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DEJOIY. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
