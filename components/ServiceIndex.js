import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/**
 * ServiceIndex — an editorial index of capabilities instead of a card grid.
 * Numbered hairline rows; on fine pointers a floating image preview chases
 * the cursor. Keyboard and touch users get the same content without the
 * preview. No generic tiles, no placeholder icons.
 */
export default function ServiceIndex({ services }) {
  const [active, setActive] = useState(null);
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const rafRef = useRef(0);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const onMove = (e) => {
    const host = listRef.current;
    const prev = previewRef.current;
    if (!host || !prev) return;
    const r = host.getBoundingClientRect();
    pos.current.tx = e.clientX - r.left;
    pos.current.ty = e.clientY - r.top;
    const follow = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.16;
      p.y += (p.ty - p.y) * 0.16;
      prev.style.transform = `translate(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px) translate(-50%, -58%) rotate(${(p.tx - p.x) * 0.05}deg)`;
      if (Math.abs(p.tx - p.x) + Math.abs(p.ty - p.y) > 0.6) {
        rafRef.current = requestAnimationFrame(follow);
      }
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(follow);
  };

  const current = active != null ? services[active] : null;

  return (
    <div
      ref={listRef}
      className="u-index"
      onMouseMove={onMove}
      onMouseLeave={() => setActive(null)}
    >
      <ol className="u-index-list">
        {services.map((s, i) => (
          <li key={s.slug} data-reveal data-delay={(i % 4) * 0.04}>
            <Link
              href={`/services/${s.slug}`}
              className="u-index-row"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span className="u-index-no" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="u-index-main">
                <span className="u-index-title">{s.title}</span>
                <span className="u-index-short">{s.short}</span>
              </span>
              <span className="u-index-tags" aria-hidden="true">
                {s.tags.slice(0, 2).join(" · ")}
              </span>
              <span className="u-index-arrow" aria-hidden="true">
                <ArrowUpRight size={22} />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div
        ref={previewRef}
        className={`u-index-preview${current ? " is-on" : ""}`}
        aria-hidden="true"
      >
        {services.map((s, i) => (
          <div
            key={s.slug}
            className={`u-index-shot${active === i ? " is-on" : ""}`}
          >
            <Image
              src={s.image}
              alt=""
              width={420}
              height={280}
              sizes="420px"
              className="u-index-shot-img"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
