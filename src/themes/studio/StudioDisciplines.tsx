"use client";

import { useRef, useState } from "react";
import { projects } from "@/data/site";
import { useStudioStaggerList } from "@/themes/studio/useAnime";
import { cn } from "@/lib/utils";

const SYSTEMS = [
  {
    id: "careerlab",
    label: "AI & Knowledge Systems",
  },
  {
    id: "forensiq",
    label: "Info Security & Crypto",
  },
  {
    id: "courtms",
    label: "Distributed Web Systems",
  },
  {
    id: "lahore-avm",
    label: "ML & Data Pipelines",
  },
  {
    id: "finverse",
    label: "Desktop OOP & Systems",
  },
] as const;

export function StudioDisciplines() {
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>("careerlab");
  useStudioStaggerList(rootRef, "[data-studio-item]");

  return (
    <section
      id="st-systems"
      ref={rootRef}
      className="border-b border-[var(--st-rule)] px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--st-mute)]">
          05 · Systems index
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-newsreader)] text-4xl tracking-tight text-[var(--st-ink)]">
          Academic disciplines
        </h2>
        <p className="mt-4 max-w-[48ch] font-[family-name:var(--font-source-serif)] text-[var(--st-soft)]">
          Deep-dive into custom system architectures, cryptographic security,
          and algorithmic logic across core Computer Science subjects.
        </p>

        <ul className="mt-12 border-t border-[var(--st-rule)]">
          {SYSTEMS.map((sys, i) => {
            const project = projects.find((p) => p.id === sys.id);
            const expanded = open === sys.id;
            return (
              <li
                key={sys.id}
                data-studio-item
                className="border-b border-[var(--st-rule)]"
                style={{ opacity: 0 }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(expanded ? null : sys.id)}
                  aria-expanded={expanded}
                  className="flex w-full cursor-pointer items-baseline justify-between gap-4 py-5 text-left"
                >
                  <span className="flex min-w-0 items-baseline gap-4 sm:gap-6">
                    <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--st-mute)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-[family-name:var(--font-newsreader)] text-xl tracking-tight text-[var(--st-ink)] sm:text-2xl">
                      {sys.label}
                    </span>
                  </span>
                  <span className="shrink-0 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--st-mute)]">
                    {expanded ? "Close" : "Open +"}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pl-0 sm:pl-[3.25rem]">
                      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--st-signal)]">
                        {project?.name}
                      </p>
                      <p className="mt-2 max-w-[52ch] font-[family-name:var(--font-source-serif)] text-[15px] leading-relaxed text-[var(--st-soft)]">
                        {project?.tagline}
                      </p>
                      <p className="mt-3 max-w-[52ch] font-[family-name:var(--font-source-serif)] text-sm leading-relaxed text-[var(--st-mute)]">
                        {project?.summary}
                      </p>
                      <p className="mt-4 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--st-ink)]">
                        {project?.tech.join(" · ")}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
