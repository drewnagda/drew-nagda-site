import type { Metadata, Viewport } from "next";
import "./globals.css";
import { homePersonSchema } from "@/lib/schema";

const DESCRIPTION = "Drew Nagda is a distressed real estate developer, investor, and technologist in Pasadena, California, and the founder of Nagda Homes: more than 300 homes bought, rebuilt, and sold across Southern California. Previously SinglePlatform, Rap Genius, Lean Startup Machine, Techstars.";
const TW_DESCRIPTION = "Drew Nagda is a distressed real estate developer, investor, and technologist in Pasadena, California, and the founder of Nagda Homes, which has bought, rebuilt, and sold more than 300 homes across Southern California. He was previously at SinglePlatform, Rap Genius, Lean Startup Machine, and Techstars.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drewnagda.com"),
  title: { default: "Drew Nagda", template: "%s · Drew Nagda" },
  description: DESCRIPTION,
  keywords: ["Drew Nagda", "Nagda Homes", "distressed real estate developer", "Southern California real estate investor", "fire-damage restoration", "ADU development", "Inland Empire", "Pasadena", "SinglePlatform", "Rap Genius", "Genius", "Lean Startup Machine", "Techstars", "On Deck", "angel investor", "World Cup Eats", "Puro Raza", "Latino Entrepreneur Summit", "Indiana University"],
  alternates: { canonical: "https://www.drewnagda.com" },
  openGraph: {
    type: "profile",
    url: "https://www.drewnagda.com",
    siteName: "Drew Nagda",
    title: "Drew Nagda",
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nagda",
    creator: "@nagda",
    title: "Drew Nagda",
    description: TW_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F2EC" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0C0C" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePersonSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
