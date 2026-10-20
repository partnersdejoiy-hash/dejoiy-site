import Link from "next/link";
import { services } from "../../data/services";

const network = [
  ["Help & documents", "/help"],
  ["Employee verification", "/employee-verification"],
  ["Careers", "/careers"],
  ["Insights", "/insights"],
  ["Brand website", "https://www.dejoiy.co.in"],
  ["Marketplace", "https://www.dejoiy.com"],
];

export default function About() {
  return (
    <section className="about chapter" aria-label="About DEJOIY" data-station="drift">
      <div className="about-row">
        <dl className="about-facts" data-reveal>
          <div>
            <dt>Founder &amp; CEO</dt>
            <dd>Jyoti Sharma</dd>
          </div>
          <div>
            <dt>Headquarters</dt>
            <dd>India</dd>
          </div>
          <div>
            <dt>Promise</dt>
            <dd>YOU + JOY</dd>
          </div>
        </dl>
        <p className="about-text" data-reveal>
          DEJOIY is a people-first business services company. We take on the
          conversations and the everyday operations that customers never see
          but always feel, with clear ownership, written playbooks and human
          judgement at the moments that matter. The name holds the whole idea:
          the person on the other end should leave happier than they arrived.
        </p>
      </div>
      <div className="about-row about-lists">
        <p className="about-word">Explore</p>
        <ul data-reveal>
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`}>{s.title}</Link>
            </li>
          ))}
        </ul>
        <ul data-reveal>
          {network.map(([label, href]) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
