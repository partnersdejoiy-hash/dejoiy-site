import { useState, useEffect } from "react";
import Link from "next/link";
import MegaMenu from "./MegaMenu";
import {
  Users, Bot, Briefcase, Building2,
  Newspaper, Sparkles, Phone, Menu, X, ChevronDown
} from "lucide-react";

const navConfig = [
  {
    key: "who",
    label: "Who we are",
    items: [
      { title: "About DEJOIY", description: "Our vision, leadership, culture and global delivery model.", href: "/", icon: <Users size={18} /> },
      { title: "Our People", description: "Talent, innovation and service excellence at scale.", href: "/our-people", icon: <Sparkles size={18} /> },
      { title: "Brand Profile", description: "Explore the DEJOIY brand website.", href: "https://www.dejoiy.co.in", icon: <Building2 size={18} /> }
    ]
  },
  {
    key: "services",
    label: "Services",
    items: [
      { title: "Customer Experience", description: "Premium customer support for enterprise brands.", href: "/services", icon: <Briefcase size={18} /> },
      { title: "AI Data Operations", description: "Human-in-the-loop operations for next-gen AI systems.", href: "/services", icon: <Bot size={18} /> },
      { title: "Trust & Safety", description: "Fraud review, content operations and risk support.", href: "/services", icon: <Building2 size={18} /> }
    ]
  },
  {
    key: "industries",
    label: "Industries",
    items: [
      { title: "Industry Expertise", description: "Retail, healthcare, gaming, fintech and more.", href: "/industries", icon: <Building2 size={18} /> },
      { title: "Marketplace", description: "Visit the DEJOIY marketplace.", href: "https://www.dejoiy.com", icon: <Sparkles size={18} /> },
      { title: "Sector Delivery", description: "Tailored operational models for each industry.", href: "/industries", icon: <Building2 size={18} /> }
    ]
  },
  {
    key: "insights",
    label: "Insights",
    items: [
      { title: "Articles", description: "Perspectives on AI and business operations.", href: "/insights", icon: <Newspaper size={18} /> },
      { title: "Case Studies", description: "How DEJOIY helps enterprises scale globally.", href: "/insights", icon: <Newspaper size={18} /> },
      { title: "Reports & News", description: "Research and company updates.", href: "/insights", icon: <Newspaper size={18} /> }
    ]
  },
  {
    key: "careers",
    label: "Careers",
    items: [
      { title: "Join DEJOIY", description: "Build your future with a world-class operations company.", href: "/careers", icon: <Sparkles size={18} /> },
      { title: "Open Roles", description: "Explore current opportunities.", href: "/careers", icon: <Briefcase size={18} /> },
      { title: "Employee Verification", description: "Submit verification requests for past employees.", href: "/employee-verification", icon: <Users size={18} /> }
    ]
  },
  {
    key: "contact",
    label: "Contact",
    items: [
      { title: "Speak with an Expert", description: "Tell us your goals and we'll design the right solution.", href: "/contact", icon: <Phone size={18} /> },
      { title: "Business Enquiries", description: "Reach DEJOIY for partnerships and services.", href: "/contact", icon: <Phone size={18} /> },
      { title: "Employee Verification", description: "Submit requests for past DEJOIY employees.", href: "/employee-verification", icon: <Users size={18} /> }
    ]
  }
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeMenuData = navConfig.find((item) => item.key === activeMenu);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#020617]/90 backdrop-blur-2xl shadow-[0_1px_0_rgba(255,255,255,0.05)]"
          : "border-b border-transparent bg-transparent backdrop-blur-sm"
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="section-wrap">
        <div className="flex h-[68px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.png" alt="DEJOIY" className="h-9 w-9 object-contain" />
            <div>
              <div className="text-[17px] font-bold tracking-tight leading-none">DEJOIY</div>
              <div className="text-[9px] uppercase tracking-[0.35em] text-white/40 leading-none mt-0.5">
                AI Services · BPO
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navConfig.map((item) => (
              <button
                key={item.key}
                onMouseEnter={() => setActiveMenu(item.key)}
                className={`group flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                  activeMenu === item.key
                    ? "text-white bg-white/[0.06]"
                    : "text-white/65 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${activeMenu === item.key ? "rotate-180 text-white" : "text-white/40"}`}
                />
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="rounded-full border border-white/[0.12] bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-white/80 hover:text-white hover:bg-white/[0.1] transition-all duration-200"
            >
              hello@corp.dejoiy.com
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-[#020617] hover:bg-white/90 transition-all duration-200 shadow-sm"
            >
              Get started
            </Link>
          </div>

          <button
            className="lg:hidden rounded-lg border border-white/10 bg-white/[0.05] p-2 text-white"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden pb-5">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 space-y-1">
              {navConfig.map((item) => (
                <Link
                  key={item.key}
                  href={item.items[0]?.href || "/"}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/[0.06] transition"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-white/70 shrink-0">
                    {item.items[0]?.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{item.label}</div>
                    <div className="text-xs text-white/50 mt-0.5">{item.items[0]?.description}</div>
                  </div>
                </Link>
              ))}
              <div className="pt-2 px-1">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full rounded-xl bg-white py-3 text-center text-sm font-semibold text-[#020617]"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative hidden lg:block">
        <div className="absolute left-1/2 top-0 w-full -translate-x-1/2 px-8">
          <div className="mx-auto max-w-6xl">
            <MegaMenu open={!!activeMenuData} items={activeMenuData?.items || []} centered />
          </div>
        </div>
      </div>
    </header>
  );
}
