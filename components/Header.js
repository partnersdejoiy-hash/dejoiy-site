import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Bot, Briefcase, Building2,
  Newspaper, Sparkles, Phone, ChevronDown, X, Menu,
  ArrowUpRight, MessageCircle
} from "lucide-react";

const navConfig = [
  {
    key: "who",
    label: "Who we are",
    items: [
      { title: "About DEJOIY",  description: "Our vision, leadership, culture and global delivery model.", href: "/",                        icon: <Users size={15} /> },
      { title: "Our People",    description: "Talent, innovation and service excellence at scale.",        href: "/our-people",              icon: <Sparkles size={15} /> },
      { title: "Brand Profile", description: "Explore the DEJOIY brand website.",                         href: "https://www.dejoiy.co.in", icon: <Building2 size={15} /> }
    ]
  },
  {
    key: "services",
    label: "Services",
    items: [
      { title: "Customer Experience", description: "Premium customer support for enterprise brands.",            href: "/services", icon: <Briefcase size={15} /> },
      { title: "AI Data Operations",  description: "Human-in-the-loop operations for next-gen AI systems.",     href: "/services", icon: <Bot size={15} /> },
      { title: "Trust & Safety",      description: "Fraud review, content operations and risk support.",        href: "/services", icon: <Building2 size={15} /> }
    ]
  },
  {
    key: "industries",
    label: "Industries",
    items: [
      { title: "Industry Expertise", description: "Retail, healthcare, gaming, fintech and more.",      href: "/industries",           icon: <Building2 size={15} /> },
      { title: "Marketplace",        description: "Visit the DEJOIY marketplace.",                      href: "https://www.dejoiy.com", icon: <Sparkles size={15} /> },
      { title: "Sector Delivery",    description: "Tailored operational models for each industry.",     href: "/industries",           icon: <Building2 size={15} /> }
    ]
  },
  {
    key: "insights",
    label: "Insights",
    items: [
      { title: "Articles",       description: "Perspectives on AI and business operations.",   href: "/insights", icon: <Newspaper size={15} /> },
      { title: "Case Studies",   description: "How DEJOIY helps enterprises scale globally.",  href: "/insights", icon: <Newspaper size={15} /> },
      { title: "Reports & News", description: "Research and company updates.",                 href: "/insights", icon: <Newspaper size={15} /> }
    ]
  },
  {
    key: "careers",
    label: "Careers",
    items: [
      { title: "Join DEJOIY",           description: "Build your future with a world-class operations company.", href: "/careers",              icon: <Sparkles size={15} /> },
      { title: "Open Roles",            description: "Explore current opportunities.",                          href: "/careers",              icon: <Briefcase size={15} /> },
      { title: "Employee Verification", description: "Submit verification requests for past employees.",        href: "/employee-verification", icon: <Users size={15} /> }
    ]
  },
  {
    key: "contact",
    label: "Contact",
    items: [
      { title: "Speak with an Expert",  description: "Tell us your goals and we'll design the right solution.", href: "/contact",              icon: <Phone size={15} /> },
      { title: "Business Enquiries",    description: "Reach DEJOIY for partnerships and enterprise services.",   href: "/contact",              icon: <MessageCircle size={15} /> },
      { title: "Employee Verification", description: "Submit requests for past DEJOIY employees.",              href: "/employee-verification", icon: <Users size={15} /> }
    ]
  }
];

