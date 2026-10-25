import type { Metadata } from "next";
import Image from "next/image";
import { aboutPageSchema } from "@/lib/schema";
import { PROPERTY_MAILTO, HELLO_MAILTO, EMAIL } from "@/lib/site";

const SHORT = "Drew Nagda is a distressed real estate developer, investor, and technologist in Pasadena, California, and the founder of Nagda Homes, which has bought, rebuilt, and sold more than 300 homes across Southern California. He was previously at SinglePlatform, Rap Genius, Lean Startup Machine, and Techstars.";

export const metadata: Metadata = {
  title: "About",
  description: SHORT,
  alternates: { canonical: "https://www.drewnagda.com/about" },
  openGraph: {
    title: "About Drew Nagda",
    description: SHORT,
    url: "https://www.drewnagda.com/about",
    type: "profile",
  },
};

const FULL = "Drew Nagda is a distressed real estate developer, investor, and technologist based in Pasadena, California. He is the founder of Nagda Homes, a vertically integrated real estate company that has bought, rebuilt, and sold more than 300 homes across Southern California since 2016, handling acquisition, construction, design, sales, and property management in-house. The company focuses on heavy value add, ADU development, and fire-damage restoration; his wife Thalia Nagda is a licensed agent and property manager. Before real estate he spent six years in New York City tech: early employee at SinglePlatform, which sold to Constant Contact for $100 million; early team member and executive editor at Rap Genius; partnerships at Lean Startup Machine, where he helped scale the workshops to 6 continents; Techstars 2013; and special projects for Rancho Humilde, the independent label that helped bring corridos tumbados to the mainstream. He participated in On Deck NYC and is an angel investor. He recently co-hosted the Latino Entrepreneur Summit. He hosts World Cup Eats, a father-son food series, with his son Ezra, and is building Puro Raza and Fountain of Youth. He was born and raised in Ocala, Florida, and studied business at Indiana University, where he started his first company, B-Town Tutors. He lives in Pasadena with his wife Thalia and their son Ezra.";
const MEDIUM = "Drew Nagda is a distressed real estate developer, investor, and technologist based in Pasadena, California. He is the founder of Nagda Homes, a vertically integrated real estate company that has bought, rebuilt, and sold more than 300 homes across Southern California since 2016, with a focus on heavy value add, ADU development, and fire-damage restoration. Before real estate he spent six years in New York City tech: early employee at SinglePlatform, which sold to Constant Contact for $100 million; early team member and executive editor at Rap Genius; partnerships at Lean Startup Machine, helping scale the workshops to 6 continents; Techstars 2013. He participated in On Deck NYC, is an angel investor, and recently co-hosted the Latino Entrepreneur Summit.";

const facts: [string, string][] = [
 [
  "Name",
  "Drew Nagda"
 ],
 [
  "Title",
  "Founder, Nagda Homes"
 ],
 [
  "Descriptor",
  "Distressed real estate developer, investor, technologist"
 ],
 [
  "Based",
  "Pasadena, California"
 ],
 [
  "From",
  "Ocala, Florida"
 ],
 [
  "Education",
  "Indiana University. First company there: B-Town Tutors"
 ],
 [
  "Company",
  "Nagda Homes, founded 2016"
 ],
 [
  "Track record",
  "More than 300 homes bought, rebuilt, and sold across Southern California"
 ],
 [
  "Focus",
  "Heavy value add, ADU development, fire-damage restoration"
 ],
 [
  "Previously",
  "SinglePlatform (early employee; sold to Constant Contact for $100M), Rap Genius (early team, executive editor), Lean Startup Machine (ran partnerships, helped scale the workshops to 6 continents), Techstars 2013, Rancho Humilde (special projects)"
 ],
 [
  "Community",
  "Participated in On Deck NYC"
 ],
 [
  "Speaking",
  "Co-host, Latino Entrepreneur Summit"
 ],
 [
  "Projects",
  "World Cup Eats, with his son Ezra. Puro Raza (puroraza.com). Fountain of Youth (ratemyfountain.com)"
 ],
 [
  "Family",
  "Wife Thalia Nagda, son Ezra Nagda"
 ],
 [
  "Contact",
  "drew@drewnagda.com"
 ]
];

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <section className="wrap sec about-top">
        <p className="kicker">About</p>
        <h1>About Drew Nagda</h1>
        <p className="lede">
          Distressed real estate developer, investor, technologist. Founder of Nagda Homes. The definitive bio, for press,
          events, and anyone who needs the facts in one place.
        </p>
        <figure className="about-photo">
          <Image src="/drew-hero-2026.jpg" alt="Drew Nagda" width={1140} height={1000} sizes="(max-width: 860px) 100vw, 560px" priority />
          <figcaption>Drew Nagda. Pasadena, California.</figcaption>
        </figure>
      </section>

      <section className="wrap sec bios">
        <h2>Full bio</h2>
        <p>{FULL}</p>
        <h2>Medium bio</h2>
        <p>{MEDIUM}</p>
        <h2>Short bio</h2>
        <p>{SHORT}</p>
      </section>

      <section className="wrap sec">
        <h2>Facts</h2>
        <dl className="facts">
          {facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap sec">
        <h2>Press and events</h2>
        <p>
          Use any bio above verbatim. Headshot: <a href="/drew-hero-2026.jpg" download>download</a>. Speaking photo:{" "}
          <a href="/drew-nagda-latino-entrepreneur-summit.jpg" download>download</a>. For an interview or a panel, email{" "}
          <a href={HELLO_MAILTO}>{EMAIL}</a>.
        </p>
        <p>
          <a className="btn" href={PROPERTY_MAILTO}>Got a distressed property? Send it <span aria-hidden="true">→</span></a>
        </p>
      </section>
    </>
  );
}
