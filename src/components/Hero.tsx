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
      className="relative h-[72svh] min-h-[480px] max-h-[640px] w-full overflow-hidden sm:h-[72svh] sm:min-h-[480px] sm:max-h-[680px] lg:h-[74svh] lg:max-h-[720px]"
      aria-label="Introduction"
    >
      <HeroGridCanvas />

      <div className="pointer-events-none absolute inset-0 z-10">
        {/* Left cluster: title + CTAs */}
        <motion.div
          className="pointer-events-auto absolute left-4 right-4 top-[18%] z-20 sm:left-8 sm:right-auto sm:top-[24%] lg:left-12 lg:top-[26%]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Soft scrim so dark title stays readable on light grid cells (esp. mobile) */}
          <div className="relative max-w-[18ch] rounded-sm sm:max-w-[18ch]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-3 -inset-y-2 -z-10 rounded-md bg-[color-mix(in_srgb,var(--hero-light)_82%,transparent)] blur-[1px] sm:-inset-x-4 sm:-inset-y-3 sm:bg-[color-mix(in_srgb,var(--hero-light)_55%,transparent)]"
            />
            <h1 className="hero-title text-[clamp(2.1rem,9vw,4.75rem)] font-extrabold leading-[0.95] tracking-tight">
              Systems that hold.
            </h1>
          </div>

          {/*
            Mobile: primary actions stacked full-width, socials on their own row.
            sm+: original horizontal cluster.
          */}
          <div className="relative z-20 mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <RollingTextButton
              href="#work"
              label="View Projects"
              rollLabel="See the work"
              className="hero-cta-fill w-full justify-center rounded-full px-4 py-3 text-sm font-semibold sm:w-auto sm:justify-start sm:px-5 sm:py-2.5"
            />
            <RollingTextButton
              href="#"
              label="Download CV"
              rollLabel="Get the PDF"
              showChevron={false}
              icon={<Download size={15} />}
              className="hero-cta-ghost w-full justify-center rounded-full border px-4 py-3 text-sm sm:w-auto sm:justify-start sm:px-5 sm:py-2.5"
            />
            <div className="flex items-center justify-start gap-2.5 pt-0.5 sm:contents">
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-ghost hero-social inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition sm:h-10 sm:w-10"
                aria-label="GitHub"
              >
                <GitHubIcon size={16} />
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-ghost hero-social inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition sm:h-10 sm:w-10"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom-right: gif + lede — smaller on phone so CTAs keep the fold */}
        <div className="pointer-events-none absolute bottom-3 right-4 z-20 flex max-w-[min(100%,18rem)] flex-col items-end gap-1.5 sm:bottom-7 sm:right-8 sm:max-w-none sm:gap-2 lg:right-12">
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
                className="h-[64px] w-auto select-none drop-shadow-md sm:h-[120px] lg:h-[136px]"
                decoding="async"
                aria-hidden
              />
            </motion.div>
          ) : null}
          <motion.p
            className="hero-lede max-w-[22ch] text-right text-[11px] leading-relaxed sm:max-w-[34ch] sm:text-sm"
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
