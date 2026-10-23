import Link from "next/link";
export default function Custom404() {
  return (
    <section className="section-wrap error-experience">
      <span className="intro-label">DEJOIY / 404</span>
      <div className="error-number" aria-hidden="true">
        404<span>↗</span>
      </div>
      <h1>A little off course.</h1>
      <p>This page may have moved. Let’s get you to the right place.</p>
      <div className="flex flex-wrap gap-3 mt-8">
        <Link href="/" className="button-primary">
          Back to DEJOIY ↗
        </Link>
        <Link href="/help" className="button-secondary">
          Find support
        </Link>
      </div>
    </section>
  );
}
