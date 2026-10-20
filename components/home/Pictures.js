import Image from "next/image";

export default function Pictures() {
  return (
    <section className="pictures" aria-label="The work" data-station="drift">
      <figure className="pic pic-a" data-reveal>
        <Image
          src="/services/customer-experience.jpg"
          alt="Support agents wearing headsets, answering customers at their desks"
          width={648}
          height={426}
          sizes="(max-width: 820px) 100vw, 58vw"
        />
        <figcaption>Conversations, answered by people.</figcaption>
      </figure>
      <figure className="pic pic-b" data-reveal>
        <Image
          src="/services/back-office.jpg"
          alt="A specialist checking spreadsheets across two monitors"
          width={2000}
          height={1500}
          sizes="(max-width: 820px) 100vw, 38vw"
        />
        <figcaption>Operations, checked twice.</figcaption>
      </figure>
      <figure className="pic pic-c" data-reveal>
        <Image
          src="/industries/technology.jpg"
          alt="An engineer reviewing an app interface beside lines of code"
          width={1048}
          height={615}
          sizes="(max-width: 820px) 100vw, 44vw"
        />
        <figcaption>Technology, guided by judgement.</figcaption>
      </figure>
    </section>
  );
}
