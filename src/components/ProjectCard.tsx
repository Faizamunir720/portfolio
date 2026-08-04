"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/data/site";
import { VideoDemo } from "@/components/VideoDemo";
import { Reveal } from "@/components/Reveal";
import { GitHubIcon } from "@/components/SocialIcons";
import { TechPill } from "@/components/TechPill";

function CaseModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [shot, setShot] = useState(0);
  const gallery = project.media.gallery.length
    ? project.media.gallery
    : project.media.cover
      ? [project.media.cover]
      : [];

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#13131a] shadow-2xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#13131a]/95 px-5 py-4 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
              {project.category}
            </p>
            <h3 id="case-title" className="text-xl font-semibold">
              {project.name}
            </h3>
          </div>
          <button type="button" onClick={onClose} className="icon-btn" aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {gallery.length ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              <div className="relative aspect-video">
                <Image
                  src={gallery[shot]}
                  alt={`${project.name} screenshot ${shot + 1}`}
                  fill
                  className="object-contain"
                  sizes="720px"
                />
              </div>
              {gallery.length > 1 ? (
                <div className="flex flex-wrap gap-2 border-t border-white/10 p-3">
                  {gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setShot(i)}
                      className={`relative h-14 w-24 overflow-hidden rounded-lg border ${
                        shot === i ? "border-white" : "border-white/15 opacity-70"
                      }`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover object-top"
                        sizes="96px"
                      />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <p className="text-[15px] leading-relaxed text-muted">{project.summary}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Problem</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.problem}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Hardest part</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">{project.hardest}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Approach</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-zinc-300">
              {project.approach.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <TechPill key={t} name={t} />
            ))}
          </div>

          <a
            href={project.github}
            target={project.github.startsWith("http") ? "_blank" : undefined}
            rel={project.github.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
          >
            <GitHubIcon size={16} /> View on GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectCard({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Reveal className={className}>
        <article className="bento-card flex h-full flex-col overflow-hidden">
          <div className="relative aspect-[16/10] min-h-[220px] border-b border-white/10 bg-black sm:min-h-[260px] lg:min-h-[300px]">
            {project.media.video ? (
              <>
                <VideoDemo
                  src={project.media.video}
                  poster={project.media.cover || undefined}
                  fit="contain"
                />
                <span className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-200 backdrop-blur">
                  Demo · 2×
                </span>
              </>
            ) : project.media.cover ? (
              <Image
                src={project.media.cover}
                alt={`${project.name} screenshot`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 p-6 text-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                    {project.category}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{project.name}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-7">
            <p className="text-[11px] uppercase tracking-[0.14em] text-cyan-300/80">
              {project.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
              {project.name}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-base">
              {project.tagline}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <li key={t}>
                  <TechPill name={t} />
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-auto pt-5 text-left text-sm text-zinc-300 underline-offset-4 hover:text-white hover:underline"
            >
              Open case study →
            </button>
          </div>
        </article>
      </Reveal>

      <AnimatePresence>
        {open ? <CaseModal project={project} onClose={() => setOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
