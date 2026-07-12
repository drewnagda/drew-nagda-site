import ScrollReveal from "./ScrollReveal";

export default function WorldCupEats() {
  return (
    <section id="worldcupeats" className="bg-true-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal>
          <span className="inline-flex items-center gap-3 font-heading text-[11px] font-semibold tracking-[0.3em] uppercase text-neon">
            <span className="inline-block w-10 h-[2px] bg-neon" aria-hidden />
            04 / world cup eats
          </span>
          <h2 className="mt-6 font-heading font-light text-4xl md:text-5xl text-raw-white leading-tight">
            eating the world cup, with my son
          </h2>
          <p className="mt-4 font-body text-lg text-mid-gray max-w-2xl">
            the 2026 world cup is in north america. ezra and i are eating all
            of it: one country, one la restaurant at a time. four months of
            filming and counting. every episode lands as a flag on the map.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mt-12 relative border border-warm-charcoal bg-soft-black">
            <iframe
              src="https://www.worldcupeats.com"
              className="w-full h-[70vh] min-h-[480px]"
              loading="lazy"
              title="world cup eats la: the interactive map"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="font-body text-sm text-warm-gray">
              tap a flag pin to open an episode. neon rings are filmed, gray
              ones are next.
            </p>
            <a
              href="https://worldcupeats.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neon text-true-black font-heading text-sm font-semibold tracking-wide hover:bg-neon-soft transition-colors duration-300"
            >
              open the full site
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
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
