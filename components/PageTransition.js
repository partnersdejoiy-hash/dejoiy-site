import { motion } from "framer-motion";
import { pageTransition } from "../animations/pageTransition";

export default function PageTransition({ children }) {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
}