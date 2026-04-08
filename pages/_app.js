import "../styles/globals.css";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothCursor from "../components/SmoothCursor";
import PageTransition from "../components/PageTransition";
import PageLoader from "../components/PageLoader";
import ErrorBoundary from "../components/ErrorBoundary";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    let lenis;
    let rafId;
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      } catch (e) {
        console.warn("[Lenis] Failed to initialize smooth scroll:", e.message);
      }
    };

    initLenis();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <ErrorBoundary>
      <PageLoader />
      <SmoothCursor />
      <Header />
      <AnimatePresence mode="wait">
        <PageTransition key={router.pathname}>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </ErrorBoundary>
  );
}
