import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="bg-raw-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <ScrollReveal>
          <span className="font-heading text-[11px] font-semibold tracking-[0.25em] uppercase text-neon bg-true-black px-3 py-1.5 inline-block">
            SECTION 01
          </span>
          <h2 className="mt-6 font-heading font-light text-4xl md:text-5xl text-stone leading-tight">
            about drew
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Main copy */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.1}>
              <p className="font-body text-lg md:text-xl text-warm-gray leading-relaxed">
                drew nagda is a builder. he spent a decade in the technology
                space, most notably as an early team member at SinglePlatform
                (acquired for $100M) and Rap Genius (now Genius) — which became
                the largest lyrics website on the internet and a cultural
                phenomenon. that chapter taught him how startups scale, how
                communities form, and how relentless execution turns ideas into
                institutions.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 font-body text-lg md:text-xl text-warm-gray leading-relaxed">
                in 2016, drew and his wife thalia moved to the inland empire,
                california and bet on real estate. over the past 10 years and
                counting, they&apos;ve grown their team and built a portfolio of
                single-family and multifamily properties — brick by brick,
                deal by deal. they became deeply involved in their community,
                giving back through youth sports and local leadership.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="mt-8 font-body text-lg md:text-xl text-warm-gray leading-relaxed">
                now based in pasadena with their son ezra, drew and thalia
                continue to build — in business, in community, and as a family.
                for drew, it&apos;s all about community, family, and compounding.
              </p>
            </ScrollReveal>
          </div>

          {/* Stats sidebar */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="bg-parchment border border-light-stone p-8 md:p-10">
                <p className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-neon-dark mb-8">
                  at a glance
                </p>

                <div className="space-y-6">
                  {[
                    { label: "location", value: "pasadena, ca" },
                    { label: "background", value: "tech → real estate" },
                    { label: "notable", value: "SinglePlatform, Genius" },
                    { label: "focus", value: "real estate & community" },
                    { label: "philosophy", value: "todo es posible" },
                    { label: "family", value: "ezra & thalia" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="border-b border-light-stone pb-4 last:border-0 last:pb-0"
                    >
                      <p className="font-heading text-[10px] font-semibold tracking-[0.2em] uppercase text-mid-gray">
                        {item.label}
                      </p>
                      <p className="mt-1 font-body text-base text-stone">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
