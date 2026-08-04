"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { contact } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about-grid", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#disciplines", label: "Systems" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled
          ? "border-b border-white/10 bg-[#05060c]/92 backdrop-blur-xl"
          : "bg-[#05060c]/55 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#hero" className="text-sm font-semibold tracking-wide">
          FAIZA<span className="text-zinc-500">.</span>
        </a>
        <ul className="hidden items-center gap-6 text-sm text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="GitHub"
          >
            <GitHubIcon size={15} />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={15} />
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="icon-btn"
            aria-label="Email"
          >
            <Mail size={15} />
          </a>
        </div>
      </nav>
    </header>
  );
}
