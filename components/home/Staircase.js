const steps = [
  ["First, we listen.", "We map your customers, your volumes and the questions that keep coming back."],
  ["Then we write it down.", "Playbooks, escalation paths and a quality scorecard you sign off before day one."],
  ["Next, we start small.", "A focused pilot with real customers, so quality is proven before anything grows."],
  ["You see every score.", "The same scorecard, shared openly, every time we review the work together."],
];

export default function Staircase() {
  return (
    <section className="staircase chapter" aria-label="How an engagement works" data-station="drift">
      <ol className="wrap stairs">
        {steps.map(([line, note], i) => (
          <li key={line} style={{ "--step": i }} data-reveal>
            <p className={i === steps.length - 1 ? "stair-line is-last" : "stair-line"}>{line}</p>
            <p className="stair-note">{note}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
