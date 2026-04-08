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
      { title: "About DEJOIY",  description: "Our vision, leadership, culture and global delivery model.", href: "/",                        icon: <Users size={16} /> },
      { title: "Our People",    description: "Talent, innovation and service excellence at scale.",        href: "/our-people",              icon: <Sparkles size={16} /> },
      { title: "Brand Profile", description: "Explore the DEJOIY brand website.",                         href: "https://www.dejoiy.co.in", icon: <Building2 size={16} /> }
    ]
  },
  {
    key: "services",
    label: "Services",
    items: [
      { title: "Customer Experience", description: "Premium customer support for enterprise brands.",                href: "/services", icon: <Briefcase size={16} /> },
      { title: "AI Data Operations",  description: "Human-in-the-loop operations for next-gen AI systems.",        href: "/services", icon: <Bot size={16} /> },
      { title: "Trust & Safety",      description: "Fraud review, content operations and risk support.",           href: "/services", icon: <Building2 size={16} /> }
    ]
  },
  {
    key: "industries",
    label: "Industries",
    items: [
      { title: "Industry Expertise", description: "Retail, healthcare, gaming, fintech and more.",           href: "/industries",           icon: <Building2 size={16} /> },
      { title: "Marketplace",        description: "Visit the DEJOIY marketplace.",                          href: "https://www.dejoiy.com", icon: <Sparkles size={16} /> },
      { title: "Sector Delivery",    description: "Tailored operational models for each industry.",         href: "/industries",           icon: <Building2 size={16} /> }
    ]
  },
  {
    key: "insights",
    label: "Insights",
    items: [
      { title: "Articles",        description: "Perspectives on AI and business operations.",       href: "/insights", icon: <Newspaper size={16} /> },
      { title: "Case Studies",    description: "How DEJOIY helps enterprises scale globally.",      href: "/insights", icon: <Newspaper size={16} /> },
      { title: "Reports & News",  description: "Research and company updates.",                    href: "/insights", icon: <Newspaper size={16} /> }
    ]
  },
  {
    key: "careers",
    label: "Careers",
    items: [
      { title: "Join DEJOIY",             description: "Build your future with a world-class operations company.", href: "/careers",               icon: <Sparkles size={16} /> },
      { title: "Open Roles",              description: "Explore current opportunities.",                           href: "/careers",               icon: <Briefcase size={16} /> },
      { title: "Employee Verification",   description: "Submit verification requests.",                           href: "/employee-verification",  icon: <Users size={16} /> }
    ]
  },
  {
    key: "contact",
    label: "Contact",
    items: [
      { title: "Speak with an Expert",  description: "Tell us your goals and we'll design the right solution.", href: "/contact",               icon: <Phone size={16} /> },
      { title: "Business Enquiries",    description: "Reach DEJOIY for partnerships and services.",             href: "/contact",               icon: <Phone size={16} /> },
      { title: "Employee Verification", description: "Submit requests for past DEJOIY employees.",              href: "/employee-verification",  icon: <Users size={16} /> }
    ]
  }
];

