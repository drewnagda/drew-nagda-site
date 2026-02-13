import ScrollReveal from "./ScrollReveal";

const connectLinks = [
  {
    label: "youtube",
    handle: "@drewnagda",
    href: "https://youtube.com/@drewnagda",
    description: "raw content on building, real estate, and discipline",
  },
  {
    label: "twitter / x",
    handle: "@drewnagda",
    href: "https://twitter.com/drewnagda",
    description: "daily insights and building in public",
  },
  {
    label: "linkedin",
    handle: "drew nagda",
    href: "https://linkedin.com/in/drewnagda",
    description: "professional network and business inquiries",
  },
];

export default function Connect() {
  return (
    <section id="connect" className="bg-raw-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Left - CTA */}
          <div>
            <ScrollReveal>
              <span className="font-heading text-[11px] font-semibold tracking-[0.25em] uppercase text-neon bg-true-black px-3 py-1.5 inline-block">
                SECTION 04
              </span>
              <h2 className="mt-6 font-heading font-light text-4xl md:text-5xl text-stone leading-tight">
                let&apos;s connect
              </h2>
              <p className="mt-6 font-body text-lg text-warm-gray leading-relaxed max-w-md">
                I work with brands, creators, and builders on projects that
                matter. Have a deal, partnership, or collaboration in mind?
                Reach out&mdash;I&apos;d love to hear about it.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-10">
                <a
                  href="mailto:drew@drewnagda.com"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-true-black text-white font-heading text-sm font-medium tracking-wide hover:bg-stone transition-colors duration-300 group"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  drew@drewnagda.com
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="mt-8 font-body text-sm text-mid-gray">
                for business inquiries, brand partnerships, speaking
                engagements, or collaboration opportunities.
              </p>
            </ScrollReveal>
          </div>

          {/* Right - Social Links */}
          <div>
            <ScrollReveal delay={0.1}>
              <p className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-mid-gray mb-8">
                find me online
              </p>
            </ScrollReveal>

            <div className="space-y-[1px] bg-light-stone">
              {connectLinks.map((link, i) => (
                <ScrollReveal key={link.label} delay={0.15 + i * 0.08}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-6 bg-raw-white hover:bg-parchment transition-colors duration-300 group"
                  >
                    <div>
                      <p className="font-heading text-base font-medium text-stone">
                        {link.label}
                      </p>
                      <p className="mt-1 font-body text-sm text-mid-gray">
                        {link.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="hidden sm:block font-heading text-sm text-light-stone group-hover:text-mid-gray transition-colors">
                        {link.handle}
                      </span>
                      <svg
                        className="w-5 h-5 text-light-stone group-hover:text-neon transition-all duration-300 group-hover:translate-x-1"
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
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
