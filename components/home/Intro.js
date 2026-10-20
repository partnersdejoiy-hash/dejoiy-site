import Image from "next/image";

const facts = [
  ["3 channels", "Voice, chat and email, held to one standard."],
  ["6 disciplines", "From the first contact to the final quality check."],
  ["1 scorecard", "Agreed with you before the work begins."],
  ["India", "Where DEJOIY is headquartered."],
];

export default function Intro() {
  return (
    <section className="intro chapter" id="our-approach" aria-labelledby="intro-title" data-station="drift">
      <div className="wrap intro-top">
        <h2 id="intro-title" className="head" data-reveal>
          Human at heart
        </h2>
        <p className="intro-note" data-reveal>
          Technology connects the work. People make it matter. We look after
          the conversations and the quiet operations your customers never see
          but always feel.
        </p>
      </div>
      <dl className="wrap facts">
        {facts.map(([fact, note]) => (
          <div key={fact} data-reveal>
            <dt>{fact}</dt>
            <dd>{note}</dd>
          </div>
        ))}
      </dl>
      <figure className="wrap intro-photo" data-reveal>
        <Image
          src="/brand/careers-hero.jpg"
          alt="A small team working through a plan around a shared table"
          width={1232}
          height={822}
          sizes="(max-width: 820px) 100vw, 42vw"
        />
      </figure>
    </section>
  );
}
