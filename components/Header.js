import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Brand from "./Brand";
const links = [
  ["Services", "/services"],
  ["Industries", "/industries"],
  ["About", "/about"],
  ["Our people", "/our-people"],
  ["Insights", "/insights"],
  ["Careers", "/careers"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toggle = useRef(null);
  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="section-wrap header-row">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={router.asPath === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="button-primary header-cta">
            Let’s talk <ArrowUpRight size={16} />
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-nav"
          hidden={!open}
        >
          {links.map(([label, href]) => (
            <Link
              href={href}
              key={href}
              aria-current={router.asPath === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <Link href="/contact">Talk to our team ↗</Link>
        </nav>
      </header>
    </>
  );
}
