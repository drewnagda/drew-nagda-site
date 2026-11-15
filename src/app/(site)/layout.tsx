import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Site chrome (header, footer) for every page except standalone apps like /grind.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
