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
      "born and raised. small-town florida is where the work ethic comes from.",
  },
  {
    city: "bloomington",
    state: "in",
    years: "2006–2010",
    title: "first company",
    story:
      "business management at indiana university — and a tutoring company started on campus. first taste of building something people pay for.",
  },
  {
    city: "manhattan",
    state: "ny",
    years: "2010–2015",
    title: "the startup wave",
    story:
      "five years inside nyc tech at full speed — singleplatform through a $100m acquisition, lean startup machine, rap genius as it became the internet's home for lyrics.",
  },
  {
    city: "brooklyn",
    state: "ny",
    years: "2015–2016",
    title: "last stop east",
    story:
      "one more new york chapter before the biggest decision yet: leaving it all to go west.",
  },
  {
    city: "upland",
    state: "ca",
    years: "2016–2023",
    title: "all in — for the girl",
    story:
      "thalia's family is from the inland empire, so that's where we landed — her dad's spare bedroom, learning real estate from zero. seven years later: 300+ distressed properties and a vertically integrated company.",
  },
  {
    city: "pasadena",
    state: "ca",
    years: "2023–now",
    title: "home",
    story:
      "where we live with our son ezra, who made me a dad in 2024. the next decade gets built from here.",
  },
];

export default function Journey() {
  const [active, setActive] = useState(stops.length - 1);
  const stop = stops[active];

  return (
    <section id="journey" className="bg-raw-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal>
          <span className="font-heading text-[11px] font-semibold tracking-[0.25em] uppercase text-neon bg-true-black px-3 py-1.5 inline-block">
            SECTION 03
          </span>
          <h2 className="mt-6 font-heading font-light text-4xl md:text-5xl text-stone leading-tight">
            the journey
          </h2>
          <p className="mt-4 font-body text-lg text-warm-gray max-w-xl">
            six stops, ocala to pasadena — the long way. tap a pin.
          </p>
        </ScrollReveal>

        {/* Desktop route */}
        <ScrollReveal delay={0.15} className="hidden md:block">
          <div className="mt-20 relative">
            <div className="absolute left-8 right-8 top-[13px] border-t-2 border-dashed border-light-stone" />
            <div className="grid grid-cols-6 relative">
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
