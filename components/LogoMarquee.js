const logos = [
  "Google", "Microsoft", "Amazon", "Meta", "Shopify",
  "Salesforce", "HubSpot", "Stripe", "Adobe", "Oracle",
  "SAP", "IBM", "Accenture", "Deloitte", "McKinsey"
];

function LogoItem({ name }) {
  return (
    <div className="flex items-center justify-center mx-10 shrink-0">
      <span className="text-[13px] font-semibold uppercase tracking-[0.15em] text-white/20 hover:text-white/50 transition-colors duration-300 whitespace-nowrap select-none">
        {name}
      </span>
    </div>
  );
}

export default function LogoMarquee() {
  const duplicated = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-10">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#05071a] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#05071a] to-transparent pointer-events-none" />

      <div className="flex items-center animate-marquee hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
        {duplicated.map((name, i) => (
          <LogoItem key={`${name}-${i}`} name={name} />
        ))}
      </div>
    </div>
  );
}
