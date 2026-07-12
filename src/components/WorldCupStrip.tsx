const items = [
  "world cup eats — now filming across la",
  "eating the 2026 world cup, one country at a time",
  "a father-son show with ezra",
  "watch at worldcupeats.com",
];

export default function WorldCupStrip() {
  const loop = [...items, ...items, ...items];
  return (
    <a
      href="https://worldcupeats.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="world cup eats — watch at worldcupeats.com"
      className="block bg-neon overflow-hidden"
    >
      <div className="flex whitespace-nowrap animate-marquee py-3 w-max">
        {loop.map((t, i) => (
          <span
            key={i}
            className="mx-8 font-heading text-xs font-semibold tracking-[0.2em] uppercase text-true-black"
          >
            &#9917; {t}
          </span>
        ))}
      </div>
    </a>
  );
}
