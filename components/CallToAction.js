import Link from "next/link";

/* One word is the button: the whole band is a single link. */
export default function CallToAction() {
  return (
    <Link href="/contact" className="talk-band" data-station="drift">
      <span className="talk-note">
        Tell us about your customers and your queues. We&rsquo;ll come back with
        an honest plan.
      </span>
      <svg className="talk-arrow" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M12 36 36 12M16 12h20v20" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
      <span className="talk-word">Talk</span>
    </Link>
  );
}
