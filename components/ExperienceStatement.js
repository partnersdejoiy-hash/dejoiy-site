import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowDownRight } from "lucide-react";
const words = [
  "Behind",
  "every",
  "exceptional",
  "experience",
  "is",
  "a",
  "human",
  "connection.",
];
function Word({ word, index, progress, reduced }) {
  const opacity = useTransform(
    progress,
    [(index / words.length) * 0.72, ((index + 1) / words.length) * 0.72],
    [0.3, 1],
  );
  return (
    <motion.span style={{ opacity: reduced ? 1 : opacity }}>
      {word}{" "}
    </motion.span>
  );
}
export default function ExperienceStatement() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start .9", "end .65"],
  });
  return (
    <section ref={ref} id="our-approach" className="experience-statement">
      <div className="section-wrap">
        <div className="statement-top">
          <span>01 / THE DEJOIY DIFFERENCE</span>
          <ArrowDownRight size={28} strokeWidth={1} />
        </div>
        <h2 aria-label={words.join(" ")}>
          <span aria-hidden="true">
            {words.map((word, i) => (
              <Word
                key={i}
                word={word}
                index={i}
                progress={scrollYProgress}
                reduced={reduced}
              />
            ))}
          </span>
        </h2>
        <div className="statement-bottom">
          <span className="statement-seal" aria-hidden="true">
            ✳
          </span>
          <p>
            Technology connects the work. People make it matter. We bring care,
            clarity and accountable delivery to the experiences your business
            depends on.
          </p>
          <span className="statement-caption">
            THOUGHTFUL BY NATURE.
            <br />
            PRECISE IN PRACTICE.
          </span>
        </div>
      </div>
    </section>
  );
}