/* ─── Shared Desktop Dropdown (rendered at header level, always centered) ── */
function DesktopDropdown({ activeKey }) {
  const activeData = navConfig.find(n => n.key === activeKey);

  return (
    <AnimatePresence mode="wait">
      {activeData && (
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.98 }}
          transition={{ duration: 0.17, ease: [0.16, 1, 0.3, 1] }}
          /* Centered within the max-width container, never overflows */
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 660,
            maxWidth: "calc(100vw - 32px)",
            zIndex: 60,
            paddingTop: 8
          }}
        >
          <div
            style={{
              background: "rgba(8,12,36,0.97)",
              backdropFilter: "blur(32px) saturate(170%)",
              WebkitBackdropFilter: "blur(32px) saturate(170%)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 18,
              boxShadow: "0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
              padding: 12
            }}
          >
            {/* top shimmer line */}
            <div style={{
              position: "absolute", top: 9, left: 40, right: 40, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.5) 40%, rgba(124,58,237,0.5) 60%, transparent)"
            }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4 }}>
              {activeData.items.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    borderRadius: 12, padding: "12px 14px",
                    background: "transparent",
                    transition: "background 0.18s ease",
                    textDecoration: "none"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{
                    marginTop: 2,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, width: 32, height: 32, borderRadius: 10,
                    background: "rgba(37,99,235,0.13)",
                    border: "1px solid rgba(37,99,235,0.24)",
                    color: "#93c5fd"
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 4,
                      fontSize: 13, fontWeight: 500, color: "#CBD5E1", lineHeight: "1.3"
                    }}>
                      {item.title}
                      {item.href?.startsWith("http") && (
                        <ArrowUpRight size={10} style={{ color: "#64748b", flexShrink: 0 }} />
                      )}
                    </div>
                    <p style={{
                      margin: "4px 0 0", fontSize: 11.5, lineHeight: 1.6,
                      color: "#475569", overflow: "hidden",
                      display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
                    }}>
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Mobile Accordion Item ────────────────────────────────────────── */
function MobileNavItem({ item, onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ overflow: "hidden", borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)" }}>
      <button
        onClick={() => setOpen(p => !p)}
        style={{
          display: "flex", width: "100%", alignItems: "center",
          justifyContent: "space-between", gap: 12,
          padding: "14px 16px",
          background: open ? "rgba(37,99,235,0.1)" : "rgba(255,255,255,0.03)",
          color: open ? "#F8FAFC" : "#CBD5E1",
          border: "none", cursor: "pointer", transition: "background 0.2s ease"
        }}
      >
        <span style={{ fontSize: 14.5, fontWeight: 500 }}>{item.label}</span>
        <ChevronDown
          size={16}
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.28s ease",
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
            <div style={{
              padding: "4px 12px 12px",
              background: "rgba(8,12,36,0.5)",
              borderTop: "1px solid rgba(255,255,255,0.06)"
            }}>
              {item.items.map((sub, i) => (
                <Link
                  key={i}
                  href={sub.href}
                  onClick={onClose}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    borderRadius: 12, padding: "11px 12px",
                    background: "transparent", textDecoration: "none",
                    transition: "background 0.18s ease"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, width: 34, height: 34, borderRadius: 10,
                    background: "rgba(37,99,235,0.12)",
                    border: "1px solid rgba(37,99,235,0.22)",
                    color: "#93c5fd"
                  }}>
                    {sub.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#CBD5E1" }}>{sub.title}</div>
                    <div style={{ fontSize: 11, lineHeight: 1.5, marginTop: 2, color: "#475569" }}>{sub.description}</div>
                  </div>
                  {sub.href?.startsWith("http") && (
                    <ArrowUpRight size={12} style={{ flexShrink: 0, color: "#475569" }} />
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
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Header bar ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{
          background: scrolled ? "rgba(2,6,23,0.92)" : "rgba(2,6,23,0.4)",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.04)" : "none",
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease"
        }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* The section-wrap is our centering container and also the dropdown's offset parent */}
        <div
          className="section-wrap"
          style={{ position: "relative" }}   /* ← dropdown is absolute to THIS */
        >
          <div style={{ display: "flex", height: 64, alignItems: "center", justifyContent: "space-between" }}>

            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, textDecoration: "none" }}>
              <img src="/logo.png" alt="DEJOIY" style={{ height: 32, width: 32, objectFit: "contain" }} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, color: "#F8FAFC" }}>
                  DEJOIY
                </div>
                <div style={{ fontSize: 8.5, textTransform: "uppercase", letterSpacing: "0.35em", lineHeight: 1, marginTop: 3, color: "#475569" }}>
                  AI Services · BPO
                </div>
              </div>
            </Link>

            {/* Desktop Nav — buttons only, no dropdown wrappers */}
            <nav style={{ display: "none" }} className="lg-nav-show">
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {navConfig.map((item) => {
                  const isActive = activeMenu === item.key;
                  return (
                    <button
                      key={item.key}
                      onMouseEnter={() => setActiveMenu(item.key)}
                      onClick={() => setActiveMenu(isActive ? null : item.key)}
                      style={{
                        display: "flex", alignItems: "center", gap: 6,
                        borderRadius: 12, padding: "7px 13px",
                        fontSize: 13, fontWeight: 500, cursor: "pointer",
                        background: isActive ? "rgba(37,99,235,0.14)" : "transparent",
                        border: isActive ? "1px solid rgba(37,99,235,0.3)" : "1px solid transparent",
                        color: isActive ? "#F8FAFC" : "#94a3b8",
                        backdropFilter: isActive ? "blur(12px)" : "none",
                        transition: "background 0.18s ease, border-color 0.18s ease, color 0.18s ease",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        style={{
                          flexShrink: 0,
                          transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.22s ease",
                          color: isActive ? "#93c5fd" : "#64748b"
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Desktop CTA */}
            <div style={{ display: "none" }} className="lg-cta-show">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Link
                  href="/contact"
                  style={{
                    borderRadius: 999, padding: "7px 16px",
                    fontSize: 12.5, fontWeight: 500,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    color: "#CBD5E1",
                    backdropFilter: "blur(12px)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "background 0.18s ease, color 0.18s ease"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#F8FAFC"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#CBD5E1"; }}
                >
                  hello@corp.dejoiy.com
                </Link>
                <Link
                  href="/contact"
                  style={{
                    borderRadius: 999, padding: "7px 20px",
                    fontSize: 13, fontWeight: 600,
                    background: "#F8FAFC", color: "#020617",
                    textDecoration: "none", whiteSpace: "nowrap",
                    transition: "background 0.18s ease"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(248,250,252,0.88)"}
                  onMouseLeave={e => e.currentTarget.style.background = "#F8FAFC"}
                >
                  Get started
                </Link>
              </div>
            </div>

            {/* Mobile hamburger toggle */}
            <button
              onClick={() => setMobileOpen(p => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="lg-hide"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: mobileOpen ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.07)",
                border: mobileOpen ? "1px solid rgba(37,99,235,0.45)" : "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px) saturate(160%)",
                WebkitBackdropFilter: "blur(16px) saturate(160%)",
                color: mobileOpen ? "#93c5fd" : "#CBD5E1",
                cursor: "pointer",
                boxShadow: mobileOpen
                  ? "0 0 20px rgba(37,99,235,0.3), inset 0 1px 0 rgba(255,255,255,0.12)"
                  : "0 2px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
                transition: "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease"
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* ── Single shared dropdown, centered in section-wrap ─────── */}
          <div className="lg-nav-show">
            <DesktopDropdown activeKey={activeMenu} />
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ──────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="lg-hide"
              style={{
                position: "fixed", inset: 0, zIndex: 40,
                background: "rgba(2,6,23,0.7)",
                backdropFilter: "blur(4px)"
              }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="lg-hide"
              style={{
                position: "fixed", top: 64, left: 12, right: 12,
                zIndex: 45, marginTop: 8
              }}
            >
              <div style={{
                borderRadius: 24, overflow: "hidden",
                background: "rgba(8,12,40,0.97)",
                backdropFilter: "blur(32px) saturate(160%)",
                WebkitBackdropFilter: "blur(32px) saturate(160%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.08)",
                maxHeight: "calc(100dvh - 88px)",
                overflowY: "auto"
              }}>
                <div style={{
                  height: 1, width: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.6) 30%, rgba(124,58,237,0.6) 70%, transparent)"
                }} />

                <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {navConfig.map((item) => (
                    <MobileNavItem key={item.key} item={item} onClose={() => setMobileOpen(false)} />
                  ))}
                </div>

                <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 8 }}>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 16, padding: "14px 0",
                      fontSize: 14, fontWeight: 600,
                      background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                      color: "#F8FAFC", textDecoration: "none",
                      boxShadow: "0 6px 28px rgba(37,99,235,0.35)",
                      transition: "opacity 0.18s ease"
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    Get started
                  </Link>
                  <a
                    href="mailto:hello@corp.dejoiy.com"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 16, padding: "13px 0",
                      fontSize: 13, fontWeight: 500,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.04)",
                      color: "#94a3b8", textDecoration: "none"
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

      {/* Responsive utility styles */}
      <style>{`
        @media (min-width: 1024px) {
          .lg-nav-show { display: block !important; }
          .lg-cta-show { display: block !important; }
          .lg-hide     { display: none   !important; }
        }
        @media (max-width: 1023px) {
          .lg-nav-show { display: none   !important; }
          .lg-cta-show { display: none   !important; }
          .lg-hide     { display: flex   !important; }
        }
      `}</style>
    </>
  );
}
