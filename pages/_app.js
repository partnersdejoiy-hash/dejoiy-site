import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothCursor from "../components/SmoothCursor";
import SEO from "../components/SEO";
import ErrorBoundary from "../components/ErrorBoundary";
export default function App({ Component, pageProps }) {
  const reduced = useReducedMotion();
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
        lenis = new Lenis({ duration: 0.85, smoothWheel: true, anchors: true });
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
        <SmoothCursor />
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </MotionConfig>
    </ErrorBoundary>
  );
}
