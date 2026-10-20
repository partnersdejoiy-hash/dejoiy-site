import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * ScrollFX — GSAP scroll choreography.
 * - [data-reveal]: sections ease up into view with a physics-like settle.
 * - [data-reveal="lines"]: child [data-line] items stagger in.
 * - [data-plx="n"]: gentle parallax drift across the section.
 * Rebuilds on route change; kills only its own triggers (CosmosCanvas owns
 * its own flight trigger). No-ops for reduced-motion users.
 */
export default function ScrollFX() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    let triggers = [];
    let ctxCancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (ctxCancelled) return;

      document.querySelectorAll("[data-reveal]").forEach((el) => {
        const tween = gsap.fromTo(
          el,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });

      document.querySelectorAll("[data-lines]").forEach((group) => {
        const items = group.querySelectorAll("[data-line]");
        if (!items.length) return;
        const tween = gsap.fromTo(
          items,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            clearProps: "transform",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              once: true,
            },
          },
        );
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });

      document.querySelectorAll("[data-plx]").forEach((el) => {
        const amt = parseFloat(el.getAttribute("data-plx") || "10");
        const tween = gsap.to(el, {
          yPercent: amt,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });

      const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 500);
      triggers.push({ kill: () => clearTimeout(refreshTimer) });
    })();

    return () => {
      ctxCancelled = true;
      triggers.forEach((t) => {
        try {
          t.kill();
        } catch {
          /* already gone */
        }
      });
    };
  }, [router.asPath]);

  return null;
}
