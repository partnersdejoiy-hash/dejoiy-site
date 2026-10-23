import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "../styles/globals.css";
import "@fontsource/bricolage-grotesque/latin-400.css";
import "@fontsource/bricolage-grotesque/latin-500.css";
import "@fontsource/bricolage-grotesque/latin-600.css";
import "../styles/business.css";
import "../styles/interiors.css";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import ErrorBoundary from "../components/ErrorBoundary";
export default function App({ Component, pageProps }) {
  const reduced = useReducedMotion();
  const router = useRouter();
  useEffect(() => {
    if (
      reduced ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    let lenis,
      rafId,
      disposed = false;
    import("lenis")
      .then(({ default: Lenis }) => {
        if (disposed) return;
        lenis = new Lenis({
          duration: 0.85,
          smoothWheel: true,
          anchors: false,
          stopInertiaOnNavigate: true,
        });
        function raf(t) {
          lenis.raf(t);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      })
      .catch(() => {});
    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [reduced]);
  return (
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <SEO />

        <Header />
        <main id="main-content" tabIndex={-1}>
          <motion.div
            key={router.asPath.split("?")[0].split("#")[0]}
            className={router.pathname === "/" ? "home-route" : "interior-site"}
            initial={reduced ? false : { y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Component {...pageProps} />
          </motion.div>
        </main>
        <Footer />
      </MotionConfig>
    </ErrorBoundary>
  );
}
