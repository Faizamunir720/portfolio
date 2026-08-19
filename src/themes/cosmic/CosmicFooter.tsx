"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { contact } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { RollingTextButton } from "@/components/RollingTextButton";

/**
 * Clip-path curtain footer.
 * Opacity/Y only — no filter:blur (that was a major scroll jank source).
 */
export function CosmicFooter() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end end"],
  });

  const displayOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.85, 1],
    [0.4, 0.85, 1, 1],
  );
  const displayY = useTransform(scrollYProgress, [0, 0.75, 1], [16, 0, 0]);

  const displayStyle = reduce
    ? { opacity: 1, y: 0 }
    : { opacity: displayOpacity, y: displayY };

  return (
    <div
      ref={trackRef}
      id="contact"
      className="relative z-0 h-[var(--cosmic-footer-h)] w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <footer className="cosmic-footer fixed inset-x-0 bottom-0 flex h-[var(--cosmic-footer-h)] w-full flex-col justify-between overflow-hidden px-5 pb-3 pt-8 sm:px-8 sm:pb-4 sm:pt-10 lg:px-12">
        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between gap-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--footer-accent)]">
                Ready for change?
              </p>
              <motion.h2
                className="mt-2 text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[0.95] tracking-tight text-[var(--footer-ink)]"
                style={displayStyle}
              >
                Let&apos;s talk
              </motion.h2>
              <div className="mt-5">
                <RollingTextButton
                  href={`mailto:${contact.email}`}
                  label="Contact me"
                  rollLabel="Send email"
                  className="rounded-sm bg-[var(--footer-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--footer-accent-fg)]"
                  showChevron
                />
              </div>
            </div>

            <div className="flex flex-col items-start gap-5 sm:items-end">
              <div className="flex items-center gap-3">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--footer-ink)]/20 text-[var(--footer-ink)] transition hover:border-[var(--footer-accent)] hover:text-[var(--footer-accent)]"
                  aria-label="GitHub"
                >
                  <GitHubIcon size={18} />
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--footer-ink)]/20 text-[var(--footer-ink)] transition hover:border-[var(--footer-accent)] hover:text-[var(--footer-accent)]"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon size={18} />
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--footer-ink)]/20 text-[var(--footer-ink)] transition hover:border-[var(--footer-accent)] hover:text-[var(--footer-accent)]"
                  aria-label="Email"
                >
                  <span className="text-xs font-semibold">@</span>
                </a>
              </div>

              <div className="flex flex-col gap-1 text-left font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--footer-accent)] sm:text-right sm:text-[11px]">
                <p>
                  Copyright © {new Date().getFullYear()} Faiza Munir · All
                  rights reserved
                </p>
                <p className="text-[var(--footer-ink)]/55">{contact.location}</p>
              </div>

              <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--footer-ink)]/65 sm:justify-end">
                <a
                  href="#work"
                  className="transition hover:text-[var(--footer-ink)]"
                >
                  Work
                </a>
                <a
                  href="#disciplines"
                  className="transition hover:text-[var(--footer-ink)]"
                >
                  Systems
                </a>
                <a
                  href="#about-grid"
                  className="transition hover:text-[var(--footer-ink)]"
                >
                  About
                </a>
              </nav>
            </div>
          </div>

          <div className="relative min-w-0 select-none">
            {!reduce ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/gifs/see-you-soon.gif"
                alt="See you soon"
                width={240}
                height={154}
                className="pointer-events-none absolute bottom-0 left-0 z-10 h-[110px] w-auto rounded-sm border border-[var(--footer-ink)]/15 object-cover sm:h-[140px] lg:h-[160px]"
                loading="lazy"
                decoding="async"
              />
            ) : null}
            <div className="overflow-hidden">
              <motion.p
                className="footer-wordmark text-center font-[family-name:var(--font-space-grotesk)] font-bold uppercase leading-[0.82] tracking-[-0.04em] text-[var(--footer-ink)]"
                style={displayStyle}
                aria-label="Faiza Munir"
              >
                Faiza Munir
              </motion.p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
