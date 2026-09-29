import { useState } from "react";
import Link from "next/link";
const regions = [
  {
    id: "india",
    label: "India",
    x: 66,
    y: 52,
    zone: "IST",
    copy: "Discuss a delivery plan with our team in Delhi, India.",
  },
  {
    id: "europe",
    label: "Europe",
    x: 49,
    y: 30,
    zone: "European time zones",
    copy: "Plan the working hours, handoffs and language requirements for your European customer journeys.",
  },
  {
    id: "americas",
    label: "Americas",
    x: 22,
    y: 40,
    zone: "Americas time zones",
    copy: "Discuss the overlap, escalation coverage and channels your customers in the Americas need.",
  },
  {
    id: "apac",
    label: "Asia Pacific",
    x: 82,
    y: 62,
    zone: "Asia Pacific time zones",
    copy: "Map your regional support hours and language needs into one coordinated delivery plan.",
  },
];
export default function WorldPresence() {
  const [active, setActive] = useState("india");
  const region = regions.find((r) => r.id === active);
  return (
    <div className="coverage-panel">
      <div className="coverage-map">
        <span className="eyebrow absolute top-5 left-5">
          Plan your coverage
        </span>
        <svg viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M8 20L20 12 35 20 28 35 22 39 27 50 23 72 17 58 15 38ZM42 22L53 15 70 18 91 28 87 47 71 45 65 56 58 40 54 38 54 60 46 64 40 45 43 34ZM78 62L89 57 96 67 88 72Z"
            fill="rgba(96,165,250,.12)"
            stroke="rgba(147,197,253,.2)"
            strokeWidth=".4"
          />
          {regions.slice(1).map((r) => (
            <path
              key={r.id}
              d={`M66 52 Q${r.x} 8 ${r.x} ${r.y}`}
              fill="none"
              stroke={active === r.id ? "#a78bfa" : "#334155"}
              strokeWidth=".4"
              strokeDasharray="1 1"
            />
          ))}
        </svg>
        {regions.map((r) => (
          <button
            key={r.id}
            style={{ left: r.x + "%", top: r.y + "%" }}
            className="map-dot"
            aria-label={`Explore ${r.label} coverage`}
            aria-pressed={active === r.id}
            onClick={() => setActive(r.id)}
          >
            <span />
          </button>
        ))}
      </div>
      <div className="coverage-tabs" role="group" aria-label="Coverage regions">
        {regions.map((r) => (
          <button
            key={r.id}
            onClick={() => setActive(r.id)}
            aria-pressed={active === r.id}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div className="coverage-detail" aria-live="polite">
        <span className="eyebrow">{region.zone}</span>
        <h3 className="text-xl font-semibold mt-2">{region.label}</h3>
        <p className="text-sm text-slate-300 mt-3 leading-relaxed">
          {region.copy}
        </p>
        <Link
          href={{ pathname: "/contact", query: { region: region.label } }}
          className="inline-block text-sm text-blue-200 mt-5"
        >
          Discuss this region ↗
        </Link>
      </div>
      <p className="px-6 pb-5 text-xs text-slate-400">
        Coverage, languages and operating hours are agreed for each engagement.
        This map is a planning guide, not a list of office locations.
      </p>
    </div>
  );
}
