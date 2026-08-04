"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { experience } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function Experience() {
  const [open, setOpen] = useState(false);
  const job = experience[0];

  return (
    <Reveal className="h-full">
      <article className="bento-card relative h-full overflow-hidden p-5 lg:p-6">
        <div className="glow-orb -left-8 top-0 h-28 w-28 bg-emerald-400/15" />
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
          Work Experience
        </p>
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold">{job.role}</h2>
            <p className="mt-1 text-sm text-muted">{job.org}</p>
          </div>
          <p className="font-mono text-xs text-zinc-500">{job.period}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {job.points[0]}
        </p>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-300 transition hover:text-white"
          aria-expanded={open}
        >
          Architectural breakdown
          <ChevronDown
            size={15}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="mt-3 space-y-2 border-t border-white/10 pt-3 text-sm text-zinc-400">
              {job.points.slice(1).map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
