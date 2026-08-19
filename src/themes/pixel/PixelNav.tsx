"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { contact } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";

const links = [
  { href: "#px-hero", label: "BOOT" },
  { href: "#px-about", label: "BIO" },
  { href: "#px-work", label: "WORK" },
  { href: "#px-systems", label: "SYS" },
  { href: "#px-contact", label: "PING" },
];

export function PixelNav() {
  const [scrolled, setScrolled] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onMove = (e: MouseEvent) =>
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b-[3px] border-black transition-colors",
        scrolled ? "bg-[#FFD635]" : "bg-[#FF3B9B]",
      )}
    >
      <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-3 py-2.5 sm:px-5">
        <a
          href="#px-hero"
          className="border-[3px] border-black bg-black px-2.5 py-1 font-mono text-sm font-black uppercase tracking-[0.08em] text-[#FFD635] shadow-[3px_3px_0_#000]"
        >
          FAIZA<span className="text-[#FF3B9B]">.</span>OS
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="border-2 border-transparent px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-black hover:border-black hover:bg-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden font-mono text-[9px] font-bold uppercase tracking-wider text-black/70 lg:inline">
            X:{coords.x.toString().padStart(4, "0")} Y:
            {coords.y.toString().padStart(4, "0")}
          </span>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center border-2 border-black bg-white text-black shadow-[2px_2px_0_#000]"
            aria-label="GitHub"
          >
            <GitHubIcon size={13} />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 w-8 items-center justify-center border-2 border-black bg-white text-black shadow-[2px_2px_0_#000]"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={13} />
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex h-8 w-8 items-center justify-center border-2 border-black bg-white text-black shadow-[2px_2px_0_#000]"
            aria-label="Email"
          >
            <Mail size={13} />
          </a>
          <ThemeSwitcher variant="pixel" />
        </div>
      </nav>
    </header>
  );
}
