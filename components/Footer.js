import Link from "next/link";
import { Linkedin, Twitter, Instagram, Globe } from "lucide-react";

const footerData = {
  Company: [
    { label: "Who we are", href: "/" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" }
  ],
  Services: [
    { label: "Services", href: "/services" },
    { label: "Employee Verification", href: "/employee-verification" }
  ],
  Industries: [
    { label: "Industries", href: "/industries" }
  ],
  Resources: [
    { label: "Insights", href: "/insights" },
    { label: "Brand", href: "https://www.dejoiy.co.in" },
    { label: "Marketplace", href: "https://www.dejoiy.com" }
  ]
};

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/20">
      <div className="section-wrap py-14">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
            <img
            src="/logo.png"
            alt="DEJOIY"
            className="h-11 w-11 object-contain"
             />

            <div>
           <div className="text-xl font-bold">DEJOIY</div>
           <div className="text-xs uppercase tracking-[0.28em] text-white/50">
            Global BPO + AI Services
           </div>
          </div>
          </div>
            <p className="mt-5 max-w-sm text-white/65">
              Transforming global business operations through AI-powered workflows,
              premium customer support, and modern enterprise execution.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Link href="#" className="glass rounded-full p-3 hover:bg-white/10 transition">
                <Linkedin size={18} />
              </Link>
              <Link href="#" className="glass rounded-full p-3 hover:bg-white/10 transition">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="glass rounded-full p-3 hover:bg-white/10 transition">
                <Instagram size={18} />
              </Link>
              <Link
                href="https://www.dejoiy.com"
                className="glass rounded-full p-3 hover:bg-white/10 transition"
              >
                <Globe size={18} />
              </Link>
            </div>
          </div>

          {Object.entries(footerData).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white">{title}</h4>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} DEJOIY. All rights reserved.</p>
          <p>Built for premium digital-first enterprise presence.</p>
        </div>
      </div>
    </footer>
  );
}
