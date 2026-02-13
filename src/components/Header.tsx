"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "about", href: "#about" },
  { label: "ventures", href: "#ventures" },
  { label: "blog", href: "/blog" },
  { label: "connect", href: "#connect" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-raw-white/90 backdrop-blur-md border-b border-light-stone/40"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Monogram */}
        <a
          href="#"
          className={`flex items-center justify-center w-10 h-10 border-2 font-heading font-bold text-sm tracking-tight transition-colors duration-300 ${
            scrolled
              ? "border-stone text-stone hover:border-neon"
              : "border-stone text-stone hover:border-neon"
          }`}
        >
          dn
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-sm font-medium text-warm-gray hover:text-stone transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-neon transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-stone transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-stone transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-stone transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 bg-raw-white/95 backdrop-blur-md border-b border-light-stone/40">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-heading text-sm font-medium text-warm-gray hover:text-stone transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
