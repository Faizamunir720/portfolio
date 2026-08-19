"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { contact, marqueeItems } from "@/data/site";
import { AsciiArt } from "@/components/ui/pulsing-grid";
import { Separator } from "@/components/ui/8bit-separator";
import {
  OsWindow,
  PixelButton,
  PixelLabel,
} from "@/themes/pixel/PixelPrimitives";
import { DoodleLayer, HalftoneOverlay, PixelGridBg, Scanlines } from "@/themes/pixel/PixelDecor";

const TYPING = "Building end-to-end systems.";

export function PixelHero() {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState(reduce ? TYPING : "");

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(TYPING.slice(0, i));
      if (i >= TYPING.length) window.clearInterval(id);
    }, 42);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section
      id="px-hero"
      className="relative overflow-hidden border-b-[3px] border-black bg-[#00001B] px-3 pb-16 pt-28 sm:px-5 sm:pb-20 sm:pt-32"
    >
      <PixelGridBg />
      <HalftoneOverlay />
      <Scanlines />
      <DoodleLayer className="z-[2] hidden md:block" />

      <div className="relative z-[3] mx-auto grid w-full max-w-[1400px] gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <PixelLabel>SYS://BOOT</PixelLabel>
            <PixelLabel className="bg-[#24D44D]">OPEN TO OPS</PixelLabel>
            <PixelLabel className="bg-[#00a0b5] text-white">
              {contact.location.split(",")[0]}
            </PixelLabel>
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#FFD635]"
          >
            Faiza Munir · SE · Full Stack
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mt-3 max-w-[12ch] font-[family-name:var(--font-space-grotesk)] text-[clamp(3.2rem,12vw,7.5rem)] font-black leading-[0.88] tracking-[-0.04em] text-white"
          >
            FAIZA
            <span className="text-[#FF3B9B]">.</span>
            <br />
            <span className="text-[#FFD635]">OS</span>
          </motion.h1>

          <div className="mt-6 max-w-xl border-[3px] border-black bg-[#2227F7] p-4 text-white shadow-[6px_6px_0_#FF3B9B]">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#FFD635]">
              terminal://about
            </p>
            <p className="mt-2 min-h-[1.5em] font-mono text-sm leading-relaxed">
              <span className="text-[#24D44D]">$</span> {typed}
              <span className="ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[2px] bg-[#FFD635] align-middle animate-pulse" />
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/90">
              Building end-to-end web systems, desktop trading platforms, and
              mobile apps with clean architecture.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <PixelButton href="#px-work" tone="pink">
              View Projects
            </PixelButton>
            <PixelButton href="#px-contact" tone="yellow">
              Contact
            </PixelButton>
            <PixelButton href={`mailto:${contact.email}`} tone="white">
              Email
            </PixelButton>
          </div>

          <div className="mt-8 overflow-hidden border-[3px] border-black bg-[#FFD635] py-2 shadow-[4px_4px_0_#000]">
            <div className="flex animate-[px-marquee_22s_linear_infinite] whitespace-nowrap font-mono text-xs font-black uppercase tracking-[0.2em] text-black motion-reduce:animate-none">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={`${item}-${i}`} className="mx-4">
                  {item} <span className="text-[#FF3B9B]">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-4">
          <OsWindow
            title="bitmap_preview.exe"
            colorIndex={2}
            meta="64×64"
            className="overflow-hidden"
            bodyClassName="p-0"
          >
            <div className="relative aspect-[4/3] bg-black">
              <AsciiArt className="opacity-90 contrast-125 saturate-150 hue-rotate-15" />
              <div className="absolute bottom-2 left-2 border-2 border-black bg-[#FF3B9B] px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-black">
                LIVE FEED
              </div>
            </div>
          </OsWindow>

          <OsWindow title="meta.json" colorIndex={0} meta="READ">
            <dl className="grid grid-cols-2 gap-3 font-mono text-[11px] uppercase tracking-wider">
              <div>
                <dt className="text-black/50">Role</dt>
                <dd className="mt-1 font-bold">Full Stack Dev</dd>
              </div>
              <div>
                <dt className="text-black/50">Status</dt>
                <dd className="mt-1 font-bold text-[#14704f]">Available</dd>
              </div>
              <div>
                <dt className="text-black/50">Focus</dt>
                <dd className="mt-1 font-bold">Systems · Crypto · ML</dd>
              </div>
              <div>
                <dt className="text-black/50">Node</dt>
                <dd className="mt-1 font-bold">ISB / RWP</dd>
              </div>
            </dl>
            <Separator className="my-3 text-black" color="#000" />
            <p className="font-mono text-[10px] leading-relaxed text-black/70">
              COORD // GRID_08 · OFFSET_Y={"{"}24{"}"} · BORDER=3px · SHADOW=HARD
            </p>
          </OsWindow>
        </div>
      </div>
    </section>
  );
}
