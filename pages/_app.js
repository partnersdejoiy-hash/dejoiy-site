import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "../styles/globals.css";
import "../styles/universe.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { MotionConfig, useReducedMotion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothCursor from "../components/SmoothCursor";
import SEO from "../components/SEO";
import ErrorBoundary from "../components/ErrorBoundary";
import CosmosCanvas from "../components/CosmosCanvas";
import ScrollFX from "../components/ScrollFX";
const COSMOS_HIDDEN = ["/staff", "/employee-documents", "/employee-verification"];
export default function App({ Component, pageProps }) {
  const reduced = useReducedMotion();
  const router = useRouter();
  const hideCosmos = COSMOS_HIDDEN.some(
    (p) => router.pathname === p || router.pathname.startsWith(`${p}/`),
  );
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
        {!hideCosmos && <CosmosCanvas />}
        <SmoothCursor />
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Component {...pageProps} />
        </main>
        <Footer />
        {!hideCosmos && <ScrollFX />}
      </MotionConfig>
    </ErrorBoundary>
  );
}
