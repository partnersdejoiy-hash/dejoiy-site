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
    <footer className="relative mt-24 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030A1A] pointer-events-none" />
      <div className="relative section-wrap pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="DEJOIY" className="h-9 w-9 object-contain" />
              <div>
                <div className="text-base font-bold" style={{ color: "#F8FAFC" }}>DEJOIY</div>
                <div className="text-[9px] uppercase tracking-[0.35em]" style={{ color: "#64748b" }}>
                  AI Services · BPO
                </div>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-relaxed max-w-[280px]" style={{ color: "#94a3b8" }}>
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 hover:border-white/25 hover:bg-white/10"
                  style={{
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)",
                    color: "#94a3b8"
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#F8FAFC"}
                  onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(footerData).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4" style={{ color: "#64748b" }}>
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1 text-sm transition-colors duration-200"
                        style={{ color: "#94a3b8" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#F8FAFC"}
                        onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
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

        <div className="mt-6 flex flex-col gap-2 text-[12px] sm:flex-row sm:items-center sm:justify-between" style={{ color: "#64748b" }}>
          <p>© {new Date().getFullYear()} DEJOIY Corp. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/contact" className="hover:text-white/70 transition-colors">Terms</Link>
            <Link href="/employee-verification" className="hover:text-white/70 transition-colors">Verification</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
