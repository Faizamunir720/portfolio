"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles } from "lucide-react";
import { GiDna1 } from "react-icons/gi";
import { FaPython } from "react-icons/fa";
import { SiFlask, SiJinja } from "react-icons/si";
import { projects } from "@/data/site";
import { BentoCard, FlowNode, StackIcons } from "./BentoCard";
import { ProjectShots } from "./ProjectShots";

const careerlab = projects.find((p) => p.id === "careerlab")!;

const prologLines = [
  "% rules.pl • career pivot matching",
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
  "  \+ conflict(Plan).",
];

export function CareerlabPanel() {
  const [burnout, setBurnout] = useState(false);
  const score = burnout ? 62 : 87;

  return (
    <div className="grid grid-cols-12 gap-4 lg:auto-rows-[minmax(220px,1fr)] lg:gap-5">
      <ProjectShots
        title="CAREERLAB Screens"
        images={careerlab.media.gallery}
        className="col-span-12 lg:col-span-4"
        accent="violet"
      />
      <BentoCard className="col-span-12 flex min-h-[200px] flex-col overflow-hidden lg:col-span-8">
        <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-mono text-xs text-zinc-400">
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
                  <span className="text-violet-400/80">{line}</span>
                ) : line.includes(":-") || line.includes("skill") || line.includes("assign") ? (
                  <span>
                    <span className="text-emerald-300">
                      {line.split("(")[0]}
                    </span>
                    <span className="text-violet-200">
                      {line.includes("(") ? `(${line.split("(").slice(1).join("(")}` : ""}
                    </span>
                  </span>
                ) : (
                  <span className="text-zinc-400">{line || " "}</span>
                )}
              </p>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#13131A] to-transparent" />
        </div>
      </BentoCard>

      {/* Row 2: 4 + 4 + 4 */}
      <BentoCard className="col-span-12 flex flex-col items-center justify-center bg-gradient-to-br from-violet-900/30 to-purple-900/10 border-violet-500/30 lg:col-span-4">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-2 text-violet-300"
        >
          <GiDna1 size={28} />
        </motion.div>
        <div className="relative mb-3 flex h-20 w-20 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#a78bfa"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={264}
              animate={{ strokeDashoffset: [264, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
          <Sparkles className="absolute text-emerald-300" size={16} />
        </div>
        <p className="font-mono text-sm text-violet-100">Generation 40 / 40</p>
        <p className="mt-1 text-xs text-zinc-400">Population: 30</p>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className="text-sm font-semibold">Disruption Simulator</p>
        <p className="mt-1 text-xs text-zinc-400">Toggle stress scenarios</p>
        <label className="mt-3 flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-3 py-3">
          <span className="text-xs text-zinc-300">
            {burnout ? "Hiring Freeze" : "Burnout"}
          </span>
          <span className="relative inline-flex h-6 w-11 items-center">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={burnout}
              onChange={(e) => setBurnout(e.target.checked)}
            />
            <span className="absolute inset-0 rounded-full bg-zinc-700 transition peer-checked:bg-amber-500/80" />
            <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white transition peer-checked:translate-x-5" />
          </span>
        </label>
        <p className="mt-3 font-mono text-sm">
          Feasibility:{" "}
          <span className={score < 70 ? "text-amber-300" : "text-emerald-300"}>
            {score}%
          </span>
        </p>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-zinc-500">
          Core Tech Stack
        </p>
        <StackIcons
          items={[
            { name: "Python", Icon: FaPython, color: "#3776AB" },
            { name: "Flask", Icon: SiFlask, color: "#EEEEEE" },
            { name: "Prolog", Icon: BrainCircuit, color: "#A78BFA" },
            { name: "Jinja2", Icon: SiJinja, color: "#B41717" },
          ]}
        />
      </BentoCard>

      {/* Row 3: full width flow */}
      <BentoCard className="col-span-12 flex flex-col justify-center">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
          Multi-Stage Algorithm Flow
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {[
            ["Skills Input", "emerald"],
            ["Prolog KB", "violet"],
            ["CSP Backtracking", "violet"],
            ["Genetic Optimizer", "emerald"],
            ["Roadmap", "cyan"],
          ].map(([label, accent], i) => (
            <div key={label} className="flex items-center gap-2">
              <FlowNode label={label} accent={accent} />
              {i < 4 ? (
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-violet-400"
                  animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
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
