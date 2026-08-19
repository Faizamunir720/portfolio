"use client";

import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { contact } from "@/data/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "#st-hero", label: "Index" },
  { href: "#st-work", label: "Work" },
  { href: "#st-systems", label: "Systems" },
  { href: "#st-contact", label: "Contact" },
];

export function StudioNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--st-rule)] bg-[var(--st-paper)]/92 backdrop-blur-sm">
      <nav className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a
          href="#st-hero"
          className="font-[family-name:var(--font-newsreader)] text-lg tracking-tight text-[var(--st-ink)] sm:text-xl"
        >
          Faiza<span className="text-[var(--st-mute)]">.</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="studio-link font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--st-soft)]"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="studio-link hidden font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--st-soft)] sm:inline"
          >
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="studio-link hidden font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--st-soft)] sm:inline"
          >
            LinkedIn
          </a>
          <ThemeSwitcher variant="studio" className={cn("shrink-0")} />
        </div>
      </nav>
    </header>
  );
}
