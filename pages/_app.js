import "../styles/globals.css";
import "../styles/universe.css";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { MotionConfig, useReducedMotion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothCursor from "../components/SmoothCursor";
import SEO from "../components/SEO";
import ErrorBoundary from "../components/ErrorBoundary";
import useUniverseMotion from "../components/useUniverseMotion";
const CosmosCanvas = dynamic(() => import("../components/CosmosCanvas"), {
  ssr: false,
  loading: () => <div className="cosmos" aria-hidden="true"><div className="cosmos-fallback" /></div>,
});
export default function App({ Component, pageProps }) {
  const reduced = useReducedMotion();
  const router = useRouter();
  useUniverseMotion(router.asPath);
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
        <CosmosCanvas variant={router.pathname === "/" ? "home" : "page"} />
        <div className="grain" aria-hidden="true" />
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
