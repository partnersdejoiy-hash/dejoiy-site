import Link from "next/link";
import { Linkedin, Twitter, Instagram, Globe, ArrowUpRight } from "lucide-react";

const footerData = {
  Company: [
    { label: "About", href: "/" },
    { label: "Our People", href: "/our-people" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" }
  ],
  Services: [
    { label: "Customer Experience", href: "/services" },
    { label: "AI Data Operations", href: "/services" },
    { label: "Trust & Safety", href: "/services" },
    { label: "Employee Verification", href: "/employee-verification" }
  ],
  Explore: [
    { label: "Industries", href: "/industries" },
    { label: "Insights", href: "/insights" },
    { label: "Brand Site", href: "https://www.dejoiy.co.in" },
    { label: "Marketplace", href: "https://www.dejoiy.com" }
  ]
};

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030510] pointer-events-none" />
      <div className="relative section-wrap pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="DEJOIY" className="h-9 w-9 object-contain" />
              <div>
                <div className="text-base font-bold">DEJOIY</div>
                <div className="text-[9px] uppercase tracking-[0.35em] text-white/40">
                  AI Services · BPO
                </div>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-white/50 max-w-[280px]">
              Transforming global business operations through AI-powered workflows,
              premium customer support, and enterprise execution.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {[
                { href: "#", icon: <Linkedin size={15} />, label: "LinkedIn" },
                { href: "#", icon: <Twitter size={15} />, label: "Twitter" },
                { href: "#", icon: <Instagram size={15} />, label: "Instagram" },
                { href: "https://www.dejoiy.com", icon: <Globe size={15} />, label: "Website" }
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(footerData).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35 mb-4">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1 text-sm text-white/55 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                        {link.href.startsWith("http") && (
                          <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="divider mt-12" />

        <div className="mt-6 flex flex-col gap-2 text-[12px] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} DEJOIY Corp. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/employee-verification" className="hover:text-white/60 transition-colors">Verification</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
