import { useEffect, useRef, useState } from "react";

export default function SmoothCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    const checkHover = (e) => {
      const target = e.target;
      setHovered(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", checkHover);
    window.addEventListener("mouseout", onLeave);

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }

      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", checkHover);
      window.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[200] hidden md:block will-change-transform"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div
          className="h-2 w-2 rounded-full bg-white"
          style={{ transform: hovered ? "scale(0)" : "scale(1)", transition: "transform 0.2s ease" }}
        />
      </div>

      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[199] hidden md:block will-change-transform"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
      >
        <div
          style={{
            width: hovered ? "52px" : "40px",
            height: hovered ? "52px" : "40px",
            borderRadius: "50%",
            border: `1.5px solid ${hovered ? "rgba(107,92,255,0.9)" : "rgba(255,255,255,0.3)"}`,
            background: hovered ? "rgba(107,92,255,0.1)" : "transparent",
            transition: "width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease",
            marginLeft: hovered ? "-6px" : "0",
            marginTop: hovered ? "-6px" : "0",
          }}
        />
      </div>
    </>
  );
}
