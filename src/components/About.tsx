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
                drew nagda is a builder. across real estate, health technology,
                and community leadership, he operates with one philosophy:
                discipline compounds. every venture, every workout, every
                relationship is a construction project — built with intention,
                measured with data, and sustained with consistency.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-8 font-body text-lg md:text-xl text-warm-gray leading-relaxed">
                based in pasadena, california, drew leads multiple businesses
                while prioritizing family with his son ezra and wife thalia.
                his approach rejects the myth that you have to choose between
                ambition and presence. you can build an empire and be home for
                dinner.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="mt-8 font-body text-lg md:text-xl text-warm-gray leading-relaxed">
                through recovery work, mentorship, and community investment in
                the san gabriel valley, drew proves that real success is
                measured by who you bring with you.
              </p>
            </ScrollReveal>
          </div>

          {/* Stats sidebar */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="bg-parchment border border-light-stone p-8 md:p-10">
                <p className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-neon mb-8">
                  at a glance
                </p>

                <div className="space-y-6">
                  {[
                    { label: "location", value: "pasadena, ca" },
                    { label: "focus", value: "real estate, health, tech" },
                    { label: "philosophy", value: "discipline compounds" },
                    { label: "family", value: "ezra & thalia" },
                    { label: "community", value: "san gabriel valley" },
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
