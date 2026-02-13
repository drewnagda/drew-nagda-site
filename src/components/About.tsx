import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="about" className="bg-raw-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal>
          <span className="font-heading text-[11px] font-semibold tracking-[0.25em] uppercase text-neon bg-true-black px-3 py-1.5 inline-block">
            SECTION 01
          </span>
          <h2 className="mt-6 font-heading font-light text-4xl md:text-5xl text-stone leading-tight">
            about drew
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.1}>
              <p className="font-body text-lg md:text-xl text-warm-gray leading-relaxed">
                I&apos;m Drew Nagda — husband, father, builder, connector.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p className="mt-8 font-body text-lg md:text-xl text-warm-gray leading-relaxed">
                I spent a decade in tech — first as an early team member at
                SinglePlatform (acquired for $100M), Lean Startup Machine, and
                then at Rap Genius (now Genius), which grew into the largest
                lyrics site on the internet. Those years taught me how to scale
                startups, build large online communities, and what relentless
                execution actually looks like up close.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 font-body text-lg md:text-xl text-warm-gray leading-relaxed">
                In 2016, my wife Thalia and I moved to the Inland Empire,
                California and went all-in on real estate. Over the past ten
                years, we&apos;ve built a portfolio of single-family and
                multifamily properties, grown our team, and put down real roots.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className="mt-8 font-body text-lg md:text-xl text-warm-gray leading-relaxed">
                We&apos;re now based in Pasadena with our son Ezra. Still
                building. Still compounding.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="mt-8 font-body text-lg md:text-xl font-semibold text-stone leading-relaxed">
                Family and Loyalty over Everything.
              </p>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="bg-parchment border border-light-stone p-8 md:p-10">
                <p className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-neon-dark mb-8">
                  at a glance
                </p>
                <div className="space-y-6">
                  {[
                    { label: "location", value: "pasadena, ca" },
                    { label: "background", value: "tech \u2192 real estate" },
                    { label: "notable", value: "SinglePlatform, Genius" },
                    { label: "focus", value: "real estate & community" },
                    { label: "philosophy", value: "todo es posible" },
                    { label: "family", value: "ezra & thalia" },
                  ].map((item) => (
                    <div key={item.label} className="border-b border-light-stone pb-4 last:border-0 last:pb-0">
                      <p className="font-heading text-[10px] font-semibold tracking-[0.2em] uppercase text-mid-gray">{item.label}</p>
                      <p className="mt-1 font-body text-base text-stone">{item.value}</p>
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
