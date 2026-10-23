import { useEffect, useState } from "react";
export default function ReadingNav({ sections }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const nodes = sections
      .map((_, i) => document.getElementById(`reading-${i}`))
      .filter(Boolean);
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = 0;
        nodes.forEach((node, i) => {
          if (node.getBoundingClientRect().top <= 165) current = i;
        });
        setActive(current);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);
  return (
    <nav className="reading-nav" aria-label="In this article">
      <span className="intro-label">In this article</span>
      {sections.map(([title], i) => (
        <a
          href={`#reading-${i}`}
          onClick={() => setActive(i)}
          aria-current={active === i ? "location" : undefined}
          key={title}
        >
          <span>0{i + 1}</span>
          {title}
        </a>
      ))}
    </nav>
  );
}
