import Link from "next/link";
import { HELLO_MAILTO, EMAIL, SOCIALS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap ftr-in">
        <p className="ftr-sign">Todo es posible.</p>
        <nav className="ftr-links" aria-label="Footer">
          <Link href="/about">about</Link>
          <a href={HELLO_MAILTO}>{EMAIL}</a>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} rel="me noopener" target="_blank">{s.label.toLowerCase()}</a>
          ))}
        </nav>
        <p className="ftr-small">© {new Date().getFullYear()} Drew Nagda. Pasadena, California.</p>
      </div>
    </footer>
  );
}
