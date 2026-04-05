import { useEffect, useState } from "react";

export default function SmoothCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed z-[100] hidden md:block transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        left: position.x - 12,
        top: position.y - 12
      }}
    >
      <div className="h-6 w-6 rounded-full border border-white/40 bg-white/10 backdrop-blur-md shadow-glow" />
    </div>
  );
}