import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function CallToAction() {
  return (
    <section className="section-wrap py-16">
      <div className="cta-block premium-cta rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="cta-orbit" aria-hidden="true" />
        <div>
          <span className="badge mb-5">Let’s build together</span>
          <h2 className="font-semibold tracking-tight max-w-xl">
            Great things start
            <br />
            with a conversation.
          </h2>
          <p className="mt-4 text-slate-400 max-w-lg">
            Tell us what your customers and operations need. We’ll work through
            the right approach with you.
          </p>
        </div>
        <Link href="/contact" className="button-primary shrink-0">
          Discuss your requirements <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
