import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Bot, Briefcase, Building2,
  Newspaper, Sparkles, Phone, ChevronDown, X, Menu,
  ArrowUpRight
} from "lucide-react";

const navConfig = [
  {
    key: "who",
    label: "Who we are",
    items: [
      { title: "About DEJOIY", description: "Our vision, leadership, culture and global delivery model.", href: "/", icon: <Users size={16} /> },
      { title: "Our People", description: "Talent, innovation and service excellence at scale.", href: "/our-people", icon: <Sparkles size={16} /> },
      { title: "Brand Profile", description: "Explore the DEJOIY brand website.", href: "https://www.dejoiy.co.in", icon: <Building2 size={16} /> }
    ]
  },
  {
    key: "services",
    label: "Services",
    items: [
      { title: "Customer Experience", description: "Premium customer support for enterprise brands.", href: "/services", icon: <Briefcase size={16} /> },
      { title: "AI Data Operations", description: "Human-in-the-loop operations for next-gen AI systems.", href: "/services", icon: <Bot size={16} /> },
      { title: "Trust & Safety", description: "Fraud review, content operations and risk support.", href: "/services", icon: <Building2 size={16} /> }
    ]
  },
  {
    key: "industries",
    label: "Industries",
    items: [
      { title: "Industry Expertise", description: "Retail, healthcare, gaming, fintech and more.", href: "/industries", icon: <Building2 size={16} /> },
      { title: "Marketplace", description: "Visit the DEJOIY marketplace.", href: "https://www.dejoiy.com", icon: <Sparkles size={16} /> },
      { title: "Sector Delivery", description: "Tailored operational models for each industry.", href: "/industries", icon: <Building2 size={16} /> }
    ]
  },
  {
    key: "insights",
    label: "Insights",
    items: [
      { title: "Articles", description: "Perspectives on AI and business operations.", href: "/insights", icon: <Newspaper size={16} /> },
      { title: "Case Studies", description: "How DEJOIY helps enterprises scale globally.", href: "/insights", icon: <Newspaper size={16} /> },
      { title: "Reports & News", description: "Research and company updates.", href: "/insights", icon: <Newspaper size={16} /> }
    ]
  },
  {
    key: "careers",
    label: "Careers",
    items: [
      { title: "Join DEJOIY", description: "Build your future with a world-class operations company.", href: "/careers", icon: <Sparkles size={16} /> },
      { title: "Open Roles", description: "Explore current opportunities.", href: "/careers", icon: <Briefcase size={16} /> },
      { title: "Employee Verification", description: "Submit verification requests.", href: "/employee-verification", icon: <Users size={16} /> }
    ]
  },
  {
    key: "contact",
    label: "Contact",
    items: [
      { title: "Speak with an Expert", description: "Tell us your goals and we'll design the right solution.", href: "/contact", icon: <Phone size={16} /> },
      { title: "Business Enquiries", description: "Reach DEJOIY for partnerships and services.", href: "/contact", icon: <Phone size={16} /> },
      { title: "Employee Verification", description: "Submit requests for past DEJOIY employees.", href: "/employee-verification", icon: <Users size={16} /> }
    ]
  }
];

