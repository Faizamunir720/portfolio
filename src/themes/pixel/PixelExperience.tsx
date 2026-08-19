"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { education, experience } from "@/data/site";
import { OsWindow, PixelLabel } from "@/themes/pixel/PixelPrimitives";
import { Separator } from "@/components/ui/8bit-separator";

export function PixelExperience() {
  const reduce = useReducedMotion();
  const job = experience[0];
  const [open, setOpen] = useState(true);

  return (
    <section id="px-about" className="border-b-[3px] border-black bg-[#24D44D] px-3 py-12 sm:px-5 sm:py-16">
      <div className="mx-auto grid w-full max-w-[1400px] gap-6 lg:grid-cols-2">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.35 }}
        >
          <PixelLabel className="mb-3 bg-black text-[#FFD635]">01 · EXP</PixelLabel>
          <OsWindow title="work_log.txt" colorIndex={3} meta="ACTIVE">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-black tracking-tight sm:text-3xl">
                  {job.role}
                </h2>
                <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-[#2227F7]">
                  {job.org}
                </p>
              </div>
              <span className="border-2 border-black bg-[#FF3B9B] px-2 py-1 font-mono text-[10px] font-bold uppercase">
                {job.period}
              </span>
            </div>
            <Separator className="my-4" color="#000" />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="mb-3 cursor-pointer border-2 border-black bg-[#ffef5a] px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
            >
              {open ? "− Collapse" : "+ Expand"} stack dump
            </button>
            {open && (
              <ul className="space-y-3">
                {job.contributions.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 border-l-[3px] border-[#2227F7] pl-3 text-sm leading-relaxed"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 bg-[#FF3B9B]" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            )}
          </OsWindow>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <PixelLabel className="mb-3 bg-black text-[#FF3B9B]">02 · EDU</PixelLabel>
          <OsWindow title="campus_id.card" colorIndex={5} meta="CUI">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-black tracking-tight sm:text-3xl">
              {education.role}
            </h2>
            <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-[#14704f]">
              {education.org}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="border-2 border-black bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase">
                {education.period}
              </span>
              <span className="border-2 border-black bg-[#2227F7] px-2 py-1 font-mono text-[10px] font-bold uppercase text-white">
                CGPA {education.cgpa}
              </span>
            </div>
            <Separator className="my-4" color="#000" />
            <p className="text-sm leading-relaxed">{education.points[0]}</p>
            <div className="mt-4 grid gap-2">
              {education.awards.map((a) => (
                <div
                  key={a.project}
                  className="flex items-center justify-between gap-3 border-2 border-black bg-[#F5F5F0] px-3 py-2"
                >
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF3B9B]">
                      {a.place}
                    </p>
                    <p className="text-sm font-semibold">{a.project}</p>
                  </div>
                  <p className="max-w-[40%] text-right font-mono text-[9px] uppercase leading-snug text-black/60">
                    {a.title}
                  </p>
                </div>
              ))}
            </div>
          </OsWindow>
        </motion.div>
      </div>
    </section>
  );
}
