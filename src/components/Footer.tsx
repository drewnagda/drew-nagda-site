const pillarLinks = [
  "business",
  "fitness",
  "family",
  "investments",
  "community",
];

const socialLinks = [
  { label: "youtube", href: "https://youtube.com/@drewnagda" },
  { label: "twitter / x", href: "https://twitter.com/drewnagda" },
  { label: "linkedin", href: "https://linkedin.com/in/drewnagda" },
  { label: "blog", href: "/blog" },
];

export default function Footer() {
  return (
    <footer className="bg-true-black text-white">
      {/* Neon accent line */}
      <div className="h-[2px] bg-neon" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Monogram & tagline */}
          <div>
            <div className="flex items-center justify-center w-14 h-14 border-2 border-neon mb-6">
              <span className="font-heading font-bold text-lg text-white">
                dn
              </span>
            </div>
            <p className="font-heading text-sm text-mid-gray tracking-wide">
              build. compound. repeat.
            </p>
          </div>

          {/* Ventures */}
          <div>
            <p className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-neon mb-6">
              ventures
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {pillarLinks.map((p) => (
                <span
                  key={p}
                  className="font-body text-sm text-mid-gray"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="font-heading text-[11px] font-semibold tracking-[0.2em] uppercase text-neon mb-6">
              connect
            </p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-mid-gray hover:text-white transition-colors duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-warm-charcoal flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-warm-gray">
            &copy; {new Date().getFullYear()} drew nagda. all rights reserved.
          </p>
          <p className="font-body text-xs text-warm-gray">
            business &middot; fitness &middot; family &middot; investments
            &middot; community
          </p>
        </div>
      </div>
    </footer>
  );
}
