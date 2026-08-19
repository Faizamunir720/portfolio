"use client";

import { useRef } from "react";
import { education, experience } from "@/data/site";
import { useStudioStaggerList } from "@/themes/studio/useAnime";

export function StudioExperience() {
  const rootRef = useRef<HTMLElement>(null);
  useStudioStaggerList(rootRef);

  const job = experience[0];

  return (
    <section
      id="st-about"
      ref={rootRef}
      className="border-b border-[var(--st-rule)] px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--st-mute)]">
            01 · Experience
          </p>
          <article
            data-studio-item
            className="mt-8 border-t border-[var(--st-rule)] pt-6"
            style={{ opacity: 0 }}
          >
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--st-mute)]">
              01 / {job.role} · {job.org} · {job.period}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-newsreader)] text-3xl tracking-tight text-[var(--st-ink)]">
              {job.role}
            </h2>
            <p className="mt-1 font-[family-name:var(--font-source-serif)] text-[var(--st-soft)]">
              {job.org}
            </p>
            <ul className="mt-6 max-w-[42ch] space-y-3 font-[family-name:var(--font-source-serif)] text-[15px] leading-relaxed text-[var(--st-soft)]">
              {job.contributions.map((p) => (
                <li key={p} className="pl-4 border-l border-[var(--st-rule)]">
                  {p}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div>
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--st-mute)]">
            02 · Education
          </p>
          <article
            data-studio-item
            className="mt-8 border-t border-[var(--st-rule)] pt-6"
            style={{ opacity: 0 }}
          >
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--st-mute)]">
              02 / {education.role} · {education.org} · {education.period}
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-newsreader)] text-3xl tracking-tight text-[var(--st-ink)]">
              {education.role}
            </h2>
            <p className="mt-1 font-[family-name:var(--font-source-serif)] text-[var(--st-soft)]">
              {education.org}
            </p>
            <p className="mt-2 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--st-signal)]">
              CGPA {education.cgpa}
            </p>
            <p className="mt-6 max-w-[42ch] font-[family-name:var(--font-source-serif)] text-[15px] leading-relaxed text-[var(--st-soft)]">
              {education.points[0]}
            </p>
            <ul className="mt-6 space-y-3 border-t border-[var(--st-rule)] pt-5">
              {education.awards.map((a) => (
                <li
                  key={a.project}
                  className="flex flex-wrap items-baseline justify-between gap-2"
                >
                  <span className="font-[family-name:var(--font-source-serif)] text-[var(--st-ink)]">
                    {a.project}
                  </span>
                  <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--st-mute)]">
                    {a.place}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
