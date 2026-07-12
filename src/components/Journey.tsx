"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

const stops = [
  {
    city: "ocala",
    state: "fl",
    years: "the beginning",
    title: "roots",
    story:
      "born and raised in small-town florida. the work ethic, the loyalty, the todo es posible: it all starts here.",
  },
  {
    city: "bloomington",
    state: "in",
    years: "2006–2010",
    title: "first company",
    story:
      "four years of business school at indiana. the real education was the tutoring company i started on campus: first customers, first hires, first taste of building.",
  },
  {
    city: "manhattan",
    state: "ny",
    years: "2010–2016",
    title: "the startup wave",
    story:
      "six years riding nyc tech at full speed. singleplatform from early team to a $100m exit, lean startup machine, rap genius while it became the internet's home for lyrics. i watched companies scale from the inside and took notes.",
  },
  {
    city: "upland",
    state: "ca",
    years: "2016–2023",
    title: "all in for the girl",
    story:
      "moved west for thalia. her family is from the inland empire, so we landed in her dad's spare bedroom and learned real estate from absolute zero. seven years later: 300+ distressed homes rebuilt and a company that does everything in-house.",
  },
  {
    city: "pasadena",
    state: "ca",
    years: "2023–now",
    title: "home",
    story:
      "home base with thalia and ezra, who made me a dad in 2024. the machine runs east of here. the reason for it lives in this house.",
  },
];

export default function Journey() {
  const [active, setActive] = useState(stops.length - 1);
  const stop = stops[active];

  return (
    <section id="journey" className="bg-raw-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal>
          <span className="inline-flex items-center gap-3 font-heading text-[11px] font-semibold tracking-[0.3em] uppercase text-neon-dark">
            <span className="inline-block w-10 h-[2px] bg-neon" aria-hidden />
            03 / the journey
          </span>
          <h2 className="mt-6 font-heading font-light text-4xl md:text-5xl text-stone leading-tight">
            the journey
          </h2>
          <p className="mt-4 font-body text-lg text-warm-gray max-w-xl">
            five stops, ocala to pasadena, the long way. tap a pin.
          </p>
        </ScrollReveal>

        {/* Desktop route */}
        <ScrollReveal delay={0.15} className="hidden md:block">
          <div className="mt-20 relative">
            <div className="absolute left-8 right-8 top-[13px] border-t-2 border-dashed border-light-stone" />
            <div className="grid grid-cols-5 relative">
              {stops.map((s, i) => (
                <button
                  key={s.city}
                  onClick={() => setActive(i)}
                  className="flex flex-col items-center gap-3 group"
                >
                  <span
                    className={`w-7 h-7 rounded-full border-2 z-10 transition-all duration-300 ${
                      active === i
                        ? "bg-neon border-stone scale-110"
                        : "bg-raw-white border-light-stone group-hover:border-stone"
                    }`}
                  />
                  <span className="font-heading text-xs font-semibold tracking-[0.15em] uppercase text-stone">
                    {s.city}
                  </span>
                  <span className="font-heading text-[10px] font-medium tracking-wider text-mid-gray -mt-2">
                    {s.years}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-12 bg-parchment border border-light-stone p-8 md:p-10">
              <p className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-neon-dark">
                {stop.title}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-medium text-stone">
                {stop.city}, {stop.state}
                <span className="ml-3 font-heading text-sm font-medium text-mid-gray">
                  {stop.years}
                </span>
              </h3>
              <p className="mt-4 font-body text-lg text-warm-gray leading-relaxed max-w-3xl">
                {stop.story}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile timeline */}
        <div className="md:hidden mt-12">
          <div className="border-l-2 border-dashed border-light-stone ml-3 pl-8 space-y-10">
            {stops.map((s) => (
              <ScrollReveal key={s.city}>
                <div className="relative">
                  <span className="absolute -left-[42px] top-1 w-4 h-4 rounded-full bg-neon border-2 border-stone" />
                  <p className="font-heading text-[10px] font-semibold tracking-[0.2em] uppercase text-neon-dark">
                    {s.title}
                  </p>
                  <h3 className="mt-1 font-heading text-lg font-medium text-stone">
                    {s.city}, {s.state}
                    <span className="ml-2 text-xs text-mid-gray">{s.years}</span>
                  </h3>
                  <p className="mt-2 font-body text-base text-warm-gray leading-relaxed">
                    {s.story}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
