import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function CallToAction() {
  return (
    <section className="section-wrap py-16">
      <div className="cta-block rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <span className="badge mb-5">Let’s build together</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-xl">
            Your next chapter starts with a conversation.
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
