import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className="site-progress"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
    />
  );
}
