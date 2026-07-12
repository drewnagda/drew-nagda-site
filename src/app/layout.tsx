import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.drewnagda.com"),
  title: {
    default: "Drew Nagda · todo es posible",
    template: "%s · Drew Nagda",
  },
  description:
    "Drew Nagda is a real estate investor, entrepreneur, and angel investor in Pasadena, CA. Founder of Nagda Homes, early team at SinglePlatform and Genius.",
  keywords: [
    "Drew Nagda",
    "Nagda Homes",
    "real estate investor",
    "Inland Empire real estate",
    "angel investor",
    "Pasadena",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://www.drewnagda.com",
    siteName: "Drew Nagda",
    title: "Drew Nagda · todo es posible",
    description:
      "Real estate investor, entrepreneur, and angel investor. Founder of Nagda Homes, early team at SinglePlatform and Genius.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@nagda",
    creator: "@nagda",
    title: "Drew Nagda · todo es posible",
    description:
      "Real estate investor, entrepreneur, and angel investor. Founder of Nagda Homes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Drew Nagda",
  url: "https://www.drewnagda.com",
  email: "mailto:drew@drewnagda.com",
  image: "https://www.drewnagda.com/opengraph-image.png",
  jobTitle: "Founder & Principal, Nagda Homes",
  description:
    "Real estate investor, entrepreneur, and angel investor based in Pasadena, CA. Early team member at SinglePlatform and Genius.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pasadena",
    addressRegion: "CA",
    addressCountry: "US",
  },
  worksFor: {
    "@type": "Organization",
    name: "Nagda Homes",
  },
  alumniOf: [
    { "@type": "Organization", name: "SinglePlatform" },
    { "@type": "Organization", name: "Genius" },
    { "@type": "Organization", name: "Lean Startup Machine" },
  ],
  knowsAbout: [
    "Real Estate Investing",
    "Property Management",
    "Angel Investing",
    "Startups",
    "Community Building",
  ],
  sameAs: [
    "https://x.com/nagda",
    "https://linkedin.com/in/drewnagda",
    "https://youtube.com/@drewnagda",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
