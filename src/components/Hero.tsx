"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-raw-white overflow-hidden">
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-light-stone) 1px, transparent 1px), linear-gradient(90deg, var(--color-light-stone) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 w-full py-32 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div>
            {/* Label */}
            <div
              className={`transition-all duration-700 delay-200 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <span className="font-heading text-[11px] font-semibold tracking-[0.25em] uppercase text-neon bg-true-black px-3 py-1.5 inline-block">
                family &middot; entrepreneur &middot; father
              </span>
            </div>

            {/* Headline */}
            <h1
              className={`mt-8 font-heading font-light text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-stone transition-all duration-700 delay-400 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Drew
              <br />
              <span className="text-neon-dark">Nagda</span>
            </h1>

            {/* Motto */}
            <p
              className={`mt-6 font-heading text-lg md:text-xl italic text-warm-gray tracking-wide transition-all duration-700 delay-500 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              todo es posible
            </p>

            {/* Subline */}
            <p
              className={`mt-6 font-body text-lg md:text-xl text-warm-gray max-w-md leading-relaxed transition-all duration-700 delay-600 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Family first. Community always. Compounding everything.
            </p>

            {/* CTA */}
            <div
              className={`mt-10 flex items-center gap-6 transition-all duration-700 delay-700 ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <a
                href="#ventures"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-true-black text-white font-heading text-sm font-medium tracking-wide hover:bg-stone transition-colors duration-300"
              >
                explore ventures
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
                href="#about"
                className="font-heading text-sm font-medium text-warm-gray hover:text-stone transition-colors duration-300 relative group"
              >
                learn more
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-neon transition-all duration-300 group-hover:w-full" />
              </a>
            </div>

            {/* Pillar tags */}
            <div
              className={`mt-16 flex flex-wrap gap-3 transition-all duration-700 delay-[900ms] ${
                loaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              {[
                "business",
                "fitness",
                "family",
                "investments",
                "community",
              ].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 border border-light-stone text-[11px] font-heading font-medium tracking-wider uppercase text-mid-gray"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Photo placeholder */}
          <div
            className={`relative transition-all duration-1000 delay-500 ${
              loaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="aspect-[3/4] bg-parchment border border-light-stone relative overflow-hidden">
              <Image
                src="/family-hero.jpg"
                alt="Drew, Thalia, and Ezra Nagda"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Subtle gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-true-black/30 to-transparent" />

              {/* Neon accent corner */}
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
        <span className="font-heading text-[10px] tracking-[0.2em] uppercase text-mid-gray">
          scroll
        </span>
        <div className="w-[1px] h-8 bg-light-stone relative overflow-hidden">
          <div className="w-full h-3 bg-neon animate-bounce" />
        </div>
      </div>
    </section>
  );
}
