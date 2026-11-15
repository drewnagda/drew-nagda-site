import type { Metadata, Viewport } from "next";
import "./grind.css";

const DESC = "Mason's accountability app. Learn how the pros get better, do your reps every day, earn coins and streaks, and bring a buddy who notices when you skip.";

export const metadata: Metadata = {
  title: { absolute: "Grind: get your reps in" },
  description: DESC,
  manifest: "/grind/manifest.webmanifest",
  alternates: { canonical: "https://www.drewnagda.com/grind" },
  // A kid's app: shareable by link, kept out of search.
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  appleWebApp: { capable: true, title: "Grind", statusBarStyle: "default" },
  icons: { icon: "/grind/icon-192.png", apple: "/grind/apple-touch-icon.png" },
  openGraph: { title: "Grind", description: "Get your reps in. Keep the flame lit. Bring a buddy.", url: "https://www.drewnagda.com/grind" },
  twitter: { card: "summary_large_image", title: "Grind", description: "Get your reps in. Keep the flame lit. Bring a buddy." },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f3ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1714" },
  ],
};

export default function GrindLayout({ children }: { children: React.ReactNode }) {
  return children;
}
