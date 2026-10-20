import { useEffect } from "react";

/*
  Entrances, driven by GSAP ScrollTrigger: the parts of each section rise in
  order (heading, text, picture) once as they enter. Content stays visible
  without JavaScript and with reduced motion.
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
          const intro = gsap.utils.toArray("[data-intro]");
          if (intro.length) {
            gsap.from(intro, { y: 28, autoAlpha: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.1 });
          }
          const items = gsap.utils.toArray("main [data-reveal]");
          if (!items.length) return;
          gsap.set(items, { y: 28, autoAlpha: 0 });
          ScrollTrigger.batch(items, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: "expo.out",
                stagger: 0.075,
                clearProps: "transform",
              }),
          });
        });
        setTimeout(() => ScrollTrigger.refresh(), 400);
      })
      .catch(() => {});
    return () => {
      disposed = true;
      ctx?.revert();
    };
  }, [routeKey]);
}
