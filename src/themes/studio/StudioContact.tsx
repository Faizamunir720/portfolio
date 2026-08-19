"use client";

import { useRef } from "react";
import { contact } from "@/data/site";
import { useStudioScrollReveal } from "@/themes/studio/useAnime";

export function StudioContact() {
  const rootRef = useRef<HTMLElement>(null);
  useStudioScrollReveal(rootRef);

  return (
    <section
      id="st-contact"
      ref={rootRef}
      className="px-5 py-20 sm:px-8 sm:py-28"
    >
      <div
        data-studio-reveal
        className="mx-auto max-w-[1200px]"
        style={{ opacity: 0 }}
      >
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--st-mute)]">
          06 · Colophon
        </p>
        <h2 className="mt-4 max-w-[16ch] font-[family-name:var(--font-newsreader)] text-4xl leading-[1.1] tracking-tight text-[var(--st-ink)] sm:text-6xl">
          Ready to build something real?
        </h2>
        <p className="mt-6 max-w-[40ch] font-[family-name:var(--font-source-serif)] italic text-[var(--st-soft)]">
          Open to internships and collaborations. Prefer email or LinkedIn.
        </p>

        <dl className="mt-14 max-w-lg space-y-4 border-t border-[var(--st-rule)] pt-8">
          {[
            { label: "Location", value: contact.location },
            {
              label: "Email",
              value: contact.email,
              href: `mailto:${contact.email}`,
            },
            { label: "GitHub", value: contact.github, href: contact.github },
            {
              label: "LinkedIn",
              value: contact.linkedin,
              href: contact.linkedin,
            },
          ].map((row) => (
            <div
              key={row.label}
              className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--st-rule)] pb-3"
            >
              <dt className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--st-mute)]">
                {row.label}
              </dt>
              <dd className="font-[family-name:var(--font-source-serif)] text-[var(--st-ink)]">
                {row.href ? (
                  <a
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      row.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="studio-link"
                  >
                    {row.value.replace(/^https?:\/\//, "")}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function StudioFooter() {
  return (
    <footer className="border-t border-[var(--st-rule)] px-5 py-6 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--st-mute)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Faiza Munir</p>
        <p>Rawalpindi / Islamabad · Studio theme</p>
      </div>
    </footer>
  );
}
