"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { projects, type Project } from "@/data/site";
import { TechPill } from "@/components/TechPill";
import { GitHubIcon } from "@/components/SocialIcons";
import { RollingTextButton } from "@/components/RollingTextButton";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const springSoft = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
};

/**
 * Personal projects — Motion scroll patterns used across modern case-study sites:
 * - Section scroll progress (useScroll + useSpring)
 * - Per-project scroll-linked parallax / scale on media
 * - Sticky media column while case notes scroll (desktop)
 * - Scroll-triggered text reveals (whileInView)
 */
export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, springSoft);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative border-t border-[var(--hairline)]"
    >
      {/* Sticky reading progress — industry-standard scroll-linked cue */}
      <div
        className="pointer-events-none sticky top-0 z-20 h-[2px] w-full origin-left bg-[color-mix(in_srgb,var(--cp-ink)_8%,transparent)]"
        aria-hidden
      >
        <motion.div
          className="h-full origin-left bg-[var(--cp-accent)]"
          style={{ scaleX: reduce ? 0 : progress }}
        />
      </div>

      <div className="cosmic-band-inner cosmic-band pb-4 pt-10 lg:pt-14">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--cp-ink-soft,var(--muted))]">
            Featured work
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--cp-ink,var(--foreground))] sm:text-4xl">
            Personal projects
          </h2>
          <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-[var(--cp-ink-soft,var(--muted))] sm:text-base">
            Case notes inline: problem, approach, and constraints. Scroll to
            drive the media.
          </p>
        </motion.div>
      </div>

      <div>
        {projects.map((project, i) => (
          <ProjectCase
            key={project.id}
            project={project}
            index={i}
            flip={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCase({
  project,
  index,
  flip,
}: {
  project: Project;
  index: number;
  flip: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const hasMedia = Boolean(project.media.cover);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, springSoft);

  // Scroll-linked parallax (media slower depth layer)
  const mediaY = useTransform(
    smooth,
    [0, 1],
    reduce ? [0, 0] : [72, -72],
  );
  const mediaScale = useTransform(
    smooth,
    [0, 0.45, 1],
    reduce ? [1, 1, 1] : [0.94, 1, 0.96],
  );
  const mediaGlow = useTransform(
    smooth,
    [0, 0.5, 1],
    reduce ? [0.55, 0.55, 0.55] : [0.55, 1, 0.65],
  );

  // Copy drifts opposite for depth
  const copyY = useTransform(
    smooth,
    [0, 1],
    reduce ? [0, 0] : [36, -36],
  );

  return (
    <article
      ref={ref}
      className="border-t border-[var(--hairline)]"
      aria-labelledby={`project-${project.id}`}
    >
      <div className="cosmic-band-inner grid items-start gap-8 py-14 lg:grid-cols-2 lg:gap-14 lg:py-20">
        {/* Media — sticky + scroll-linked */}
        <div
          className={cn(
            "lg:sticky lg:top-24 lg:self-start",
            flip && "lg:order-2",
          )}
        >
          <motion.div
            style={
              reduce
                ? undefined
                : { y: mediaY, scale: mediaScale, opacity: mediaGlow }
            }
            className="will-change-transform"
          >
            {hasMedia ? (
              <div className="overflow-hidden border border-[var(--hairline)] bg-[var(--cp-card,var(--background))]">
                {project.media.video ? (
                  <video
                    className="aspect-[16/10] w-full object-cover"
                    src={project.media.video}
                    poster={project.media.cover}
                    muted
                    loop
                    playsInline
                    autoPlay
                    aria-label={`${project.name} demo`}
                  />
                ) : (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={project.media.cover}
                      alt={`${project.name} screenshot`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex aspect-[16/10] items-center justify-center border border-dashed border-[var(--hairline)] bg-[color-mix(in_srgb,var(--cp-ink)_3%,transparent)] px-6 text-center">
                <div>
                  <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--cp-ink-soft,var(--muted))]">
                    Typographic plate
                  </p>
                  <p className="mt-3 text-2xl font-semibold tracking-tight text-[var(--cp-ink,var(--foreground))]">
                    {project.name}
                  </p>
                  <p className="mt-2 text-sm text-[var(--cp-ink-soft,var(--muted))]">
                    {project.category}
                  </p>
                </div>
              </div>
            )}
            <p className="mt-3 font-[family-name:var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--cp-ink-soft,var(--muted))]">
              Fig. {String(index + 1).padStart(2, "0")} · {project.category}
              {project.attribution ? ` · ${project.attribution}` : ""}
            </p>
          </motion.div>

          {/* Per-project progress tick */}
          {!reduce && (
            <ProjectProgress progress={smooth} className="mt-5 hidden lg:block" />
          )}
        </div>

        {/* Case notes */}
        <motion.div
          className={cn("min-w-0", flip && "lg:order-1")}
          style={reduce ? undefined : { y: copyY }}
        >
          <motion.p
            className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] font-medium uppercase tracking-[0.16em] text-[var(--cp-accent-2,var(--cp-accent))]"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4, ease: easeOut }}
          >
            {String(index + 1).padStart(2, "0")}
          </motion.p>

          <motion.h3
            id={`project-${project.id}`}
            className="mt-2 text-2xl font-semibold tracking-tight text-[var(--cp-ink,var(--foreground))] sm:text-3xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: 0.04, ease: easeOut }}
          >
            {project.name}
          </motion.h3>

          <motion.p
            className="mt-3 text-[16px] leading-relaxed text-[var(--cp-ink,var(--foreground))] sm:text-[17px]"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: 0.06, ease: easeOut }}
          >
            {project.tagline}
          </motion.p>

          <p className="mt-3 text-[15px] leading-relaxed text-[var(--cp-ink-soft,var(--muted))]">
            {project.summary}
          </p>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--cp-ink-soft,var(--muted))]">
                Problem
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--cp-ink,var(--foreground))]">
                {project.problem}
              </p>
            </div>
            <div>
              <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--cp-ink-soft,var(--muted))]">
                Hardest part
              </p>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--cp-ink,var(--foreground))]">
                {project.hardest}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--cp-ink-soft,var(--muted))]">
              Approach
            </p>
            <ul className="mt-2 space-y-2">
              {project.approach.map((step, stepI) => (
                <motion.li
                  key={step}
                  className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--cp-ink,var(--foreground))]"
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{
                    duration: 0.35,
                    delay: stepI * 0.05,
                    ease: easeOut,
                  }}
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cp-accent)]"
                    aria-hidden
                  />
                  {step}
                </motion.li>
              ))}
            </ul>
          </div>

          <p className="mt-6 border-l-2 border-[var(--hairline)] pl-3.5 text-[13px] leading-relaxed text-[var(--cp-ink-soft,var(--muted))]">
            <span className="font-medium text-[var(--cp-ink,var(--foreground))]">
              Honesty ·{" "}
            </span>
            {project.honesty}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <TechPill key={t} name={t} />
            ))}
          </div>

          {project.github !== "#" && (
            <RollingTextButton
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              label="Repository"
              rollLabel="Open on GitHub"
              icon={<GitHubIcon size={14} />}
              className="mt-6 text-sm text-[var(--cp-ink-soft,var(--muted))] transition hover:text-[var(--cp-ink,var(--foreground))]"
            />
          )}
        </motion.div>
      </div>
    </article>
  );
}

function ProjectProgress({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-[2px] w-full origin-left overflow-hidden bg-[color-mix(in_srgb,var(--cp-ink)_10%,transparent)]",
        className,
      )}
      aria-hidden
    >
      <motion.div
        className="h-full origin-left bg-[var(--cp-accent-2,var(--cp-accent))]"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
