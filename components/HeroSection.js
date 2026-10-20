import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

/*
  The name as a monument. The upper part of the first screen is an open
  window onto the live cosmos (camera station "core"); the name sits on a
  flat band beneath it, with a person's voice — a headset photograph — in
  place of the O. As the hero leaves, the name settles by a few percent.
*/
export default function HeroSection() {
  const nameRef = useRef(null);

  useEffect(() => {
    const el = nameRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(Math.max(window.scrollY / window.innerHeight, 0), 1);
      el.style.transform = `scale(${1 - p * 0.06})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="hero-window" data-station="core">
        <div className="hero-row">
          <p className="hero-line">
            People. Purpose. Possibility. Customer support, back-office work
            and human-in-the-loop AI, run from India by people who care about
            getting it right.
          </p>
          <Link href="/contact" className="button-primary hero-action">
            Start a conversation
          </Link>
        </div>
      </div>
      <div className="hero-band">
        <h1 id="hero-name" className="hero-name" aria-label="DEJOIY — BPO and customer experience">
          <span ref={nameRef} className="hero-name-inner" aria-hidden="true">
            <span>DEJ</span>
            <span className="hero-o">
              <Image
                src="/services/customer-experience.jpg"
                alt=""
                fill
                priority
                sizes="(max-width: 820px) 30vw, 22vw"
              />
            </span>
            <span>IY</span>
          </span>
        </h1>
      </div>
    </section>
  );
}
