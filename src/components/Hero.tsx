"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const stats = [
  { end: 300, suffix: "+", label: "properties", accent: true },
  { end: 5, suffix: "", label: "cities lived", accent: false },
  { end: 1, suffix: "", label: "family", accent: false },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let frame: number;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-true-black overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-warm-gray) 1px, transparent 1px), linear-gradient(90deg, var(--color-warm-gray) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full py-32 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            <div
              className={`transition-all duration-700 delay-200 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-flex items-center gap-3 font-heading text-[11px] font-semibold tracking-[0.3em] uppercase text-neon">
                <span
                  className="inline-block w-10 h-[2px] bg-neon"
                  aria-hidden
                />
                family &middot; entrepreneur &middot; father
              </span>
            </div>

            <h1
              className={`mt-8 font-heading font-extrabold text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-raw-white transition-all duration-700 delay-400 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              drew
              <br />
              nagda
            </h1>

            <p
              className={`mt-8 font-heading text-lg md:text-xl text-neon tracking-wide transition-all duration-700 delay-500 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              todo es posible
            </p>

            <p
              className={`mt-5 font-body text-lg md:text-xl text-mid-gray max-w-md leading-relaxed transition-all duration-700 delay-600 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              started in a spare bedroom in the inland empire. now a
              vertically integrated real estate operation.
            </p>

            <div
              className={`mt-10 flex items-center gap-6 transition-all duration-700 delay-700 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href="#machine"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-neon text-true-black font-heading text-sm font-semibold tracking-wide hover:bg-neon-soft transition-colors duration-300"
              >
                see the machine
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#journey"
                className="font-heading text-sm font-medium text-mid-gray hover:text-raw-white transition-colors duration-300 relative group"
              >
                the journey
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-neon transition-all duration-300 group-hover:w-full" />
              </a>
            </div>

            {/* Stats */}
            <div
              className={`mt-16 flex gap-10 md:gap-14 border-t border-warm-charcoal pt-8 transition-all duration-700 delay-[900ms] ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p
                    className={`font-heading text-3xl md:text-4xl font-bold ${
                      s.accent ? "text-neon" : "text-raw-white"
                    }`}
                  >
                    {loaded ? <CountUp end={s.end} suffix={s.suffix} /> : 0}
                  </p>
                  <p className="mt-1 font-heading text-[10px] font-semibold tracking-[0.2em] uppercase text-warm-gray">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="aspect-[3/4] bg-warm-charcoal border border-warm-charcoal relative overflow-hidden">
              <Image
                src="/family-hero.jpg"
                alt="Drew, Thalia, and Ezra Nagda"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-true-black/50 to-transparent" />
              <div className="absolute top-0 right-0 w-16 h-[2px] bg-neon" />
              <div className="absolute top-0 right-0 w-[2px] h-16 bg-neon" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-[1200ms] ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-warm-gray">
          scroll
        </span>
        <div className="w-[1px] h-8 bg-warm-charcoal relative overflow-hidden">
          <div className="w-full h-3 bg-neon animate-bounce" />
        </div>
      </div>
    </section>
  );
}
