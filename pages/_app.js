import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SmoothCursor from "../components/SmoothCursor";
import PageTransition from "../components/PageTransition";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
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