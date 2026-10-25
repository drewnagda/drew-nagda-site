import Link from "next/link";
import { PROPERTY_MAILTO } from "@/lib/site";

export default function Header() {
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link href="/" className="mark" aria-label="Drew Nagda, home">dn</Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#building">building</Link>
          <Link href="/about">about</Link>
          <a href={PROPERTY_MAILTO} className="nav-cta">send a property</a>
        </nav>
      </div>
    </header>
  );
}
