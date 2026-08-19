"use client";

import { useRef } from "react";
import Image from "next/image";
import { projects } from "@/data/site";
import { useStudioScrollReveal } from "@/themes/studio/useAnime";
import { cn } from "@/lib/utils";

export function StudioProjects() {
  const rootRef = useRef<HTMLElement>(null);
  useStudioScrollReveal(rootRef, "[data-studio-reveal]");

  return (
    <section
      id="st-work"
      ref={rootRef}
      className="border-b border-[var(--st-rule)] px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--st-mute)]">
          04 · Selected work
        </p>
        <h2 className="mt-3 font-[family-name:var(--font-newsreader)] text-4xl tracking-tight text-[var(--st-ink)] sm:text-5xl">
          Projects
        </h2>

        <div className="mt-14 space-y-20 sm:space-y-28">
          {projects.map((project, i) => {
            const flip = i % 2 === 1;
            const hasMedia = Boolean(project.media.cover);

            return (
              <article
                key={project.id}
                data-studio-reveal
                className={cn(
                  "grid items-center gap-8 lg:grid-cols-2 lg:gap-14",
                )}
                style={{ opacity: 0, perspective: "1000px" }}
              >
                <div className={cn(flip && "lg:order-2")}>
                  {hasMedia ? (
                    <div className="overflow-hidden border border-[var(--st-rule)] bg-white">
                      {project.media.video ? (
                        <video
                          className="aspect-[16/10] w-full object-cover"
                          src={project.media.video}
                          poster={project.media.cover}
                          muted
                          loop
                          playsInline
                          autoPlay
                          aria-label={`${project.name} demo`}
                        />
                      ) : (
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={project.media.cover}
                            alt={`${project.name} screenshot`}
                            fill
                            className="object-cover"
                            sizes="(max-width:1024px) 100vw, 50vw"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center border border-[var(--st-rule)] bg-white px-8 text-center">
                      <div>
                        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--st-mute)]">
                          Typographic plate
                        </p>
                        <p className="mt-4 font-[family-name:var(--font-newsreader)] text-4xl tracking-tight text-[var(--st-ink)]">
                          {project.name}
                        </p>
                        <p className="mt-3 font-[family-name:var(--font-source-serif)] italic text-[var(--st-soft)]">
                          {project.category}
                        </p>
                      </div>
                    </div>
                  )}
                  <p className="mt-3 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--st-mute)]">
                    Fig. {String(i + 1).padStart(2, "0")} · {project.category}
                  </p>
                </div>

                <div className={cn(flip && "lg:order-1")}>
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--st-mute)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-newsreader)] text-3xl tracking-tight text-[var(--st-ink)] sm:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-[40ch] font-[family-name:var(--font-source-serif)] text-[15px] leading-relaxed text-[var(--st-soft)] sm:text-base">
                    {project.tagline}
                  </p>
                  <p className="mt-4 max-w-[42ch] font-[family-name:var(--font-source-serif)] text-sm leading-relaxed text-[var(--st-mute)]">
                    {project.summary}
                  </p>
                  <p className="mt-6 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--st-ink)]">
                    {project.tech.join(" · ")}
                  </p>
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-link mt-6 inline-block font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--st-signal)]"
                    >
                      Repository →
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