/* ─── Desktop Dropdown ─────────────────────────────────────────────── */
function DesktopDropdown({ items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute left-1/2 top-full -translate-x-1/2 pt-2 z-50 min-w-[640px]"
    >
      <div
        className="rounded-2xl p-3"
        style={{
          background: "rgba(8,12,36,0.96)",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.06) inset"
        }}
      >
        <div className="grid grid-cols-3 gap-1">
          {items.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="group flex items-start gap-3 rounded-xl px-3.5 py-3 transition-all duration-200"
              style={{ background: "transparent" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200"
                style={{
                  background: "rgba(37,99,235,0.12)",
                  border: "1px solid rgba(37,99,235,0.2)",
                  color: "#93c5fd"
                }}
              >
                {item.icon}
              </div>
              <div className="min-w-0">
                <div
                  className="flex items-center gap-1 text-[13px] font-medium leading-tight transition-colors duration-200"
                  style={{ color: "#CBD5E1" }}
                >
                  {item.title}
                  {item.href?.startsWith("http") && (
                    <ArrowUpRight size={10} style={{ color: "#64748b" }} />
                  )}
                </div>
                <p className="mt-1 text-[11.5px] leading-relaxed line-clamp-2" style={{ color: "#475569" }}>
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile Accordion Item ────────────────────────────────────────── */
function MobileNavItem({ item, onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
      <button
        onClick={() => setOpen(p => !p)}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 transition-all duration-200"
        style={{
          background: open ? "rgba(37,99,235,0.1)" : "rgba(255,255,255,0.03)",
          color: open ? "#F8FAFC" : "#CBD5E1"
        }}
      >
        <span className="text-[14.5px] font-medium">{item.label}</span>
        <ChevronDown
          size={16}
          className="shrink-0 transition-transform duration-300"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            color: open ? "#93c5fd" : "#64748b"
          }}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-3 pb-3 pt-1 space-y-1"
              style={{ background: "rgba(8,12,36,0.5)", borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              {item.items.map((sub, i) => (
                <Link
                  key={i}
                  href={sub.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200"
                  style={{ background: "transparent" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: "rgba(37,99,235,0.12)",
                      border: "1px solid rgba(37,99,235,0.2)",
                      color: "#93c5fd"
                    }}
                  >
                    {sub.icon}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium" style={{ color: "#CBD5E1" }}>{sub.title}</div>
                    <div className="text-[11px] leading-snug mt-0.5" style={{ color: "#475569" }}>{sub.description}</div>
                  </div>
                  {sub.href?.startsWith("http") && (
                    <ArrowUpRight size={12} className="ml-auto shrink-0" style={{ color: "#475569" }} />
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Header ───────────────────────────────────────────────────────── */
export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route navigation */
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(2,6,23,0.92)"
            : "rgba(2,6,23,0.4)",
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.04)" : "none"
        }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="section-wrap">
          <div className="flex h-[64px] items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 z-10">
              <img src="/logo.png" alt="DEJOIY" className="h-8 w-8 object-contain" />
              <div>
                <div className="text-[16px] font-bold tracking-tight leading-none" style={{ color: "#F8FAFC" }}>
                  DEJOIY
                </div>
                <div className="text-[8.5px] uppercase tracking-[0.35em] leading-none mt-0.5" style={{ color: "#475569" }}>
                  AI Services · BPO
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 relative">
              {navConfig.map((item) => {
                const isActive = activeMenu === item.key;
                return (
                  <div key={item.key} className="relative">
                    <button
                      onMouseEnter={() => setActiveMenu(item.key)}
                      onClick={() => setActiveMenu(isActive ? null : item.key)}
                      className="group relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-[13px] font-medium transition-all duration-200"
                      style={{
                        background: isActive ? "rgba(37,99,235,0.14)" : "transparent",
                        border: isActive ? "1px solid rgba(37,99,235,0.28)" : "1px solid transparent",
                        color: isActive ? "#F8FAFC" : "#94a3b8",
                        backdropFilter: isActive ? "blur(12px)" : "none"
                      }}
                      onMouseLeave={() => {}}
                    >
                      <span style={{ color: isActive ? "#F8FAFC" : "#94a3b8" }}>{item.label}</span>
                      <ChevronDown
                        size={13}
                        className="transition-transform duration-200 shrink-0"
                        style={{
                          transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                          color: isActive ? "#93c5fd" : "#64748b"
                        }}
                      />
                    </button>

                    <AnimatePresence>
                      {isActive && <DesktopDropdown items={item.items} />}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2.5">
              <Link
                href="/contact"
                className="rounded-full px-4 py-2 text-[12.5px] font-medium transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#CBD5E1",
                  backdropFilter: "blur(12px)"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "#F8FAFC";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "#CBD5E1";
                }}
              >
                hello@corp.dejoiy.com
              </Link>
              <Link
                href="/contact"
                className="rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-200"
                style={{ background: "#F8FAFC", color: "#020617" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(248,250,252,0.88)"}
                onMouseLeave={e => e.currentTarget.style.background = "#F8FAFC"}
              >
                Get started
              </Link>
            </div>

            {/* Mobile hamburger toggle — glassy pill button */}
            <button
              onClick={() => setMobileOpen(p => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="lg:hidden relative flex items-center justify-center rounded-xl transition-all duration-250 active:scale-95"
              style={{
                width: 44,
                height: 44,
                background: mobileOpen
                  ? "rgba(37,99,235,0.2)"
                  : "rgba(255,255,255,0.07)",
                border: mobileOpen
                  ? "1px solid rgba(37,99,235,0.45)"
                  : "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px) saturate(160%)",
                WebkitBackdropFilter: "blur(16px) saturate(160%)",
                color: mobileOpen ? "#93c5fd" : "#CBD5E1",
                boxShadow: mobileOpen
                  ? "0 0 20px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.12)"
                  : "0 2px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)"
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center"
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center"
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(2,6,23,0.7)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Glass panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 top-[64px] z-40 lg:hidden mx-3 mt-2"
            >
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  background: "rgba(8,12,40,0.97)",
                  backdropFilter: "blur(32px) saturate(160%)",
                  WebkitBackdropFilter: "blur(32px) saturate(160%)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)",
                  maxHeight: "calc(100dvh - 88px)",
                  overflowY: "auto"
                }}
              >
                {/* Top gradient line */}
                <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6) 30%, rgba(124,58,237,0.6) 70%, transparent)" }} />

                <div className="p-3 space-y-2">
                  {navConfig.map((item) => (
                    <MobileNavItem
                      key={item.key}
                      item={item}
                      onClose={() => setMobileOpen(false)}
                    />
                  ))}
                </div>

                {/* Bottom CTA strip */}
                <div
                  className="p-3 space-y-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center rounded-2xl py-3.5 text-[14px] font-semibold transition-all duration-200 active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                      color: "#F8FAFC",
                      boxShadow: "0 6px 28px rgba(37,99,235,0.35)"
                    }}
                  >
                    Get started
                  </Link>
                  <a
                    href="mailto:hello@corp.dejoiy.com"
                    className="flex items-center justify-center rounded-2xl py-3.5 text-[13px] font-medium transition-all duration-200"
                    style={{
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.04)",
                      color: "#94a3b8"
                    }}
                  >
                    hello@corp.dejoiy.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
