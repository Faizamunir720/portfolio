"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { engineeringLessons } from "@/data/site";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const springSoft = {
  stiffness: 120,
  damping: 28,
  restDelta: 0.001,
};

/**
 * Lessons — sticky process stack on md+, compact stacked cards on mobile.
 * Active index drives the sticky tracker (no scroll-offset keyframes).
 */
export function EngineeringLessons() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, springSoft);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = engineeringLessons.length;
    const idx = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const current = engineeringLessons[active];

  return (
    <section
      ref={sectionRef}
      id="lessons"
      className="relative border-t border-[var(--hairline)] bg-[var(--background)]"
      aria-labelledby="lessons-heading"
    >
      <div className="pointer-events-none sticky top-0 z-30 border-b border-[var(--hairline)] bg-[var(--background)]">
        <div className="cosmic-band-inner flex h-11 items-center justify-between gap-3 sm:h-12 sm:gap-4">
          <motion.p
            key={current.title}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="min-w-0 truncate font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--cp-ink,var(--foreground))] sm:text-[12px] sm:tracking-[0.14em]"
          >
            <span className="text-[var(--cp-accent-2,var(--cp-accent))]">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="text-[var(--cp-ink-soft,var(--muted))]"> — </span>
            {current.title.replace(/\.$/, "")}
          </motion.p>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tabular-nums text-[var(--cp-ink-soft,var(--muted))]">
              {String(active + 1).padStart(2, "0")}/
              {String(engineeringLessons.length).padStart(2, "0")}
            </span>
            <div className="h-px w-12 overflow-hidden bg-[color-mix(in_srgb,var(--cp-ink)_12%,transparent)] sm:w-24">
              <motion.div
                className="h-full origin-left bg-[var(--cp-accent)]"
                style={{ scaleX: reduce ? 1 : progress }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="cosmic-band-inner pt-10 pb-4 sm:pt-14 sm:pb-6 lg:pt-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="max-w-4xl"
        >
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--cp-accent-2,var(--cp-accent))]">
            Field notes
          </p>
          <h2
            id="lessons-heading"
            className="mt-3 text-[clamp(1.75rem,6vw,3.5rem)] font-semibold leading-[0.98] tracking-tight text-[var(--cp-ink,var(--foreground))]"
          >
            What Software Engineering
            <br className="hidden sm:block" /> Taught Me
          </h2>
        </motion.div>
      </div>

      {/* Mobile: content-height cards — no 85vh empty sticky panes */}
      <div className="relative md:hidden">
        {engineeringLessons.map((lesson, i) => (
          <MobileLessonCard
            key={lesson.title}
            index={i}
            total={engineeringLessons.length}
            title={lesson.title}
            body={lesson.body}
            active={active}
          />
        ))}
      </div>

      {/* Desktop / tablet: original sticky stack */}
      <div className="relative hidden md:block">
        {engineeringLessons.map((lesson, i) => (
          <LessonCard
            key={lesson.title}
            index={i}
            total={engineeringLessons.length}
            title={lesson.title}
            body={lesson.body}
            active={active}
            reduce={!!reduce}
          />
        ))}
      </div>
    </section>
  );
}

function MobileLessonCard({
  index,
  total,
  title,
  body,
  active,
}: {
  index: number;
  total: number;
  title: string;
  body: string;
  active: number;
}) {
  const isOdd = index % 2 === 1;

  return (
    <article
      className={cn(
        "border-y border-[var(--hairline)]",
        isOdd
          ? "bg-[color-mix(in_srgb,var(--cp-accent)_7%,var(--background))]"
          : "bg-[var(--background)]",
      )}
      style={{ zIndex: index + 1 }}
    >
      <div className="cosmic-band-inner relative py-8">
        <p
          aria-hidden
          className="pointer-events-none absolute right-4 top-4 select-none font-[family-name:var(--font-ibm-plex-mono)] text-[4.5rem] font-semibold leading-none tracking-tighter text-[color-mix(in_srgb,var(--cp-ink)_7%,transparent)]"
        >
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-medium tabular-nums text-[var(--cp-accent-2,var(--cp-accent))]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
        <h3 className="mt-3 max-w-[18ch] text-[clamp(1.45rem,6.5vw,2rem)] font-semibold leading-[1.08] tracking-tight text-[var(--cp-ink,var(--foreground))]">
          {title}
        </h3>
        <p className="mt-3 max-w-[46ch] text-[15px] leading-[1.65] text-[var(--cp-ink-soft,var(--muted))]">
          {body}
        </p>
        <div className="mt-6 flex gap-1.5" aria-hidden>
          {Array.from({ length: total }).map((_, dot) => (
            <span
              key={dot}
              className={cn(
                "h-1 rounded-full bg-[var(--cp-accent)] transition-all duration-300",
                dot === active ? "w-6 opacity-100" : "w-2 opacity-30",
              )}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function LessonCard({
  index,
  total,
  title,
  body,
  active,
  reduce,
}: {
  index: number;
  total: number;
  title: string;
  body: string;
  active: number;
  reduce: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 0.92],
  );
  const brightness = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1, 0.72],
  );

  const isOdd = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="relative h-[85vh] sm:h-[90vh]"
      style={{ zIndex: index + 1 }}
    >
      <motion.article
        style={
          reduce
            ? undefined
            : {
                scale,
                opacity: brightness,
              }
        }
        className={cn(
          "sticky top-16 flex h-[calc(85vh-4.5rem)] flex-col justify-end overflow-hidden border-y border-[var(--hairline)] sm:top-20 sm:h-[calc(90vh-5rem)]",
          isOdd
            ? "bg-[color-mix(in_srgb,var(--cp-accent)_7%,var(--background))]"
            : "bg-[var(--background)]",
        )}
      >
        <p
          aria-hidden
          className="pointer-events-none absolute -right-2 top-6 select-none font-[family-name:var(--font-ibm-plex-mono)] text-[clamp(6rem,22vw,14rem)] font-semibold leading-none tracking-tighter text-[color-mix(in_srgb,var(--cp-ink)_6%,transparent)] sm:right-4 sm:top-8"
        >
          {String(index + 1).padStart(2, "0")}
        </p>

        <div className="cosmic-band-inner relative pb-12 pt-20 sm:pb-16 sm:pt-24">
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-medium tabular-nums text-[var(--cp-accent-2,var(--cp-accent))]">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
          <h3 className="mt-4 max-w-[16ch] text-[clamp(1.85rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-[var(--cp-ink,var(--foreground))]">
            {title}
          </h3>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-[var(--cp-ink-soft,var(--muted))] sm:text-[17px]">
            {body}
          </p>

          <div className="mt-10 flex gap-1.5" aria-hidden>
            {Array.from({ length: total }).map((_, dot) => (
              <span
                key={dot}
                className={cn(
                  "h-1 rounded-full bg-[var(--cp-accent)] transition-all duration-300",
                  dot === active ? "w-7 opacity-100" : "w-2 opacity-30",
                )}
              />
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
