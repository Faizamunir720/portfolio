"use client";

import { useRef } from "react";
import { techNodes } from "@/data/site";
import { useStudioScrollReveal } from "@/themes/studio/useAnime";

export function StudioSkills() {
  const rootRef = useRef<HTMLElement>(null);
  useStudioScrollReveal(rootRef);

  return (
    <section
      ref={rootRef}
      className="border-b border-[var(--st-rule)] px-5 py-12 sm:px-8"
    >
      <div
        data-studio-reveal
        className="mx-auto max-w-[1200px]"
        style={{ opacity: 0 }}
      >
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--st-mute)]">
          03 · Toolkit
        </p>
        <p className="mt-5 font-[family-name:var(--font-source-serif)] text-base leading-[1.9] text-[var(--st-ink)] sm:text-lg">
          {techNodes.map((n, i) => (
            <span key={n.name}>
              {i > 0 && (
                <span className="mx-2 text-[var(--st-mute)]" aria-hidden>
                  ·
                </span>
              )}
              <span>{n.name}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
