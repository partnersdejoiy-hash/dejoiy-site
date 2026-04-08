import "../styles/globals.css";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothCursor from "../components/SmoothCursor";
import PageTransition from "../components/PageTransition";
import PageLoader from "../components/PageLoader";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    let lenis;
    const initLenis = async () => {
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
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <>
      <PageLoader />
      <SmoothCursor />
      <Header />
      <AnimatePresence mode="wait">
        <PageTransition key={router.pathname}>
          <Component {...pageProps} />
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </>
  );
}
