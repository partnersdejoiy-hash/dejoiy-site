import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRouter } from "next/router";
const images = {
  services: "/services/customer-experience.jpg",
  about: "/brand/careers-hero.jpg",
  careers: "/brand/careers-hero.jpg",
  insights: "/brand/careers-hero.jpg",
  resources: "/services/back-office.jpg",
  "case-studies": "/services/ai-data-operations.jpg",
  "our-people": "/brand/careers-hero.jpg",
  contact: "/services/customer-experience.jpg",
};
export default function PageIntro({
  eyebrow,
  title,
  description,
  children,
  image,
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 65]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-7, 5]);
  const src =
    image ||
    images[router.pathname.split("/")[1]] ||
    "/services/back-office.jpg";
  return (
    <section className="page-intro interior-intro" ref={ref}>
      <div className="section-wrap intro-layout">
        <motion.div
          className="intro-copy"
          initial={reduced ? false : { y: 18 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="intro-label">
            DEJOIY / {eyebrow || "People. Possibility."}
          </span>
          <h1>{title}</h1>
          <p>{description}</p>
          {children}
        </motion.div>
        <motion.div
          className="intro-art"
          style={reduced ? undefined : { y, rotate }}
          aria-hidden="true"
        >
          <div className="intro-sheet sheet-cyan" />
          <div className="intro-sheet sheet-pink" />
          <div className="intro-image">
            <img src={src} alt="" />
            <span>Human at the heart.</span>
          </div>
          <span className="intro-art-caption">
            DEJOIY — A closer connection
          </span>
        </motion.div>
      </div>
      <div className="intro-rule">
        <span>People.</span>
        <span>Process.</span>
        <span>Possibility.</span>
        <span aria-hidden="true">↓</span>
      </div>
    </section>
  );
}
