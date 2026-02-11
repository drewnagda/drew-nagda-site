import Link from "next/link";

const posts = [
  {
    slug: "why-i-moved-to-the-inland-empire",
    title: "why i moved to the inland empire — and what it taught me about building",
    excerpt:
      "in 2016, thalia and i packed up our nyc life and headed to southern california. everyone thought we were crazy. here's what happened next.",
    date: "2026-02-10",
    category: "real estate",
    readTime: "6 min read",
    youtubeId: null as string | null, // replace with actual YouTube video ID
  },
  {
    slug: "compound-effect-of-discipline",
    title: "the compound effect of discipline",
    excerpt:
      "business, fitness, family, investments — they all follow the same law. small daily deposits turn into something nobody can compete with.",
    date: "2026-02-03",
    category: "mindset",
    readTime: "4 min read",
    youtubeId: null as string | null,
  },
  {
    slug: "building-in-public",
    title: "building in public: why transparency wins",
    excerpt:
      "sharing the messy middle — not just the highlight reel. here's why i document the process and what it's done for my business and community.",
    date: "2026-01-27",
    category: "business",
    readTime: "5 min read",
    youtubeId: null as string | null,
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <section className="bg-raw-white min-h-screen pt-28 md:pt-36 pb-24 md:pb-32">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <span className="font-heading text-[11px] font-semibold tracking-[0.25em] uppercase text-neon bg-true-black px-3 py-1.5 inline-block">
            blog
          </span>
          <h1 className="mt-6 font-heading font-light text-4xl md:text-5xl text-stone leading-tight">
            thoughts &amp; lessons
          </h1>
          <p className="mt-4 font-body text-lg text-warm-gray max-w-xl">
            raw reflections on building businesses, real estate investing,
            fitness, family, and the compound effect of staying disciplined.
            each post pairs a youtube video with written notes.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-raw-white border border-light-stone hover:border-stone transition-all duration-500 group overflow-hidden"
            >
              {/* YouTube thumbnail / placeholder */}
              {post.youtubeId ? (
                <div className="aspect-video bg-true-black relative">
                  <img
                    src={`https://img.youtube.com/vi/${post.youtubeId}/maxresdefault.jpg`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-true-black/20 group-hover:bg-true-black/10 transition-colors duration-300">
                    <div className="w-16 h-16 rounded-full bg-true-black/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-7 h-7 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-parchment relative flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 text-light-stone mx-auto mb-3"
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
                    <p className="font-heading text-[10px] font-semibold tracking-[0.2em] uppercase text-light-stone">
                      video coming soon
                    </p>
                  </div>
                </div>
              )}

              {/* Content */}
              <Link href={`/blog/${post.slug}`} className="block p-8 md:p-10">
                {/* Meta row */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-2.5 py-1 bg-parchment text-[10px] font-heading font-semibold tracking-[0.15em] uppercase text-mid-gray">
                    {post.category}
                  </span>
                  <span className="font-body text-sm text-light-stone">
                    {formatDate(post.date)}
                  </span>
                  <span className="font-body text-sm text-light-stone">
                    &middot;
                  </span>
                  <span className="font-body text-sm text-light-stone">
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-heading text-xl md:text-2xl font-medium text-stone leading-snug group-hover:text-neon-dark transition-colors duration-300">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-3 font-body text-base text-warm-gray leading-relaxed max-w-2xl">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <div className="mt-5 flex items-center gap-2">
                  <span className="font-heading text-sm font-medium text-mid-gray group-hover:text-stone transition-colors duration-300">
                    watch &amp; read
                  </span>
                  <svg
                    className="w-4 h-4 text-mid-gray group-hover:text-neon-dark group-hover:translate-x-1 transition-all duration-300"
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
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Coming soon note */}
        <div className="mt-16 text-center">
          <p className="font-body text-sm text-mid-gray">
            more posts coming soon. follow along on{" "}
            <a
              href="https://twitter.com/drewnagda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-neon-dark transition-colors underline underline-offset-2"
            >
              twitter / x
            </a>{" "}
            and{" "}
            <a
              href="https://youtube.com/@drewnagda"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone hover:text-neon-dark transition-colors underline underline-offset-2"
            >
              youtube
            </a>{" "}
            for updates.
          </p>
        </div>
      </div>
    </section>
  );
}
