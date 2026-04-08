const items = [
  "Enterprise Tech",
  "Retail & E-Commerce",
  "Digital Platforms",
  "FinTech",
  "Healthcare",
  "Trust & Safety",
  "AI Services",
  "Data Intelligence",
  "Content Moderation",
  "Global BPO",
  "Customer Success",
  "Social Media",
  "Gaming & Live Ops",
  "Travel & Logistics",
  "Financial Services",
];

function MarqueeItem({ name }) {
  return (
    <div className="flex items-center justify-center mx-10 shrink-0 gap-3">
      <span className="h-px w-3 shrink-0" style={{ background: "rgba(124,58,237,0.4)" }} />
      <span
        className="text-[12px] font-medium uppercase tracking-[0.18em] whitespace-nowrap select-none transition-colors duration-300"
        style={{ color: "#64748b" }}
        onMouseEnter={e => e.currentTarget.style.color = "#94a3b8"}
        onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
      >
        {name}
      </span>
    </div>
  );
}

export default function LogoMarquee() {
  const duplicated = [...items, ...items];

  return (
    <div className="relative overflow-hidden py-9">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#020617] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none" />
      <div className="flex items-center animate-marquee hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
        {duplicated.map((name, i) => (
          <MarqueeItem key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}
