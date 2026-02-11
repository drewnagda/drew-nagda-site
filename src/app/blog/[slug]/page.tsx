import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<
  string,
  {
    title: string;
    date: string;
    category: string;
    readTime: string;
    youtubeId: string | null;
    content: string[];
  }
> = {
  "why-i-moved-to-the-inland-empire": {
    title:
      "why i moved to the inland empire — and what it taught me about building",
    date: "2026-02-10",
    category: "real estate",
    readTime: "6 min read",
    youtubeId: null,
    content: [
      "in 2016, thalia and i made a decision that confused just about everyone we knew. we left new york city — where i'd spent a decade building a career in tech — and moved to the inland empire in southern california.",
      "the math was simple, even if the decision felt radical. new york was a world-class city, but the cost of living was eating into everything we earned. i'd been part of two meaningful tech runs — singleplatform, which sold to tripadvisor for $100 million, and rap genius (now genius), which became a cultural force. i'd seen what was possible when you build something real. but i wanted to build on my own terms.",
      "southern california offered something new york couldn't: affordable real estate with room to grow. the inland empire was — and still is — one of the most undervalued markets in the state. we saw an opportunity to plant roots, build a portfolio, and create generational wealth through property.",
      "the first few years were about learning the game. property management, tenant relationships, rehabs, deal analysis — all of it from the ground up. no shortcuts, no inherited portfolio. just discipline and repetition.",
      "fast forward to today: we've built a portfolio spanning single-family and multifamily properties across southern california. nagda homes handles property management, sales, and strategic investing. and the philosophy hasn't changed — build with discipline, measure with data, compound over time.",
      "the biggest lesson from that move? the best time to bet on yourself is when no one else would. the inland empire taught me that growth doesn't always look glamorous. sometimes it looks like a 4am property inspection or a weekend spent running comps. but those small deposits compound into something no one can take from you.",
      "todo es posible — if you're willing to do the work.",
    ],
  },
  "compound-effect-of-discipline": {
    title: "the compound effect of discipline",
    date: "2026-02-03",
    category: "mindset",
    readTime: "4 min read",
    youtubeId: null,
    content: [
      "everyone talks about compound interest in finance. but the real compound effect happens in your daily habits — and most people never see the payoff because they quit too early.",
      "here's what i've learned across business, fitness, family, and investments: the same law governs all of them. small, consistent deposits — made daily, without drama — create outcomes that look like overnight success from the outside.",
      "in real estate, it means evaluating one more deal per week. over a year, that's 50+ more opportunities you've analyzed than the person who only looks when they feel motivated.",
      "in fitness, it means showing up to the gym even when you don't feel like it. especially when you don't feel like it. the days you drag yourself there are the days that separate you from everyone else.",
      "in family, it means being present. not distracted-present, but fully there. those moments with thalia and ezra don't come back. they compound too — into trust, connection, and a foundation that makes everything else possible.",
      "the compound effect isn't exciting. it's boring. it's repetitive. and that's exactly why it works — because most people can't tolerate boring long enough to see the results.",
      "build. compound. repeat. that's the whole strategy.",
    ],
  },
  "building-in-public": {
    title: "building in public: why transparency wins",
    date: "2026-01-27",
    category: "business",
    readTime: "5 min read",
    youtubeId: null,
    content: [
      "when i started sharing my journey on youtube and twitter, people asked why. why show the messy middle? why share the numbers? why not just build quietly?",
      "the answer is simple: transparency creates accountability, and accountability accelerates growth.",
      "when you share your process publicly — the wins and the losses — you create a feedback loop that's impossible to get any other way. your audience becomes your board of advisors, your accountability partners, and your community all at once.",
      "i've seen this play out in real time. sharing our real estate journey on youtube has connected me with other builders who share the same philosophy. some became business partners. some became friends. all of them pushed me to be sharper, more honest, and more disciplined.",
      "there's also a practical side: building in public is the best marketing you can do. when people see the real work — not the highlight reel — they trust you differently. that trust translates into business opportunities, partnerships, and a brand that actually means something.",
      "the key is authenticity. not the instagram version of authenticity where everything is curated and filtered. real authenticity — where you share the 4am mornings, the deals that fell through, the workouts you didn't want to do but did anyway.",
      "if you're building something meaningful, consider documenting the process. not for the likes, but for the compound effect of putting your work into the world consistently. the people who resonate with your story are exactly the people you want in your corner.",
    ],
  },
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-raw-white min-h-screen pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-heading text-sm font-medium text-mid-gray hover:text-stone transition-colors duration-300 mb-12 group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          back to blog
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="px-2.5 py-1 bg-parchment text-[10px] font-heading font-semibold tracking-[0.15em] uppercase text-mid-gray">
            {post.category}
          </span>
          <span className="font-body text-sm text-light-stone">
            {formatDate(post.date)}
          </span>
          <span className="font-body text-sm text-light-stone">&middot;</span>
          <span className="font-body text-sm text-light-stone">
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-heading font-light text-3xl md:text-4xl lg:text-5xl text-stone leading-tight mb-10">
          {post.title}
        </h1>

        {/* YouTube Video Embed */}
        {post.youtubeId ? (
          <div className="aspect-video mb-12 bg-true-black border border-light-stone overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${post.youtubeId}`}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="aspect-video mb-12 bg-parchment border border-light-stone flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-light-stone mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                />
              </svg>
              <p className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-light-stone">
                video coming soon
              </p>
              <p className="mt-2 font-body text-sm text-mid-gray">
                subscribe on{" "}
                <a
                  href="https://youtube.com/@drewnagda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone hover:text-neon-dark underline underline-offset-2 transition-colors"
                >
                  youtube
                </a>{" "}
                to get notified
              </p>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="w-16 h-[2px] bg-neon mb-12" />

        {/* Written Content */}
        <div className="space-y-6">
          {post.content.map((paragraph, i) => (
            <p
              key={i}
              className="font-body text-lg text-warm-gray leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-12 border-t border-light-stone">
          <p className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-mid-gray mb-4">
            keep building
          </p>
          <div className="flex flex-wrap gap-6">
            <a
              href="https://twitter.com/drewnagda"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-sm font-medium text-stone hover:text-neon-dark transition-colors duration-300"
            >
              follow on twitter / x &rarr;
            </a>
            <a
              href="https://youtube.com/@drewnagda"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-sm font-medium text-stone hover:text-neon-dark transition-colors duration-300"
            >
              subscribe on youtube &rarr;
            </a>
            <a
              href="mailto:drew@drewnagda.com"
              className="font-heading text-sm font-medium text-stone hover:text-neon-dark transition-colors duration-300"
            >
              get in touch &rarr;
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
