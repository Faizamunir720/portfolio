"use client";

import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  Globe2,
  LineChart,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import { CareerlabPanel } from "./CareerlabPanel";
import { ForensiqPanel } from "./ForensiqPanel";
import { CourtmsPanel } from "./CourtmsPanel";
import { LahoreAvmPanel } from "./LahoreAvmPanel";
import { FinversePanel } from "./FinversePanel";

type TabIcon = ComponentType<{ size?: number; className?: string }>;

const courseworkItems: {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  Icon: TabIcon;
  Panel: ComponentType;
}[] = [
  {
    id: "careerlab",
    category: "AI & Knowledge Systems",
    title: "CAREERLAB.AI",
    subtitle: "Probabilistic matching, Prolog rules, disruption simulator",
    Icon: BrainCircuit,
    Panel: CareerlabPanel,
  },
  {
    id: "forensiq",
    category: "Info Security & Crypto",
    title: "ForensiQ",
    subtitle: "Client-side RSA vault, chain-of-custody ledger, RBAC matrix",
    Icon: ShieldCheck,
    Panel: ForensiqPanel,
  },
  {
    id: "courtms",
    category: "Distributed Web Systems",
    title: "CourtMS",
    subtitle: "5-State case lifecycle, JWT & multitenant gate, role boundaries",
    Icon: Globe2,
    Panel: CourtmsPanel,
  },
  {
    id: "lahore-avm",
    category: "ML & Data Pipelines",
    title: "Lahore AVM",
    subtitle: "Real-time observer loop, SHAP explainability, feature pipeline",
    Icon: LineChart,
    Panel: LahoreAvmPanel,
  },
  {
    id: "finverse",
    category: "Desktop OOP & Systems",
    title: "Finverse",
    subtitle: "12-Unit vault trail, options settlement math, paper trading app",
    Icon: Monitor,
    Panel: FinversePanel,
  },
];

/**
 * Cosmic Engineering Journey:
 * - lg+: sticky viewport + scroll-driven horizontal track (desktop composition)
 * - <lg: normal vertical stack — sticky scrolljack + nested overflow freezes
 *   touch on phones; industry pattern is to drop pin/horizontal on mobile
 */
export function AcademicDisciplines() {
  return (
    <section
      id="disciplines"
      className="relative border-t border-[var(--hairline)] bg-[var(--background)]"
      aria-label="Engineering journey"
    >
      <MobileJourney />
      <DesktopJourney />
    </section>
  );
}

