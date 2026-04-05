import Link from "next/link";

export default function Custom404() {
  return (
    <div className="section-wrap py-32 text-center">
      <div className="mx-auto max-w-2xl rounded-[2.5rem] glass p-12 bg-card-gradient-2">
        <p className="text-sm uppercase tracking-[0.25em] text-highlight">404</p>
        <h1 className="mt-4 text-5xl font-bold">Page not found</h1>
        <p className="mt-4 text-white/70">
          The page you’re looking for doesn’t exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-gradient-to-r from-accent via-secondary to-highlight px-6 py-3 text-sm font-semibold shadow-glow"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}