"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { contact } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { HeroGridCanvas } from "@/components/HeroGridCanvas";
import { RollingTextButton } from "@/components/RollingTextButton";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative h-[68svh] min-h-[420px] max-h-[620px] w-full overflow-hidden sm:h-[72svh] sm:min-h-[480px] sm:max-h-[680px] lg:h-[74svh] lg:max-h-[720px]"
      aria-label="Introduction"
    >
      <HeroGridCanvas />

      <div className="pointer-events-none absolute inset-0 z-10">
        <motion.div
          className="pointer-events-auto absolute left-4 top-[22%] z-20 sm:left-8 sm:top-[24%] lg:left-12 lg:top-[26%]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="hero-title max-w-[15ch] text-[clamp(2.25rem,6.5vw,4.75rem)] font-extrabold leading-[0.95] tracking-tight sm:max-w-[18ch]">
            Systems that hold.
          </h1>
          <div className="relative z-20 mt-5 flex flex-wrap items-center gap-2.5 sm:mt-6 sm:flex-nowrap sm:gap-3">
            <RollingTextButton
              href="#work"
              label="View Projects"
              rollLabel="See the work"
              className="hero-cta-fill rounded-full px-4 py-2 text-sm font-semibold sm:px-5 sm:py-2.5"
            />
            <RollingTextButton
              href="#"
              label="Download CV"
              rollLabel="Get the PDF"
              showChevron={false}
              icon={<Download size={15} />}
              className="hero-cta-ghost rounded-full border px-4 py-2 text-sm sm:px-5 sm:py-2.5"
            />
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-ghost hero-social inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition sm:h-10 sm:w-10"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-ghost hero-social inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition sm:h-10 sm:w-10"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex flex-col items-end gap-2 sm:bottom-7 sm:right-8 lg:right-12">
          {!reduce ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gifs/hero-wave.gif"
                alt=""
                width={140}
                height={147}
                className="h-[100px] w-auto select-none drop-shadow-md sm:h-[120px] lg:h-[136px]"
                decoding="async"
                aria-hidden
              />
            </motion.div>
          ) : null}
          <motion.p
            className="hero-lede max-w-[24ch] text-right text-[12px] leading-relaxed sm:max-w-[34ch] sm:text-sm"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Helping products ship end-to-end web systems, desktop trading
            platforms, and mobile apps with architecture that survives real
            constraints.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
