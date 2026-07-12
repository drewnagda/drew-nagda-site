"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const stages = [
  {
    name: "acquisition",
    tagline: "direct to seller",
    detail:
      "deals come from outreach, not listings. we go direct to owners of distressed properties: probate, tired landlords, houses nobody else wants. we close fast, as-is. 300+ closed this way.",
  },
  {
    name: "construction",
    tagline: "in-house crews",
    detail:
      "our own crews take a property down to the studs and back. no general-contractor markup, no waiting in someone else's queue. budgets and timelines we actually control.",
  },
  {
    name: "design",
    tagline: "built for the block",
    detail:
      "every property is designed for its neighborhood and its exit: finishes that rent or sell, budgeted to the dollar. distressed to desirable is a design problem as much as a construction one.",
  },
  {
    name: "sales",
    tagline: "our own brokerage",
    detail:
      "we sell what we build. running sales in-house keeps the underwriting honest. we know what buyers actually pay because we're in the market every week.",
  },
  {
    name: "leasing",
    tagline: "operate what we keep",
    detail:
      "property management under the same roof. the properties we hold, we manage, so we underwrite like operators, not speculators.",
  },
];

export default function Machine() {
  const [active, setActive] = useState(0);
  const stage = stages[active];

  return (
    <section id="machine" className="bg-soft-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal>
          <span className="inline-flex items-center gap-3 font-heading text-[11px] font-semibold tracking-[0.3em] uppercase text-neon">
            <span className="inline-block w-10 h-[2px] bg-neon" aria-hidden />
            02 / the machine
          </span>
          <h2 className="mt-6 font-heading font-light text-4xl md:text-5xl text-raw-white leading-tight">
            the machine
          </h2>
          <p className="mt-4 font-body text-lg text-mid-gray max-w-2xl">
            300+ distressed properties, one vertically integrated operation.
            every stage of a deal happens in-house. that's why the math
            works where others walk away. tap a stage.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-5 gap-2">
            {stages.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActive(i)}
                className={`text-left p-5 border transition-all duration-300 ${
                  active === i
                    ? "border-neon bg-warm-charcoal"
                    : "border-warm-charcoal hover:border-mid-gray"
                }`}
              >
                <span
                  className={`font-heading text-xs font-semibold ${
                    active === i ? "text-neon" : "text-mid-gray"
                  }`}
                >
                  0{i + 1}
                </span>
                <span className="mt-2 block font-heading text-lg font-medium text-raw-white">
                  {s.name}
                </span>
                <span className="mt-1 block font-heading text-[10px] font-semibold tracking-[0.15em] uppercase text-mid-gray">
                  {s.tagline}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 border border-warm-charcoal bg-dark-surface p-8 md:p-10">
            <div className="flex items-baseline gap-4">
              <span className="font-heading text-sm font-semibold text-neon">
                0{active + 1}
              </span>
              <h3 className="font-heading text-2xl font-medium text-raw-white">
                {stage.name}
              </h3>
              <span className="hidden md:inline font-heading text-[10px] font-semibold tracking-[0.15em] uppercase text-mid-gray">
                {stage.tagline}
              </span>
            </div>
            <p className="mt-4 font-body text-lg text-mid-gray leading-relaxed max-w-3xl">
              {stage.detail}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mt-20">
            <span className="inline-flex items-center gap-3 font-heading text-[11px] font-semibold tracking-[0.3em] uppercase text-neon">
              <span className="inline-block w-10 h-[2px] bg-neon" aria-hidden />
              proof / before &amp; after
            </span>
            <p className="mt-4 font-body text-lg text-mid-gray max-w-2xl">
              the machine, on camera. real projects: bought distressed,
              rebuilt in-house.
            </p>
            <div className="mt-8 relative aspect-video border border-warm-charcoal bg-dark-surface overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/1209317785?background=1&autoplay=1&loop=1&muted=1&dnt=1"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="before and after: nagda homes projects"
              />
              <a
                href="https://vimeo.com/1209317785"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 bg-true-black/80 text-raw-white font-heading text-xs font-semibold tracking-wide hover:bg-neon hover:text-true-black transition-colors duration-300"
              >
                watch with sound
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
