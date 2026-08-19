"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles } from "lucide-react";
import { GiDna1 } from "react-icons/gi";
import { FaPython } from "react-icons/fa";
import { SiFlask, SiJinja } from "react-icons/si";
import { projects } from "@/data/site";
import {
  BentoCard,
  FlowNode,
  StackIcons,
  panelLabel,
  panelMuted,
  panelTitle,
} from "./BentoCard";
import { ProjectShots } from "./ProjectShots";

const careerlab = projects.find((p) => p.id === "careerlab")!;

const prologLines = [
  "% rules.pl · career pivot matching",
  "skill(user, python).",
  "skill(user, flask).",
  "requires(backend, python).",
  "requires(backend, sql).",
  "pivot(Track) :- requires(Track, S), skill(user, S).",
  "",
  "% CSP backtracking scheduler",
  "assign([], [], []).",
  "assign([C|Cs], Caps, [Q|Qs]) :-",
  "  member(Q, Caps),",
  "  capacity(Q, Cap), Cap > 0,",
  "  assign(Cs, Caps, Qs).",
  "",
  "feasible(Plan) :-",
  "  csp_solve(Plan, Caps),",
  "  \\+ conflict(Plan).",
];

export function CareerlabPanel() {
  const [burnout, setBurnout] = useState(false);
  const score = burnout ? 62 : 87;

  return (
    <div className="grid h-full grid-cols-12 gap-3 lg:auto-rows-[minmax(0,1fr)] lg:gap-4">
      <ProjectShots
        title="CAREERLAB Screens"
        images={careerlab.media.gallery}
        className="col-span-12 lg:col-span-4"
      />
      <BentoCard className="col-span-12 flex h-full min-h-0 flex-col overflow-hidden lg:col-span-8">
        <div className="mb-3 flex items-center gap-2 border-b border-[var(--hairline)] pb-3">
          <span className="h-2 w-2 rounded-full bg-[color-mix(in_srgb,var(--cp-ink)_35%,transparent)]" />
          <span className="h-2 w-2 rounded-full bg-[color-mix(in_srgb,var(--cp-ink)_25%,transparent)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--cp-accent)]" />
          <span className={`ml-2 font-mono text-xs ${panelMuted}`}>
            Prolog Rules & CSP Solver
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden font-mono text-[11px] leading-5 sm:text-xs">
          <motion.div
            className="absolute inset-x-0"
            animate={{ y: ["0%", "-45%"] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {[...prologLines, ...prologLines].map((line, i) => (
              <p key={`${line}-${i}`} className="whitespace-pre">
                {line.startsWith("%") ? (
                  <span className="text-[var(--cp-accent-2,var(--cp-accent))]">
                    {line}
                  </span>
                ) : line.includes(":-") ||
                  line.includes("skill") ||
                  line.includes("assign") ? (
                  <span className="text-[var(--cp-ink,var(--foreground))]">
                    {line}
                  </span>
                ) : (
                  <span className="text-[var(--cp-ink-soft,var(--muted))]">
                    {line || " "}
                  </span>
                )}
              </p>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-[linear-gradient(to_top,var(--cp-card,var(--background)),transparent)]" />
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col items-center justify-center lg:col-span-4">
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-2 text-[var(--cp-accent)]"
        >
          <GiDna1 size={26} />
        </motion.div>
        <div className="relative mb-3 flex h-20 w-20 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="color-mix(in srgb, var(--cp-ink) 12%, transparent)"
              strokeWidth="7"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="var(--cp-accent)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={264}
              animate={{ strokeDashoffset: [264, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          <Sparkles
            className="absolute text-[var(--cp-accent-2,var(--cp-accent))]"
            size={16}
          />
        </div>
        <p className="font-mono text-sm text-[var(--cp-ink,var(--foreground))]">
          Generation 40 / 40
        </p>
        <p className={`mt-1 ${panelMuted}`}>Population: 30</p>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className={panelTitle}>Disruption Simulator</p>
        <p className={`mt-1 ${panelMuted}`}>Toggle stress scenarios</p>
        <label className="mt-3 flex cursor-pointer items-center justify-between gap-3 border border-[var(--hairline)] px-3 py-3">
          <span className="text-xs text-[var(--cp-ink,var(--foreground))]">
            {burnout ? "Hiring Freeze" : "Burnout"}
          </span>
          <span className="relative inline-flex h-6 w-11 items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={burnout}
              onChange={(e) => setBurnout(e.target.checked)}
            />
            <span className="absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--cp-ink)_18%,transparent)] transition peer-checked:bg-[var(--cp-accent)]" />
            <span className="absolute left-0.5 h-5 w-5 rounded-full bg-[var(--background)] transition peer-checked:translate-x-5" />
          </span>
        </label>
        <p className="mt-3 font-mono text-sm text-[var(--cp-ink,var(--foreground))]">
          Feasibility:{" "}
          <span className="text-[var(--cp-accent)]">{score}%</span>
        </p>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className={`mb-3 ${panelLabel}`}>Core Tech Stack</p>
        <StackIcons
          items={[
            { name: "Python", Icon: FaPython, color: "#3776AB" },
            { name: "Flask", Icon: SiFlask, color: "#94A3B8" },
            { name: "Prolog", Icon: BrainCircuit, color: "#94A3B8" },
            { name: "Jinja2", Icon: SiJinja, color: "#94A3B8" },
          ]}
        />
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center">
        <p className={panelLabel}>Multi-Stage Algorithm Flow</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {[
            "Skills Input",
            "Prolog KB",
            "CSP Backtracking",
            "Genetic Optimizer",
            "Roadmap",
          ].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <FlowNode label={label} tone={i % 2 === 0 ? "accent" : "soft"} />
              {i < 4 ? (
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--cp-accent)]"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </BentoCard>
    </div>
  );
}
