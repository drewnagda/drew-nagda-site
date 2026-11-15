import Image from "next/image";
import Link from "next/link";
import BeforeAfter from "@/components/BeforeAfter";
import Greeting from "@/components/Greeting";
import { homePageSchema, faq } from "@/lib/schema";
import { PROPERTY_MAILTO, HELLO_MAILTO, EMAIL, SOCIALS } from "@/lib/site";

const proof = [
  { name: "Nagda Homes", note: "300+ homes, founder", href: "#nagda-homes" },
  { name: "SinglePlatform", note: "Early employee, sold for $100M" },
  { name: "Rap Genius", note: "Early team, executive editor" },
  { name: "Techstars", note: "2013" },
  { name: "Rancho Humilde", note: "Special projects" },
];

const stages = [
  ["Acquisition", "Direct from the owner. Fire-damaged, probate, and the houses nobody else will touch. We close fast, as-is."],
  ["Construction", "Our own crews. Heavy value add, ADU development, fire-damage restoration. No general contractor markup."],
  ["Design", "Planned in-house, room by room, for the family who will live in it."],
  ["Sales", "The team that rebuilt the home is the team that sells it. Licensed, no handoffs."],
  ["Property management", "We treat tenants like customers, because they are. Happy tenants stay."],
];

const building = [
  {
    name: "Puro Raza",
    url: "https://puroraza.com",
    host: "puroraza.com",
    img: "/build-puroraza.jpg",
    line: "What the songs really say. Corridos, banda and norteño lyrics explained line by line, in Spanish and English.",
  },
  {
    name: "Fountain of Youth",
    url: "https://ratemyfountain.com",
    host: "ratemyfountain.com",
    img: "/build-fountain.jpg",
    line: "Dead serious water fountain reviews. Every rating is secretly a life lesson.",
  },
  {
    name: "World Cup Eats",
    url: "https://worldcupeats.com",
    host: "worldcupeats.com",
    img: "/build-wce.jpg",
    line: "Ezra and me, eating at an LA restaurant for every country in the 2026 World Cup.",
  },
];

