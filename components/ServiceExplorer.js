import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { services } from "../data/services";
export default function ServiceExplorer() {
  const [active, setActive] = useState(0),
    reduced = useReducedMotion(),
    service = services[active];
  return (
    <section
      className="section-wrap service-explorer"
      aria-label="Explore our services"
    >
      <div className="explorer-heading">
        <span className="intro-label">Find your next move</span>
        <h2>
          One partner.
          <br />
          Many possibilities.
        </h2>
        <p>Choose a capability. See where we can help.</p>
      </div>
      <div className="explorer-layout">
        <div
          className="explorer-menu"
          role="group"
          aria-label="Choose a service"
        >
          {services.map((s, i) => (
            <button
              key={s.slug}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {s.title}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <div className="service-preview" aria-live="polite">
          <motion.img
            key={service.image}
            src={service.image}
            alt=""
            initial={reduced ? false : { scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="service-preview-copy">
            <span className="intro-label">
              0{active + 1} / {service.title}
            </span>
            <h3>{service.short}</h3>
            <p>{service.description}</p>
            <div className="service-tags">
              {service.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Link href={`/services/${service.slug}`} className="button-primary">
              Explore this service ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
