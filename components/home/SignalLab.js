import { useEffect, useRef, useState } from "react";

/*
  The live thing. A visitor sends one illustrative customer contact; it
  launches as a point of light in the cosmos and spirals in to the core
  while the route it takes is written out beside it.
*/
const channels = [
  ["voice", "Voice"],
  ["chat", "Chat"],
  ["email", "Email"],
];

const reasons = {
  order: {
    label: "Where is my order?",
    route: ["A customer support agent picks it up and confirms the details.", "The order is traced in your systems using the written playbook."],
  },
  technical: {
    label: "The app will not let me log in",
    route: ["A first-line agent works through the guided checks.", "A technical support specialist takes over with the full history attached."],
  },
  billing: {
    label: "I was charged twice",
    route: ["A customer support agent verifies the account.", "A back-office specialist reconciles the payment and records the fix."],
  },
  data: {
    label: "Please correct my address",
    route: ["The request is captured exactly as written.", "Data entry updates the record and a second person checks it."],
  },
  ai: {
    label: "The chatbot gave me a wrong answer",
    route: ["A person reads the full conversation, not just the last line.", "The answer is corrected and flagged for human-in-the-loop review."],
  },
};

const channelOpen = {
  voice: "Received as a call.",
  chat: "Received in chat.",
  email: "Received by email.",
};

export default function SignalLab() {
  const [channel, setChannel] = useState("chat");
  const [reason, setReason] = useState("technical");
  const [route, setRoute] = useState(null);
  const [shown, setShown] = useState(0);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const send = (e) => {
    e.preventDefault();
    timers.current.forEach(clearTimeout);
    const lines = [
      channelOpen[channel],
      ...reasons[reason].route,
      "Checked in quality review against your scorecard.",
      "Resolved, logged and visible to your team.",
    ];
    setRoute(lines);
    window.dispatchEvent(new CustomEvent("dejoiy:signal", { detail: { channel } }));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(lines.length);
      return;
    }
    setShown(1);
    lines.forEach((_, i) => {
      if (i === 0) return;
      timers.current.push(setTimeout(() => setShown(i + 1), i * 1100));
    });
  };

  return (
    <section className="signal" aria-labelledby="signal-title" data-station="signal">
      <div className="wrap signal-inner">
        <div className="signal-copy">
          <h2 id="signal-title" className="head" data-reveal>
            Send a signal
          </h2>
          <p className="signal-lead" data-reveal>
            Every point of light out here is a conversation. Send one and
            watch how a DEJOIY team carries it all the way to the centre.
          </p>
          <form className="signal-form" onSubmit={send} data-reveal>
            <fieldset>
              <legend>Channel</legend>
              <div className="signal-channels">
                {channels.map(([id, label]) => (
                  <label key={id} className="signal-chip">
                    <input
                      type="radio"
                      name="channel"
                      value={id}
                      checked={channel === id}
                      onChange={() => setChannel(id)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="signal-field">
              <span>The customer says</span>
              <select value={reason} onChange={(e) => setReason(e.target.value)}>
                {Object.entries(reasons).map(([id, r]) => (
                  <option key={id} value={id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="button-primary">
              Send it
            </button>
          </form>
        </div>
        <div className="signal-route" aria-live="polite">
          {route ? (
            <ol>
              {route.map((line, i) => (
                <li key={line} data-on={i < shown || undefined}>
                  {line}
                </li>
              ))}
            </ol>
          ) : (
            <p className="signal-empty">Choose a channel and a message, then send it.</p>
          )}
          <p className="signal-note">An illustration of how a DEJOIY workflow runs, not live data.</p>
        </div>
      </div>
    </section>
  );
}
