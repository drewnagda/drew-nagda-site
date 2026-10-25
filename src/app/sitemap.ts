import type { MetadataRoute } from "next";

const BASE = "https://www.drewnagda.com";

// The blog is intentionally private (Drew, Oct 1 2026): not in the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: BASE, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