const places = [
  ["Ocala, FL", "Born and raised"],
  ["Bloomington, IN", "Indiana University, B-Town Tutors"],
  ["New York City", "2010 to 2016, tech"],
  ["Upland, CA", "2016 to 2023, Nagda Homes"],
  ["Pasadena, CA", "Home, with Thalia and Ezra"],
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />

      {/* 1. The hook */}
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <Greeting />
          <div className="hero-id">
            <Image
              src="/drew-hero-2026.jpg"
              alt="Drew Nagda"
              width={112}
              height={112}
              className="avatar"
              priority
              sizes="56px"
            />
            <div>
              <h1 id="hero-title">Drew Nagda</h1>
              <p className="role">Distressed real estate developer. Pasadena, California.</p>
            </div>
          </div>
          <p className="big-proof">
            <span className="num">300+</span>
            <span className="num-label">homes bought, rebuilt and sold across Southern California.</span>
          </p>
          <div className="hero-actions">
            <a className="btn" href={PROPERTY_MAILTO}>
              Got a distressed property? Send it <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="hero-media">
          <BeforeAfter
            before="/ba-kitchen-before.jpg"
            after="/ba-kitchen-after.jpg"
            alt="a gutted kitchen rebuilt by Nagda Homes"
            width={880}
            height={1100}
          />
        </div>
      </section>

      {/* 2. Proof strip */}
      <section className="wrap proof" aria-label="Track record">
        <ul className="proof-list">
          {proof.map((p) => (
            <li key={p.name}>
              <strong>{p.name}</strong>
              <span>{p.note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. The magic: World Cup Eats */}
      <section className="wrap sec wce" id="world-cup-eats" aria-labelledby="wce-title">
        <div className="sec-head">
          <p className="kicker">Father and son</p>
          <h2 id="wce-title">Every country in the World Cup, one LA restaurant at a time.</h2>
          <p className="lede">
            Ezra and I host <a href="https://worldcupeats.com" target="_blank" rel="noopener">World Cup Eats</a>.
            He tries everything on the table and doesn&apos;t need an iPad at a restaurant. Tap a flag to open an episode.
          </p>
        </div>
        <div className="frame map">
          <iframe
            src="https://www.worldcupeats.com/?tab=map"
            title="World Cup Eats LA: the interactive map"
            loading="lazy"
          />
        </div>
        <a className="text-link" href="https://worldcupeats.com" target="_blank" rel="noopener">Open the full map →</a>
      </section>

      {/* 4. More before and after */}
      <section className="wrap sec reel" id="nagda-homes" aria-labelledby="reel-title">
        <div className="reel-grid">
          <div className="sec-head">
            <p className="kicker">Nagda Homes</p>
            <h2 id="reel-title">More before and after.</h2>
            <p className="lede">
              Since 2016 we&apos;ve bought the houses nobody else will touch and rebuilt them ourselves.
              Every stage happens in-house.
            </p>
            <ol className="stages">
              {stages.map(([t, d], i) => (
                <li key={t}>
                  <span className="stage-n">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{t}</strong>
                    <p>{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="frame vert">
            <iframe
              src="https://player.vimeo.com/video/1209317785?background=1&autoplay=1&loop=1&muted=1&dnt=1"
              title="Before and after: Nagda Homes projects"
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
            />
            <a className="frame-tag" href="https://vimeo.com/1209317785" target="_blank" rel="noopener">Watch with sound</a>
          </div>
        </div>
      </section>

      {/* 5. Short story */}
      <section className="wrap sec story" aria-labelledby="story-title">
        <div className="story-grid">
          <div>
            <p className="kicker">The short version</p>
            <h2 id="story-title">From a spare bedroom to 300+ homes.</h2>
            <p>
              I spent six years in New York tech, joining things early: SinglePlatform, which sold to Constant
              Contact for $100 million, and Rap Genius, as an early team member and executive editor. At Lean
              Startup Machine I ran partnerships and helped scale the workshops to 6 continents. Techstars in 2013.
            </p>
            <p>
              In 2016 we bought one distressed property, working out of Thalia&apos;s dad&apos;s spare bedroom in the
              Inland Empire. That became <strong>Nagda Homes</strong>. I build it hand in hand with Thalia, a licensed
              agent and property manager, so the people who buy or rent from us get the same care we put into the build.
            </p>
            <p>
              Born and raised in Ocala, Florida. Indiana University. Now Pasadena, with Thalia and Ezra, who made me a
              dad in 2024. Family and loyalty over everything.
            </p>
            <p className="motto">Todo es posible.</p>
            <Link className="text-link" href="/about">Full bio and press kit →</Link>
          </div>
          <figure className="family">
            <Image
              src="/family-hero.jpg"
              alt="Drew Nagda with his wife Thalia and son Ezra in Pasadena"
              width={1100}
              height={1650}
              sizes="(max-width: 860px) 100vw, 420px"
            />
            <figcaption>Thalia, Ezra, and me. Pasadena.</figcaption>
          </figure>
        </div>
      </section>

      {/* 6. Things I'm building */}
      <section className="wrap sec" id="building" aria-labelledby="building-title">
        <p className="kicker">Off the clock</p>
        <h2 id="building-title">Things I&apos;m building.</h2>
        <ul className="build">
          {building.map((b) => (
            <li key={b.name}>
              <a href={b.url} target="_blank" rel="noopener" className="build-card">
                <Image src={b.img} alt="" width={720} height={378} sizes="(max-width: 860px) 100vw, 360px" />
                <span className="build-body">
                  <strong>{b.name}</strong>
                  <span>{b.line}</span>
                  <span className="host">{b.host} ↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Places */}
      <section className="wrap sec places" aria-labelledby="places-title">
        <p className="kicker">Places</p>
        <h2 id="places-title" className="sr-only">Places</h2>
        <ol className="places-list">
          {places.map(([p, d]) => (
            <li key={p}>
              <strong>{p}</strong>
              <span>{d}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* 8. FAQ */}
      <section className="wrap sec faq" aria-labelledby="faq-title">
        <p className="kicker">Questions people ask</p>
        <h2 id="faq-title" className="sr-only">Questions people ask</h2>
        {faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      {/* 9. The ask */}
      <section className="wrap sec ask" aria-labelledby="ask-title">
        <h2 id="ask-title">Got a distressed property?</h2>
        <p className="lede">
          Fire-damaged, probate, vacant, the one nobody else will touch. Southern California. Send me the address and a
          few photos. Direct from the owner, as-is.
        </p>
        <a className="btn btn-big" href={PROPERTY_MAILTO}>
          Send it <span aria-hidden="true">→</span>
        </a>
        <p className="ask-alt">
          Building something? <a href={HELLO_MAILTO}>{EMAIL}</a>
          {SOCIALS.map((s) => (
            <span key={s.label}>
              {" · "}
              <a href={s.href} rel="me noopener" target="_blank">{s.label}</a>
            </span>
          ))}
        </p>
      </section>
    </>
  );
}