function JourneyHeader({
  title,
  category,
  index,
  total,
  progress,
}: {
  title: string;
  category: string;
  index: number;
  total: number;
  progress?: MotionValue<number>;
}) {
  return (
    <div className="cosmic-band-inner flex shrink-0 items-center justify-between gap-3 border-b border-[var(--hairline)] py-2.5 sm:gap-4 sm:py-3">
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cp-accent-2,var(--cp-accent))] sm:text-sm sm:tracking-[0.16em]">
          Engineering journey
        </p>
        <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-[var(--cp-ink-soft,var(--muted))] sm:line-clamp-1 sm:text-sm">
          <span className="text-[var(--cp-ink,var(--foreground))]">{title}</span>
          <span className="text-[var(--cp-ink-soft,var(--muted))]">
            {" "}
            · {category}
          </span>
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tabular-nums text-[var(--cp-ink-soft,var(--muted))]">
          {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </span>
        <div className="h-px w-14 overflow-hidden bg-[color-mix(in_srgb,var(--cp-ink)_12%,transparent)] sm:w-36">
          {progress ? (
            <motion.div
              className="h-full origin-left bg-[var(--cp-accent)]"
              style={{ scaleX: progress }}
            />
          ) : (
            <div
              className="h-full origin-left bg-[var(--cp-accent)]"
              style={{
                transform: `scaleX(${(index + 1) / total})`,
                transformOrigin: "left",
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function CardChrome({
  item,
  idx,
  total,
}: {
  item: (typeof courseworkItems)[number];
  idx: number;
  total: number;
}) {
  const Icon = item.Icon;
  return (
    <header className="flex shrink-0 items-start justify-between gap-3 border-b border-[var(--hairline)] px-3 py-2.5 sm:gap-4 sm:px-5 sm:py-3.5">
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase leading-snug tracking-[0.12em] text-[var(--cp-accent-2,var(--cp-accent))] sm:text-[11px] sm:tracking-[0.14em]">
          {String(idx + 1).padStart(2, "0")} // {item.category}
        </p>
        <h3 className="mt-1 flex items-center gap-2 text-base font-semibold tracking-tight text-[var(--cp-ink,var(--foreground))] sm:text-xl">
          <Icon
            size={16}
            className="shrink-0 text-[var(--cp-accent)]"
            aria-hidden
          />
          {item.title}
        </h3>
        <p className="mt-1 text-[12px] leading-snug text-[var(--cp-ink-soft,var(--muted))] sm:line-clamp-1 sm:text-[13px]">
          {item.subtitle}
        </p>
      </div>
      <span className="hidden font-[family-name:var(--font-ibm-plex-mono)] text-[11px] tabular-nums text-[var(--cp-ink-soft,var(--muted))] sm:inline">
        {idx + 1}/{total}
      </span>
    </header>
  );
}

/** Phone / tablet: document-flow cards — native vertical scroll only */
function MobileJourney() {
  return (
    <div className="lg:hidden">
      <div className="cosmic-band-inner border-b border-[var(--hairline)] py-5">
        <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--cp-accent-2,var(--cp-accent))]">
          Engineering journey
        </p>
        <p className="mt-1 text-[13px] text-[var(--cp-ink-soft,var(--muted))]">
          {courseworkItems.length} systems — scroll each card
        </p>
      </div>

      <div className="cosmic-band-inner space-y-5 py-5 pb-10">
        {courseworkItems.map((item, idx) => {
          const Panel = item.Panel;
          return (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden border border-[var(--hairline)] bg-[var(--background)]"
            >
              <CardChrome
                item={item}
                idx={idx}
                total={courseworkItems.length}
              />
              {/* Natural height — no nested scroll competing with the page */}
              <div className="px-2.5 py-2.5">
                <Panel />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/** Desktop: original sticky horizontal scrub */
function DesktopJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;
      const next = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setTravel(next);
    };

    measure();
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(measure)
        : null;
    if (viewportRef.current) ro?.observe(viewportRef.current);
    if (trackRef.current) ro?.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = courseworkItems.length;
    const idx = Math.min(n - 1, Math.max(0, Math.round(v * (n - 1))));
    setActiveIdx((prev) => (prev === idx ? prev : idx));
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const active = courseworkItems[activeIdx];

  return (
    <div ref={containerRef} className="relative hidden h-[280vh] lg:block">
      <div className="sticky top-0 flex h-dvh flex-col overflow-hidden">
        <JourneyHeader
          title={active.title}
          category={active.category}
          index={activeIdx}
          total={courseworkItems.length}
          progress={reduce ? undefined : progressScale}
        />

        <div
          ref={viewportRef}
          className={cn(
            "relative min-h-0 flex-1 py-4",
            reduce ? "overflow-x-auto overscroll-x-contain" : "overflow-hidden",
          )}
        >
          <motion.div
            ref={trackRef}
            style={reduce ? undefined : { x }}
            className="flex h-full gap-6 px-[clamp(1.25rem,4vw,3rem)]"
          >
            {courseworkItems.map((item, idx) => {
              const Panel = item.Panel;
              const shouldMount = Math.abs(idx - activeIdx) <= 1;

              return (
                <article
                  key={item.id}
                  className="flex h-full w-[min(92vw,1040px)] shrink-0 flex-col overflow-hidden border border-[var(--hairline)] bg-[var(--background)]"
                >
                  <CardChrome
                    item={item}
                    idx={idx}
                    total={courseworkItems.length}
                  />
                  <div className="min-h-0 flex-1 overflow-hidden px-4 py-4">
                    {shouldMount ? (
                      <Panel />
                    ) : (
                      <div className="h-full" aria-hidden />
                    )}
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
