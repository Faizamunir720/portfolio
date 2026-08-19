"use client";

import { motion, useReducedMotion } from "framer-motion";
import { education } from "@/data/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Education() {
  const reduce = useReducedMotion();

  return (
    <section
      id="education"
      className="relative overflow-hidden border-t border-[var(--hairline)] bg-[var(--background)]"
      aria-labelledby="education-heading"
    >
      <div className="cosmic-band-inner relative py-10 sm:py-14 lg:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--cp-accent-2,var(--cp-accent))]">
            Education
          </p>
          <h2
            id="education-heading"
            className="mt-3 max-w-[18ch] text-[clamp(1.75rem,6vw,3.5rem)] font-semibold leading-[1.02] tracking-tight text-[var(--cp-ink,var(--foreground))] sm:mt-4"
          >
            {education.role}
          </h2>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.65] text-[var(--cp-ink-soft,var(--muted))] sm:mt-5 sm:text-[17px]">
            {education.points[0]}
          </p>
        </motion.div>

        <motion.dl
          className="mt-6 grid grid-cols-1 gap-5 border-y border-[var(--hairline)] py-5 sm:mt-10 sm:grid-cols-2 sm:gap-10 sm:py-6"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, delay: 0.05, ease: easeOut }}
        >
          <div>
            <dt className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--cp-ink-soft,var(--muted))]">
              Institution
            </dt>
            <dd className="mt-2 text-[15px] font-medium leading-snug text-[var(--cp-ink,var(--foreground))] sm:text-base">
              {education.org}
            </dd>
          </div>
          <div>
            <dt className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--cp-ink-soft,var(--muted))]">
              Timeline
            </dt>
            <dd className="mt-2 text-[15px] font-medium leading-snug text-[var(--cp-ink,var(--foreground))] sm:text-base">
              {education.period}
            </dd>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
