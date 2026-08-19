"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/site";
import { OsWindow, PixelLabel } from "@/themes/pixel/PixelPrimitives";
import { cn } from "@/lib/utils";

type SysId =
  | "careerlab"
  | "forensiq"
  | "courtms"
  | "lahore-avm"
  | "finverse";

const SYSTEMS: {
  id: SysId;
  label: string;
  color: string;
  titleColor: number;
}[] = [
  { id: "careerlab", label: "AI & Knowledge", color: "#FF3B9B", titleColor: 1 },
  { id: "forensiq", label: "InfoSec & Crypto", color: "#2227F7", titleColor: 0 },
  { id: "courtms", label: "Distributed Web", color: "#24D44D", titleColor: 2 },
  { id: "lahore-avm", label: "ML Pipelines", color: "#FFD635", titleColor: 3 },
  { id: "finverse", label: "Desktop OOP", color: "#ffa934", titleColor: 5 },
];

const COURT_STEPS = [
  "Submitted",
  "Registered",
  "Hearing",
  "Ongoing",
  "Closed",
];

const FINVERSE_UNITS = [
  "Wallet",
  "Trade",
  "Charts",
  "Orders",
  "Watchlist",
  "Options",
];

function CareerlabDemo() {
  const [burnout, setBurnout] = useState(false);
  const feasibility = burnout ? 62 : 87;
  const gen = 40;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider">
          Prolog · CSP · GA
        </p>
        <button
          type="button"
          onClick={() => setBurnout((v) => !v)}
          className={cn(
            "cursor-pointer border-2 border-black px-2 py-1 font-mono text-[10px] font-bold uppercase",
            burnout ? "bg-[#FF3B9B]" : "bg-[#24D44D]",
          )}
        >
          Burnout: {burnout ? "ON" : "OFF"}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { k: "Feasibility", v: `${feasibility}%` },
          { k: "Generation", v: `${gen}/40` },
          { k: "Population", v: "30" },
        ].map((m) => (
          <div
            key={m.k}
            className="border-2 border-black bg-[#F5F5F0] p-2 text-center"
          >
            <p className="font-mono text-[8px] uppercase tracking-wider text-black/50">
              {m.k}
            </p>
            <p className="mt-1 font-[family-name:var(--font-space-grotesk)] text-xl font-black">
              {m.v}
            </p>
          </div>
        ))}
      </div>
      <div className="border-2 border-black bg-black p-3 font-mono text-[11px] text-[#24D44D]">
        <p>{">"} match_track(ideal, fast, backup).</p>
        <p>{">"} schedule_csp(capacity=18).</p>
        <p className="text-[#FFD635]">
          {">"} ok. roadmap_ready({feasibility}).
          <span className="animate-pulse">_</span>
        </p>
      </div>
      <div className="h-3 border-2 border-black bg-white">
        <motion.div
          className="h-full bg-[#2227F7]"
          animate={{ width: `${feasibility}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      </div>
    </div>
  );
}

function ForensiqDemo() {
  const [verified, setVerified] = useState(false);
  const hash = useMemo(
    () =>
      verified
        ? "a3f9…c21e · MATCH"
        : "pending_sha256 · WAIT",
    [verified],
  );

  return (
    <div className="space-y-4">
      <div className="border-2 border-black bg-[#00001B] p-3 font-mono text-[11px] text-[#FFD635]">
        <p>INTAKE_LEDGER // RSA_SEAL</p>
        <p className="mt-2 text-white">hash: {hash}</p>
        <p className="text-[#24D44D]">roles: Investigator · Admin · Auditor</p>
      </div>
      <button
        type="button"
        onClick={() => setVerified((v) => !v)}
        className={cn(
          "w-full cursor-pointer border-[3px] border-black py-2.5 font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_#000]",
          verified ? "bg-[#24D44D]" : "bg-[#FF3B9B]",
        )}
      >
        {verified ? "✓ Integrity verified" : "Run SHA-256 check"}
      </button>
      <div className="grid grid-cols-3 gap-2 text-center font-mono text-[9px] font-bold uppercase">
        {["AES-GCM", "RSA-OAEP", "AUDIT"].map((t) => (
          <span key={t} className="border-2 border-black bg-[#ffef5a] py-2">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function CourtmsDemo() {
  const [step, setStep] = useState(0);

  return (
    <div className="space-y-4">
      <p className="font-mono text-[10px] font-bold uppercase tracking-wider">
        5-role lifecycle state machine
      </p>
      <div className="flex flex-wrap gap-1.5">
        {COURT_STEPS.map((s, i) => (
          <button
            key={s}
            type="button"
            onClick={() => setStep(i)}
            className={cn(
              "cursor-pointer border-2 border-black px-2 py-1 font-mono text-[9px] font-bold uppercase",
              i === step
                ? "bg-[#2227F7] text-white"
                : i < step
                  ? "bg-[#24D44D]"
                  : "bg-white",
            )}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="border-2 border-black bg-[#F5F5F0] p-3">
        <p className="font-mono text-[10px] uppercase text-black/50">Current</p>
        <p className="mt-1 font-[family-name:var(--font-space-grotesk)] text-2xl font-black">
          {COURT_STEPS[step]}
        </p>
        <p className="mt-2 text-sm">
          Citizen → Lawyer → Clerk → Judge → Admin · JWT boundaries enforced.
        </p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="cursor-pointer border-2 border-black bg-white px-3 py-1.5 font-mono text-[10px] font-bold uppercase disabled:opacity-40"
        >
          Prev
        </button>
        <button
          type="button"
          disabled={step === COURT_STEPS.length - 1}
          onClick={() => setStep((s) => Math.min(COURT_STEPS.length - 1, s + 1))}
          className="cursor-pointer border-2 border-black bg-[#FFD635] px-3 py-1.5 font-mono text-[10px] font-bold uppercase disabled:opacity-40"
        >
          Next state
        </button>
      </div>
    </div>
  );
}

function LahoreDemo() {
  const [locality, setLocality] = useState(12);
  const base = 5.0;
  const price = +(base + locality * 0.01).toFixed(2);
  const lo = +(price - 0.2).toFixed(2);
  const hi = +(price + 0.2).toFixed(2);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="border-2 border-black bg-[#2227F7] p-3 text-white">
          <p className="font-mono text-[9px] uppercase opacity-70">Estimate</p>
          <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-black">
            {price} Cr
          </p>
        </div>
        <div className="border-2 border-black bg-[#FFD635] p-3">
          <p className="font-mono text-[9px] uppercase opacity-70">90% range</p>
          <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-black">
            {lo}-{hi}
          </p>
        </div>
      </div>
      <label className="block">
        <span className="font-mono text-[10px] font-bold uppercase">
          Locality PPSF SHAP +{locality}%
        </span>
        <input
          type="range"
          min={0}
          max={25}
          value={locality}
          onChange={(e) => setLocality(Number(e.target.value))}
          className="mt-2 w-full accent-[#FF3B9B]"
        />
      </label>
      <div className="space-y-1">
        {[
          { label: "10 Marla", pct: 25, color: "#24D44D" },
          { label: "Locality", pct: locality, color: "#FF3B9B" },
          { label: "Age", pct: 8, color: "#2227F7" },
        ].map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="w-16 font-mono text-[9px] uppercase">{r.label}</span>
            <div className="h-3 flex-1 border border-black bg-white">
              <div
                className="h-full"
                style={{ width: `${r.pct * 3}%`, background: r.color }}
              />
            </div>
            <span className="w-8 text-right font-mono text-[9px]">+{r.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinverseDemo() {
  const [unlocked, setUnlocked] = useState(2);

  return (
    <div className="space-y-4">
      <p className="font-mono text-[10px] font-bold uppercase tracking-wider">
        12-unit Vault Trail · unlocked {unlocked}/{FINVERSE_UNITS.length}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {FINVERSE_UNITS.map((u, i) => {
          const on = i < unlocked;
          return (
            <button
              key={u}
              type="button"
              onClick={() => setUnlocked(i + 1)}
              className={cn(
                "cursor-pointer border-2 border-black px-2 py-3 text-left font-mono text-[10px] font-bold uppercase",
                on ? "bg-[#24D44D]" : "bg-white opacity-60",
              )}
            >
              <span className="block text-[8px] opacity-60">
                UNIT_{String(i + 1).padStart(2, "0")}
              </span>
              {on ? "✓ " : "○ "}
              {u}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-2 border-2 border-black bg-[#00001B] p-3 font-mono text-[10px] text-[#FFD635]">
        <span>MULT ×100</span>
        <span className="text-[#FF3B9B]">·</span>
        <span>PREMIUM 2%</span>
        <span className="text-[#FF3B9B]">·</span>
        <span>H2 · SWING</span>
      </div>
    </div>
  );
}

const DEMOS: Record<SysId, () => ReactNode> = {
  careerlab: CareerlabDemo,
  forensiq: ForensiqDemo,
  courtms: CourtmsDemo,
  "lahore-avm": LahoreDemo,
  finverse: FinverseDemo,
};

export function PixelDisciplines() {
  const [active, setActive] = useState<SysId>("careerlab");
  const reduce = useReducedMotion();
  const Demo = DEMOS[active];
  const meta = SYSTEMS.find((s) => s.id === active)!;
  const project = projects.find((p) => p.id === active);

  return (
    <section
      id="px-systems"
      className="border-b-[3px] border-black bg-[#00001B] px-3 py-12 sm:px-5 sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-8">
          <PixelLabel className="bg-[#FFD635] text-black">05 · SYSTEMS</PixelLabel>
          <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-black tracking-tight text-white sm:text-5xl">
            Desktop of disciplines
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
            Click a window icon to boot an interactive lab. Same projects,
            OS-skinned demos.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {SYSTEMS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={cn(
                "group flex w-[104px] cursor-pointer flex-col items-center gap-2 p-2",
                active === s.id && "bg-white/10",
              )}
            >
              <span
                className="flex h-12 w-12 items-center justify-center border-[3px] border-black font-mono text-xs font-black text-black shadow-[3px_3px_0_#000] transition-transform group-hover:translate-x-[1px] group-hover:translate-y-[1px]"
                style={{ background: s.color }}
              >
                {s.label.slice(0, 2).toUpperCase()}
              </span>
              <span className="text-center font-mono text-[9px] font-bold uppercase leading-tight tracking-wider text-white">
                {s.label}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"
          >
            <OsWindow
              title={`${meta.label.toLowerCase().replace(/\s+/g, "_")}.lab`}
              colorIndex={meta.titleColor}
              meta="INTERACTIVE"
            >
              <Demo />
            </OsWindow>

            <OsWindow title="readme.txt" colorIndex={4} meta="DOC">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#FF3B9B]">
                {project?.name}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-black">
                {project?.tagline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-black/75">
                {project?.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project?.tech.map((t) => (
                  <span
                    key={t}
                    className="border-2 border-black bg-[#ffef5a] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </OsWindow>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
