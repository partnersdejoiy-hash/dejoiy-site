import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Brand from "./Brand";
import ScrollProgress from "./ScrollProgress";

const links = [
  ["Services", "/services"],
  ["Industries", "/industries"],
  ["About", "/about"],
  ["Careers", "/careers"],
  ["Help", "/help"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const toggle = useRef(null);
  const isCurrent = (href) =>
    router.asPath === href || router.asPath.startsWith(`${href}/`);

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
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
        <ScrollProgress />
        <div className="header-row">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={isCurrent(href) ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
            <Link href="/contact" className="nav-action">
              Talk to us
            </Link>
          </nav>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="mobile-nav"
          hidden={!open}
        >
          {[...links, ["Talk to us", "/contact"]].map(([label, href], i) => (
            <Link
              href={href}
              key={href}
              style={{ "--i": i }}
              aria-current={isCurrent(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
