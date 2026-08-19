"use client";

import { motion, useReducedMotion } from "framer-motion";
import { contact } from "@/data/site";
import { OsWindow, PixelButton, PixelLabel } from "@/themes/pixel/PixelPrimitives";
import { PixelGridBg, HalftoneOverlay } from "@/themes/pixel/PixelDecor";

export function PixelContact() {
  const reduce = useReducedMotion();

  return (
    <section
      id="px-contact"
      className="relative overflow-hidden border-b-[3px] border-black bg-[#2227F7] px-3 py-14 sm:px-5 sm:py-20"
    >
      <PixelGridBg className="opacity-40" />
      <HalftoneOverlay />

      <div className="relative z-[2] mx-auto grid w-full max-w-[1400px] gap-6 lg:grid-cols-[1fr_0.9fr]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <PixelLabel className="bg-[#FFD635] text-black">06 · PING</PixelLabel>
          <h2 className="mt-4 max-w-[10ch] font-[family-name:var(--font-space-grotesk)] text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl">
            Ready to build something real?
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85">
            Open to internships and collaborations. Prefer email or LinkedIn.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PixelButton href={`mailto:${contact.email}`} tone="pink">
              Send email
            </PixelButton>
            <PixelButton href={contact.linkedin} tone="yellow">
              LinkedIn
            </PixelButton>
            <PixelButton href={contact.github} tone="white">
              GitHub
            </PixelButton>
          </div>
        </motion.div>

        <OsWindow title="contact.ini" colorIndex={1} meta="LIVE">
          <dl className="space-y-4 font-mono text-sm">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-black/45">
                Location
              </dt>
              <dd className="mt-1 font-bold">{contact.location}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-black/45">
                Email
              </dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${contact.email}`}
                  className="font-bold text-[#2227F7] underline decoration-2 underline-offset-2"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-black/45">
                Status
              </dt>
              <dd className="mt-1 inline-flex items-center gap-2 border-2 border-black bg-[#24D44D] px-2 py-1 text-[11px] font-bold uppercase">
                <span className="h-2 w-2 animate-pulse bg-black" />
                Currently open to opportunities
              </dd>
            </div>
          </dl>
        </OsWindow>
      </div>
    </section>
  );
}

export function PixelFooter() {
  return (
    <footer className="border-t-[3px] border-black bg-[#FFD635] px-3 py-5 sm:px-5">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-black sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Faiza Munir · PIXEL OS theme</p>
        <p>Rawalpindi / Islamabad · Built on shared site.ts</p>
      </div>
    </footer>
  );
}
