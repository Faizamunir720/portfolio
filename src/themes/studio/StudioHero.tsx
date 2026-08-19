"use client";

import { useRef } from "react";
import { contact, projects } from "@/data/site";
import { useStudioHeroTimeline } from "@/themes/studio/useAnime";

const finverse = projects.find((p) => p.id === "finverse")!;

export function StudioHero() {
  const rootRef = useRef<HTMLElement>(null);
  useStudioHeroTimeline(rootRef);

  return (
    <section
      id="st-hero"
      ref={rootRef}
      className="border-b border-[var(--st-rule)] px-5 py-16 sm:px-8 sm:py-24"
      style={{ perspective: "1200px" }}
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p
            data-studio-hero="tagline"
            className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--st-mute)]"
            style={{ opacity: 0 }}
          >
            Software Engineering · Full Stack
          </p>
          <h1
            data-studio-hero="name"
            className="mt-4 font-[family-name:var(--font-newsreader)] text-[clamp(3.5rem,10vw,6.5rem)] font-medium leading-[0.92] tracking-[-0.03em] text-[var(--st-ink)]"
            style={{ opacity: 0, transformStyle: "preserve-3d" }}
          >
            Faiza
            <br />
            Munir
          </h1>
          <p
            data-studio-hero="tagline"
            className="mt-6 max-w-[34ch] font-[family-name:var(--font-source-serif)] text-lg italic leading-relaxed text-[var(--st-soft)] sm:text-xl"
            style={{ opacity: 0 }}
          >
            Building end-to-end web systems, desktop trading platforms, and
            mobile apps with clean architecture.
          </p>

          <ul
            data-studio-hero="meta"
            className="mt-10 max-w-md space-y-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--st-ink)]"
          >
            <li className="flex items-baseline gap-2" style={{ opacity: 0 }}>
              <span className="text-[var(--st-mute)]">Location</span>
              <span className="min-w-0 flex-1 border-b border-dotted border-[var(--st-rule)]" />
              <span>{contact.location.split(",")[0]}</span>
            </li>
            <li className="flex items-baseline gap-2" style={{ opacity: 0 }}>
              <span className="text-[var(--st-mute)]">Status</span>
              <span className="min-w-0 flex-1 border-b border-dotted border-[var(--st-rule)]" />
              <span className="text-[var(--st-signal)]">Open</span>
            </li>
            <li className="flex items-baseline gap-2" style={{ opacity: 0 }}>
              <span className="text-[var(--st-mute)]">Email</span>
              <span className="min-w-0 flex-1 border-b border-dotted border-[var(--st-rule)]" />
              <a
                href={`mailto:${contact.email}`}
                className="studio-link lowercase tracking-normal normal-case"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex items-baseline gap-2" style={{ opacity: 0 }}>
              <span className="text-[var(--st-mute)]">Index</span>
              <span className="min-w-0 flex-1 border-b border-dotted border-[var(--st-rule)]" />
              <a href="#st-work" className="studio-link">
                View work ↓
              </a>
            </li>
          </ul>
        </div>

        <figure
          data-studio-hero="media"
          style={{ opacity: 0, transformStyle: "preserve-3d" }}
        >
          <div className="overflow-hidden border border-[var(--st-rule)] bg-white">
            <video
              className="aspect-[4/3] w-full object-cover"
              src={finverse.media.video}
              poster={finverse.media.cover}
              autoPlay
              muted
              loop
              playsInline
              aria-label="Finverse project demo"
            />
          </div>
          <figcaption className="mt-3 flex justify-between gap-4 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--st-mute)]">
            <span>Fig. 01 · Finverse</span>
            <span>Desktop · Java Swing</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
