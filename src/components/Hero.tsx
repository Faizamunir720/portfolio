"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { contact } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { HeroGridCanvas } from "@/components/HeroGridCanvas";
import { RollingTextButton } from "@/components/RollingTextButton";

const HERO_INK = "#000000";

/**
 * Cosmic hero: title on LIGHT field must be pure black.
 * Palette CSS uses !important on h1 → light ink; React inline styles lose that fight.
 * setProperty(..., "important") is the only reliable override.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.setProperty("color", HERO_INK, "important");
    el.style.setProperty("-webkit-text-fill-color", HERO_INK, "important");
    el.style.setProperty("opacity", "1", "important");
    el.style.setProperty("mix-blend-mode", "normal", "important");
  }, []);

  return (
    <section
      id="hero"
      className="relative h-[68svh] min-h-[440px] max-h-[620px] w-full overflow-hidden sm:h-[72svh] sm:min-h-[480px] sm:max-h-[680px] lg:h-[74svh] lg:max-h-[720px]"
      aria-label="Introduction"
      style={{ colorScheme: "only light" }}
    >
      <HeroGridCanvas />

      <div className="pointer-events-none absolute inset-0 z-10">
        <motion.div
          className="pointer-events-auto absolute left-4 top-[20%] z-20 max-w-[calc(100%-5.5rem)] sm:left-8 sm:top-[24%] sm:max-w-none lg:left-12 lg:top-[26%]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            ref={titleRef}
            className="hero-title max-w-[14ch] text-[clamp(2rem,8.5vw,4.75rem)] font-extrabold leading-[0.95] tracking-tight text-black sm:max-w-[18ch]"
          >
            Systems that hold.
          </h1>

          <div className="relative z-20 mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
            <RollingTextButton
              href="#work"
              label="View Projects"
              rollLabel="See the work"
              className="hero-cta-fill rounded-full px-3.5 py-2 text-[13px] font-semibold sm:px-5 sm:py-2.5 sm:text-sm"
            />
            <RollingTextButton
              href="#"
              label="Download CV"
              rollLabel="Get the PDF"
              showChevron={false}
              icon={<Download size={14} />}
              className="hero-cta-ghost rounded-full border px-3.5 py-2 text-[13px] sm:px-5 sm:py-2.5 sm:text-sm"
            />
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-ghost hero-social inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition sm:h-10 sm:w-10"
              aria-label="GitHub"
            >
              <GitHubIcon size={15} />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-ghost hero-social inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition sm:h-10 sm:w-10"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={15} />
            </a>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex flex-col items-end gap-1.5 sm:bottom-7 sm:right-8 sm:gap-2 lg:right-12">
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
                className="h-[72px] w-auto select-none drop-shadow-md sm:h-[120px] lg:h-[136px]"
                decoding="async"
                aria-hidden
              />
            </motion.div>
          ) : null}
          <motion.p
            className="hero-lede max-w-[20ch] text-right text-[11px] leading-relaxed sm:max-w-[34ch] sm:text-sm"
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
