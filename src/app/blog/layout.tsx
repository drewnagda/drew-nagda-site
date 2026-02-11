import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Drew Nagda",
  description:
    "Raw reflections on building businesses, real estate investing, fitness, family, and the compound effect of staying disciplined.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
