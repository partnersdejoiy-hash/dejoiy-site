import { useEffect } from "react";

/*
  GSAP ScrollTrigger choreography shared by every page:
  - [data-reveal] blocks and section titles rise out of a soft blur as they enter.
  - The home hero copy drifts up and fades as the visitor leaves it.
  Content is fully visible without JavaScript or with reduced motion.
*/
export default function useUniverseMotion(routeKey) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx;
    let disposed = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          const targets = gsap.utils
            .toArray("[data-reveal], main .section-title")
            .filter((el) => !el.closest("[data-hero-copy]"));
          const unique = targets.filter(
            (el) => !targets.some((other) => other !== el && other.contains(el)),
          );
          gsap.set(unique, { autoAlpha: 0, y: 48, filter: "blur(10px)" });
          ScrollTrigger.batch(unique, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.09,
                clearProps: "filter,transform",
              }),
          });

          const heroCopy = document.querySelector("[data-hero-copy]");
          if (heroCopy) {
            gsap.to(heroCopy, {
              yPercent: -14,
              autoAlpha: 0.15,
              ease: "none",
              scrollTrigger: {
                trigger: ".universe-hero",
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }
        });
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh, { once: true });
        setTimeout(refresh, 400);
      })
      .catch(() => {});
    return () => {
      disposed = true;
      ctx?.revert();
    };
  }, [routeKey]);
}
