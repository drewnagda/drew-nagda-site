import ScrollReveal from "./ScrollReveal";

const ventures = [
  {
    name: "nagda homes",
    category: "real estate & investments",
    description:
      "full-service real estate operation spanning property management, sales, and strategic investing. building generational wealth through single-family and multifamily properties in southern california.",
    role: "founder & principal",
    tags: ["property management", "sales", "multifamily", "investing"],
    accent: "bg-neon-dark",
  },
  {
    name: "youtube",
    category: "content & media",
    description:
      "fun videos from interviews with my dad to my own fatherhood journey.",
    role: "creator",
    tags: ["entrepreneurship", "fitness", "real estate", "mindset"],
    accent: "bg-[#FF0000]",
    link: "https://youtube.com/@drewnagda",
  },
  {
    name: "twitter / x",
    category: "community & thought leadership",
    description:
      "stream of consciousness.",
    role: "builder in public",
    tags: ["business", "community", "daily insights"],
    accent: "bg-stone",
    link: "https://twitter.com/drewnagda",
  },
  {
    name: "angel investor",
    category: "investments",
    description:
      "investing in AI, Real Estate, and Consumer Products. Reach out if you want to pitch your company.",
    role: "investor",
    tags: ["AI", "real estate", "consumer products"],
    accent: "bg-neon",
    link: "mailto:drew@drewnagda.com",
  },
];

export default function Ventures() {
  return (
    <section id="ventures" className="bg-parchment py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <ScrollReveal>
          <span className="font-heading text-[11px] font-semibold tracking-[0.25em] uppercase text-neon bg-true-black px-3 py-1.5 inline-block">
            SECTION 03
          </span>
          <h2 className="mt-6 font-heading font-light text-4xl md:text-5xl text-stone leading-tight">
            ventures & platforms
          </h2>
          <p className="mt-4 font-body text-lg text-warm-gray max-w-xl">
            one builder, multiple brands. each venture traces back to the same
            philosophy — build with discipline, measure with data, compound over
            time.
          </p>
        </ScrollReveal>

        {/* Venture Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {ventures.map((venture, i) => (
            <ScrollReveal key={venture.name} delay={i * 0.1}>
              <div className="bg-raw-white border border-light-stone p-8 md:p-10 h-full group hover:border-stone transition-all duration-500 relative overflow-hidden">
                {/* Accent line */}
                <div
                  className={`absolute top-0 left-0 w-full h-[3px] ${venture.accent}`}
                />

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="font-heading text-[10px] font-semibold tracking-[0.2em] uppercase text-mid-gray">
                      {venture.category}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-medium text-stone">
                      {venture.name}
                    </h3>
                  </div>
                  <span className="font-heading text-[10px] font-semibold tracking-[0.15em] uppercase text-light-stone border border-light-stone px-2 py-1">
                    {venture.role}
                  </span>
                </div>

                {/* Description */}
                <p className="font-body text-base text-warm-gray leading-relaxed">
                  {venture.description}
                </p>

                {/* Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {venture.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-parchment text-[11px] font-heading font-medium tracking-wider uppercase text-mid-gray"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link arrow */}
                {venture.link && (
                  <a
                    href={venture.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-medium text-stone hover:text-neon transition-colors duration-300 group/link"
                  >
                    visit
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
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
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
