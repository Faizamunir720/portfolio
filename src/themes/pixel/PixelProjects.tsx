"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { projects, type Project } from "@/data/site";
import { OsWindow, PixelButton, PixelLabel } from "@/themes/pixel/PixelPrimitives";
import { Separator } from "@/components/ui/8bit-separator";

const ACCENTS = [
  "#FF3B9B",
  "#2227F7",
  "#24D44D",
  "#FFD635",
  "#ffa934",
] as const;

function ProjectWindow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const accent = ACCENTS[index % ACCENTS.length];
  const hasCover = Boolean(project.media.cover);

  return (
    <OsWindow
      title={`${project.name.toLowerCase()}.app`}
      colorIndex={index}
      meta={project.category.split(" ")[0]}
      className="h-full"
      bodyClassName="flex h-full flex-col p-0"
    >
      <div className="relative aspect-[16/10] border-b-[3px] border-black bg-[#00001B]">
        {hasCover ? (
          <Image
            src={project.media.cover}
            alt={`${project.name} cover`}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center font-mono text-xs font-bold uppercase tracking-widest text-white"
            style={{ background: accent }}
          >
            NO_BITMAP
          </div>
        )}
        <span
          className="absolute left-2 top-2 border-2 border-black px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-black"
          style={{ background: accent }}
        >
          #{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-black tracking-tight">
          {project.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-black/75">
          {project.tagline}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="border border-black bg-[#F5F5F0] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <PixelButton onClick={onOpen} tone="pink" className="px-3 py-2 text-[10px]">
            Case study
          </PixelButton>
          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 border-[3px] border-black bg-white px-3 py-2 font-mono text-[10px] font-bold uppercase shadow-[3px_3px_0_#000]"
            >
              Repo <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </OsWindow>
  );
}

function CaseModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 p-3 sm:items-center sm:p-6"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal
        aria-label={`${project.name} case study`}
        initial={reduce ? false : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={reduce ? undefined : { y: 16, opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border-[3px] border-black bg-white shadow-[8px_8px_0_#FF3B9B]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b-[3px] border-black bg-[#2227F7] px-4 py-3 text-white">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em]">
            {project.name} · case_study.md
          </p>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer border-2 border-black bg-[#FFD635] p-1 text-black"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
        <div className="space-y-4 p-5">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF3B9B]">
            {project.category}
          </p>
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-black">
            {project.summary}
          </h3>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider">Problem</p>
            <p className="mt-1 text-sm leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider">Approach</p>
            <ul className="mt-2 space-y-1.5">
              {project.approach.map((a) => (
                <li key={a} className="flex gap-2 text-sm">
                  <span className="mt-1.5 h-2 w-2 shrink-0 bg-[#24D44D]" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-2 border-black bg-[#ffef5a] p-3">
            <p className="font-mono text-[10px] font-bold uppercase">Hardest part</p>
            <p className="mt-1 text-sm">{project.hardest}</p>
          </div>
          <div className="border-2 border-dashed border-black bg-[#F5F5F0] p-3">
            <p className="font-mono text-[10px] font-bold uppercase text-black/50">Honesty</p>
            <p className="mt-1 text-sm text-black/80">{project.honesty}</p>
          </div>
          <Separator color="#000" />
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="border-2 border-black bg-[#FF3B9B] px-2 py-0.5 font-mono text-[10px] font-bold uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PixelProjects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="px-work" className="border-b-[3px] border-black bg-[#f478b0] px-3 py-12 sm:px-5 sm:py-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <PixelLabel className="bg-black text-white">04 · WORK</PixelLabel>
            <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-black tracking-tight text-black sm:text-5xl">
              Featured builds
            </h2>
          </div>
          <p className="max-w-xs border-[3px] border-black bg-white px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider shadow-[4px_4px_0_#000]">
            Same content · different OS skin
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectWindow
              key={p.id}
              project={p}
              index={i}
              onOpen={() => setActive(p)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <CaseModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
