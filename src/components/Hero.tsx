"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download, MapPin } from "lucide-react";
import { contact, marqueeItems } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { TechGridCanvas } from "@/components/TechGridCanvas";

export function Hero() {
  const reduce = useReducedMotion();
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <motion.article
      id="hero"
      className="bento-card relative flex w-full flex-col justify-between overflow-hidden p-6 sm:p-8 lg:p-10"
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TechGridCanvas />
      <div className="glow-orb -right-10 -top-16 h-48 w-48 bg-cyan-500/20" />
      <div className="glow-orb -bottom-20 left-10 h-40 w-40 bg-violet-500/18" />

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2">
          <span className="chip inline-flex items-center gap-1.5">
            <MapPin size={12} />
            Rawalpindi / Islamabad, Pakistan
          </span>
          <span className="chip inline-flex items-center gap-2">
            <span className="pulse-dot" aria-hidden="true" />
            Open to Opportunities
          </span>
        </div>

        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Faiza Munir
        </h1>
        <p className="mt-3 inline-flex max-w-full rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm text-zinc-300 sm:text-[15px]">
          Software Engineering Student & Full Stack Developer
        </p>
        <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-muted sm:text-base">
          Building end-to-end web systems, desktop trading platforms, and mobile
          apps with clean architecture.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 sm:text-[15px]"
          >
            View Projects
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm transition hover:border-white/30 sm:text-[15px]"
          >
            <Download size={16} />
            Download CV
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn h-11 w-11"
            aria-label="GitHub"
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn h-11 w-11"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={18} />
          </a>
        </div>
      </div>

      <div className="relative z-10 mt-8 border-t border-white/10 pt-4">
        <div className="marquee">
          <div className="marquee-track gap-0 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            {loop.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="inline-flex items-center gap-4 pr-4"
              >
                {item}
                <span className="text-zinc-600" aria-hidden="true">
                  •
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
