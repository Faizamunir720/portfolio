"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { experience } from "@/data/site";

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Soft layout spring — smooth reorder, not snappy */
const layoutSpring: Transition = {
  type: "spring",
  damping: 28,
  stiffness: 220,
  mass: 0.9,
};

type FeatureCell = {
  id: string;
  title: string;
  body: string;
  hint: string;
};

function shuffleIds(ids: string[]) {
  const next = [...ids];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  // Avoid identical order when possible
  if (next.length > 1 && next.every((id, i) => id === ids[i])) {
    [next[0], next[1]] = [next[1], next[0]];
  }
  return next;
}

export function Experience() {
  const job = experience[0];
  const reduce = useReducedMotion();
  const focusRef = useRef<HTMLDivElement>(null);
  const contribRef = useRef<HTMLDivElement>(null);
  const focusInView = useInView(focusRef, { amount: 0.35 });
  const contribInView = useInView(contribRef, { amount: 0.15 });
  const pauseUntil = useRef(0);

  const features = useMemo<FeatureCell[]>(
    () => [
      {
        id: "healthcare",
        title: job.domains[0].label,
        body: job.domains[0].portals.join(" · "),
        hint: "Multi-portal",
      },
      {
        id: "education",
        title: job.domains[1].label,
        body: job.domains[1].portals.join(" · "),
        hint: "Learner flows",
      },
      {
        id: "architecture",
        title: "Architecture",
        body: "Modular features, shared UI, navigation, state.",
        hint: "No drift",
      },
      {
        id: "performance",
        title: "Performance",
        body: "Fewer rebuilds, cache, pagination, fast loads.",
        hint: "Under load",
      },
    ],
    [job.domains],
  );

  const [order, setOrder] = useState(() => features.map((f) => f.id));
  const [activeNote, setActiveNote] = useState(0);

  const selectNote = (i: number) => {
    pauseUntil.current = Date.now() + 5000;
    setActiveNote(i);
  };

  useEffect(() => {
    setOrder(features.map((f) => f.id));
  }, [features]);

  // Smooth reorder while focus grid is visible
  useEffect(() => {
    if (reduce || !focusInView) return;
    if (typeof document !== "undefined" && document.hidden) return;
    const t = window.setTimeout(() => {
      setOrder((prev) => shuffleIds(prev));
    }, 2200);
    return () => window.clearTimeout(t);
  }, [order, focusInView, reduce]);

  // Cycle contributions while the contributions block is on screen (~2s)
  useEffect(() => {
    if (reduce || !contribInView) return;
    const t = window.setInterval(() => {
      if (Date.now() < pauseUntil.current) return;
      setActiveNote((i) => (i + 1) % job.contributions.length);
    }, 2000);
    return () => window.clearInterval(t);
  }, [contribInView, reduce, job.contributions.length]);

  const ordered = order
    .map((id) => features.find((f) => f.id === id)!)
    .filter(Boolean);

  return (
    <section
      id="about-grid"
      className="relative overflow-hidden border-t border-[var(--hairline)] bg-[var(--background)]"
      aria-labelledby="experience-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_srgb,var(--cp-accent)_10%,transparent),transparent_55%)]"
      />

      <div className="cosmic-band-inner relative py-10 sm:py-14 lg:py-20">
        {/* Eyebrow row */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--hairline)] pb-4 sm:mb-8 sm:pb-5">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--cp-accent-2,var(--cp-accent))]">
            {job.title}
          </p>
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.12em] text-[var(--cp-ink-soft,var(--muted))]">
            {job.org} · {job.period}
          </p>
        </div>

        {/* Two columns — stretch so heights stay in harmony */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12 xl:gap-14">
          {/* LEFT */}
          <div className="flex flex-col lg:col-span-5">
            <motion.h2
              id="experience-heading"
              className="text-[clamp(1.85rem,4vw,2.85rem)] font-semibold leading-[1.02] tracking-tight text-[var(--cp-ink,var(--foreground))]"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              {job.role}
            </motion.h2>
            <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.7] text-[var(--cp-ink-soft,var(--muted))] sm:text-[17px]">
              {job.summary}
            </p>

            <div ref={focusRef} className="mt-7">
              <p className="mb-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--cp-ink-soft,var(--muted))]">
                Focus score
              </p>

              {/* Compact 2×2 — content-height, not empty squares */}
              <LayoutGroup id="focus-score">
                <div
                  className="grid grid-cols-2 gap-2"
                  style={{ perspective: 900 }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    {ordered.map((cell) => (
                      <motion.article
                        key={cell.id}
                        layout
                        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={layoutSpring}
                        className="group relative flex min-h-[6.75rem] flex-col justify-between overflow-hidden border border-[var(--hairline)] bg-[var(--cp-card,var(--background))] px-3 py-2.5 sm:min-h-[8rem] sm:px-4 sm:py-3.5"
                        style={{ transformStyle: "preserve-3d" }}
                        whileHover={
                          reduce
                            ? undefined
                            : {
                                z: 16,
                                rotateX: -4,
                                rotateY: 4,
                                borderColor:
                                  "color-mix(in srgb, var(--cp-accent) 55%, transparent)",
                                boxShadow:
                                  "0 14px 28px -16px color-mix(in srgb, var(--cp-accent) 28%, transparent), 0 6px 14px -10px rgba(0,0,0,0.25)",
                              }
                        }
                      >
                        <div>
                          <h3 className="text-[14px] font-semibold tracking-tight text-[var(--cp-ink,var(--foreground))] sm:text-[15px]">
                            {cell.title}
                          </h3>
                          <p className="mt-1.5 text-[13px] leading-snug text-[var(--cp-ink-soft,var(--muted))]">
                            {cell.body}
                          </p>
                        </div>
                        <p className="mt-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--cp-ink-soft,var(--muted))]">
                          {cell.hint}
                        </p>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>
              </LayoutGroup>
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {job.stack.map((tech) => (
                <motion.span
                  key={tech}
                  className="border border-[var(--hairline)] bg-[var(--cp-chip,transparent)] px-2.5 py-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium uppercase tracking-[0.08em] text-[var(--cp-ink,var(--foreground))]"
                  whileHover={
                    reduce
                      ? undefined
                      : {
                          scale: 1.04,
                          borderColor:
                            "color-mix(in srgb, var(--cp-accent) 50%, transparent)",
                        }
                  }
                  whileTap={reduce ? undefined : { scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 500, damping: 24 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* RIGHT — grows with left so the featured panel fills leftover height */}
          <div ref={contribRef} className="flex min-h-0 flex-col lg:col-span-7">
            <div className="flex items-baseline justify-between gap-3 border-b border-[var(--hairline)] pb-3">
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--cp-ink-soft,var(--muted))]">
                Engineering contributions
              </p>
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] tabular-nums text-[var(--cp-ink-soft,var(--muted))]">
                {String(activeNote + 1).padStart(2, "0")} /{" "}
                {String(job.contributions.length).padStart(2, "0")}
              </p>
            </div>

            {/* Featured note — auto height on mobile; flex-1 on lg so columns match */}
            <div className="relative mt-4 overflow-hidden border border-[var(--hairline)] bg-[var(--cp-card,color-mix(in_srgb,var(--foreground)_3%,transparent))] sm:mt-5 sm:min-h-[200px] lg:min-h-[220px] lg:flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={job.contributions[activeNote]}
                  initial={reduce ? false : { opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.28, ease: easeOut }}
                  className="flex flex-col justify-center p-5 sm:absolute sm:inset-0 sm:p-8"
                >
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-medium tabular-nums text-[var(--cp-accent-2,var(--cp-accent))]">
                    {String(activeNote + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-[var(--cp-ink,var(--foreground))] sm:mt-4 sm:text-[18px]">
                    {job.contributions[activeNote]}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile: number chips only — avoid truncated dual-column congestion */}
            <div
              className="mt-3 flex flex-wrap gap-2 sm:hidden"
              role="tablist"
              aria-label="Contribution index"
            >
              {job.contributions.map((_, i) => {
                const active = i === activeNote;
                return (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectNote(i)}
                    className={`inline-flex h-10 min-w-10 items-center justify-center border px-2.5 font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-medium tabular-nums transition ${
                      active
                        ? "border-[color-mix(in_srgb,var(--cp-accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--cp-accent)_10%,transparent)] text-[var(--cp-accent-2,var(--cp-accent))]"
                        : "border-[var(--hairline)] text-[var(--cp-ink-soft,var(--muted))]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </button>
                );
              })}
            </div>

            {/* sm+: index rail with readable copy */}
            <ul className="mt-4 hidden gap-1.5 sm:grid sm:grid-cols-2">
              {job.contributions.map((point, i) => {
                const active = i === activeNote;
                return (
                  <li key={point}>
                    <button
                      type="button"
                      onClick={() => selectNote(i)}
                      className={`flex w-full items-start gap-3 border px-3.5 py-3 text-left transition ${
                        active
                          ? "border-[color-mix(in_srgb,var(--cp-accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--cp-accent)_10%,transparent)]"
                          : "border-[var(--hairline)] hover:border-[color-mix(in_srgb,var(--cp-ink)_28%,transparent)]"
                      }`}
                    >
                      <span
                        className={`font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-medium tabular-nums ${
                          active
                            ? "text-[var(--cp-accent-2,var(--cp-accent))]"
                            : "text-[var(--cp-ink-soft,var(--muted))]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`line-clamp-2 text-[13px] leading-snug ${
                          active
                            ? "font-medium text-[var(--cp-ink,var(--foreground))]"
                            : "text-[var(--cp-ink-soft,var(--muted))]"
                        }`}
                      >
                        {point}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 border-t border-[var(--hairline)] pt-3 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-medium uppercase leading-relaxed tracking-[0.1em] text-[var(--cp-ink-soft,var(--muted))] sm:mt-5 sm:pt-4 sm:text-[11px] sm:tracking-[0.12em]">
              {job.technologies.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