/* ─── Shared Desktop Dropdown — always centered in the page ─── */
function DesktopDropdown({ activeKey }) {
  const activeData = navConfig.find(n => n.key === activeKey);

  return (
    <AnimatePresence mode="wait">
      {activeData && (
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.97 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 680,
            maxWidth: "calc(100vw - 32px)",
            zIndex: 60,
            paddingTop: 10
          }}
        >
          <div style={{
            background: "rgba(7,11,34,0.98)",
            backdropFilter: "blur(36px) saturate(180%)",
            WebkitBackdropFilter: "blur(36px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 20,
            boxShadow: "0 32px 72px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.09)",
            padding: 10,
            overflow: "hidden",
            position: "relative"
          }}>
            {/* shimmer line at top */}
            <div style={{
              position: "absolute", top: 0, left: 60, right: 60, height: 1,
              background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.55) 35%, rgba(124,58,237,0.55) 65%, transparent)"
            }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}>
              {activeData.items.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",       /* ← icons always vertically centred */
                    gap: 11,
                    borderRadius: 14,
                    padding: "13px 13px",
                    background: "transparent",
                    transition: "background 0.15s ease",
                    textDecoration: "none"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.055)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Icon chip — always centred inside itself */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, width: 34, height: 34, borderRadius: 10,
                    background: "rgba(37,99,235,0.13)",
                    border: "1px solid rgba(37,99,235,0.25)",
                    color: "#93c5fd"
                  }}>
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 3,
                      fontSize: 13, fontWeight: 500, color: "#CBD5E1", lineHeight: 1.25
                    }}>
                      {item.title}
                      {item.href?.startsWith("http") && (
                        <ArrowUpRight size={10} style={{ color: "#64748b", flexShrink: 0 }} />
                      )}
                    </div>
                    <p style={{
                      margin: "3px 0 0", fontSize: 11.5, lineHeight: 1.55,
                      color: "#4B5E7A",
                      overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical"
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

/* ─── Mobile Accordion Item ─── */
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
          border: "none", cursor: "pointer",
          transition: "background 0.22s ease, color 0.22s ease"
        }}
      >
        <span style={{ fontSize: 14.5, fontWeight: 500 }}>{item.label}</span>
        <ChevronDown
          size={16}
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1)",
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
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              padding: "4px 10px 10px",
              background: "rgba(7,11,34,0.55)",
              borderTop: "1px solid rgba(255,255,255,0.06)"
            }}>
              {item.items.map((sub, i) => (
                <Link
                  key={i}
                  href={sub.href}
                  onClick={onClose}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    borderRadius: 12, padding: "12px 10px",
                    background: "transparent", textDecoration: "none",
                    transition: "background 0.15s ease"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Icon — centred */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, width: 36, height: 36, borderRadius: 10,
                    background: "rgba(37,99,235,0.13)",
                    border: "1px solid rgba(37,99,235,0.24)",
                    color: "#93c5fd"
                  }}>
                    {sub.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: "#CBD5E1" }}>{sub.title}</div>
                    <div style={{ fontSize: 11.5, lineHeight: 1.5, marginTop: 2, color: "#4B5E7A" }}>{sub.description}</div>
                  </div>
                  {sub.href?.startsWith("http") && (
                    <ArrowUpRight size={12} style={{ flexShrink: 0, color: "#64748b" }} />
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

/* ─── Header ─── */
export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        style={{
          position: "sticky", top: 0, zIndex: 50,
          background: scrolled ? "rgba(2,6,23,0.88)" : "rgba(2,6,23,0.35)",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.3), inset 0 -1px 0 rgba(255,255,255,0.04)" : "none",
          transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.45s ease"
        }}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* section-wrap is the dropdown offset parent */}
        <div className="section-wrap" style={{ position: "relative" }}>
          <div style={{ display: "flex", height: 64, alignItems: "center", justifyContent: "space-between", gap: 12 }}>

            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, textDecoration: "none" }}>
              <img src="/logo.png" alt="DEJOIY" style={{ height: 32, width: 32, objectFit: "contain" }} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1, color: "#F8FAFC" }}>
                  DEJOIY
                </div>
                <div style={{ fontSize: 8.5, textTransform: "uppercase", letterSpacing: "0.34em", lineHeight: 1, marginTop: 3, color: "#3D5068" }}>
                  AI Services · BPO
                </div>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="lg-nav-show" style={{ display: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                {navConfig.map((item) => {
                  const active = activeMenu === item.key;
                  return (
                    <button
                      key={item.key}
                      onMouseEnter={() => setActiveMenu(item.key)}
                      onClick={() => setActiveMenu(active ? null : item.key)}
                      style={{
                        display: "flex", alignItems: "center", gap: 5,
                        borderRadius: 10, padding: "7px 12px",
                        fontSize: 13, fontWeight: 500, cursor: "pointer",
                        background: active ? "rgba(37,99,235,0.13)" : "transparent",
                        border: active ? "1px solid rgba(37,99,235,0.28)" : "1px solid transparent",
                        color: active ? "#F8FAFC" : "#8A9FBA",
                        transition: "background 0.22s ease, border-color 0.22s ease, color 0.22s ease",
                        whiteSpace: "nowrap"
                      }}
                      onMouseLeave={() => {}}
                    >
                      {item.label}
                      <ChevronDown
                        size={12}
                        style={{
                          flexShrink: 0,
                          transform: active ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
                          color: active ? "#93c5fd" : "#3D5068"
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="lg-cta-show" style={{ display: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Link
                  href="/contact"
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    borderRadius: 999, padding: "7px 18px",
                    fontSize: 12.5, fontWeight: 500,
                    border: "1px solid rgba(255,255,255,0.13)",
                    background: "rgba(255,255,255,0.065)",
                    color: "#B8CADE",
                    backdropFilter: "blur(12px)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.11)";
                    e.currentTarget.style.color = "#F8FAFC";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.065)";
                    e.currentTarget.style.color = "#B8CADE";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
                  }}
                >
                  <MessageCircle size={13} style={{ flexShrink: 0 }} />
                  Talk to us
                </Link>
                <Link
                  href="/contact"
                  style={{
                    borderRadius: 999, padding: "7px 20px",
                    fontSize: 13, fontWeight: 600,
                    background: "#F8FAFC", color: "#020617",
                    textDecoration: "none", whiteSpace: "nowrap",
                    boxShadow: "0 2px 12px rgba(255,255,255,0.1)",
                    transition: "background 0.2s ease, box-shadow 0.2s ease"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(248,250,252,0.9)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(255,255,255,0.18)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "#F8FAFC";
                    e.currentTarget.style.boxShadow = "0 2px 12px rgba(255,255,255,0.1)";
                  }}
                >
                  Get started
                </Link>
              </div>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={() => setMobileOpen(p => !p)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="lg-hide"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: mobileOpen ? "rgba(37,99,235,0.18)" : "rgba(255,255,255,0.07)",
                border: mobileOpen ? "1px solid rgba(37,99,235,0.42)" : "1px solid rgba(255,255,255,0.13)",
                backdropFilter: "blur(16px) saturate(160%)",
                WebkitBackdropFilter: "blur(16px) saturate(160%)",
                color: mobileOpen ? "#93c5fd" : "#B8CADE",
                cursor: "pointer",
                boxShadow: mobileOpen
                  ? "0 0 22px rgba(37,99,235,0.28), inset 0 1px 0 rgba(255,255,255,0.12)"
                  : "0 2px 14px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.09)",
                transition: "background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, color 0.22s ease"
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="x"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Shared centered dropdown (desktop only) */}
          <div className="lg-nav-show" style={{ display: "none" }}>
            <DesktopDropdown activeKey={activeMenu} />
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg-hide"
              style={{
                position: "fixed", inset: 0, zIndex: 40,
                background: "rgba(2,6,23,0.72)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)"
              }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Glass panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg-hide"
              style={{
                position: "fixed", top: 64, left: 12, right: 12,
                zIndex: 45, marginTop: 8
              }}
            >
              <div style={{
                borderRadius: 24, overflow: "hidden",
                background: "rgba(7,11,38,0.98)",
                backdropFilter: "blur(36px) saturate(170%)",
                WebkitBackdropFilter: "blur(36px) saturate(170%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 36px 90px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.09)",
                maxHeight: "calc(100dvh - 90px)",
                overflowY: "auto"
              }}>
                {/* shimmer line */}
                <div style={{
                  height: 1, width: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.55) 30%, rgba(124,58,237,0.55) 70%, transparent)"
                }} />

                <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                  {navConfig.map((item) => (
                    <MobileNavItem key={item.key} item={item} onClose={() => setMobileOpen(false)} />
                  ))}
                </div>

                {/* CTA strip */}
                <div style={{ padding: "8px 12px 14px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 8 }}>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      borderRadius: 16, padding: "14px 0",
                      fontSize: 14, fontWeight: 600,
                      background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                      color: "#F8FAFC", textDecoration: "none",
                      boxShadow: "0 6px 28px rgba(37,99,235,0.32)",
                      transition: "opacity 0.18s ease"
                    }}
                  >
                    Get started
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
                      borderRadius: 16, padding: "13px 0",
                      fontSize: 13, fontWeight: 500,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.04)",
                      color: "#8A9FBA", textDecoration: "none"
                    }}
                  >
                    <MessageCircle size={14} />
                    Talk to us
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Responsive helpers */}
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
