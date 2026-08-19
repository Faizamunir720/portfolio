"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { FaPython } from "react-icons/fa";
import { SiFastapi, SiFlask } from "react-icons/si";
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

const lahoreAvm = projects.find((p) => p.id === "lahore-avm")!;

const shap = [
  { label: "Locality PPSF", value: "+12%", good: true },
  { label: "10 Marla Area", value: "+25%", good: true },
  { label: "Furnished", value: "+5%", good: true },
  { label: "Older listing age", value: "-4%", good: false },
  { label: "Corner plot risk", value: "-2%", good: false },
];

const comps = [
  { name: "DHA Phase 5", price: "5.05 Cr" },
  { name: "Bahria Town", price: "4.92 Cr" },
  { name: "Askari 11", price: "5.10 Cr" },
];

export function LahoreAvmPanel() {
  const [showComps, setShowComps] = useState(false);

  return (
    <div className="grid h-full grid-cols-12 gap-3 lg:auto-rows-[minmax(0,1fr)] lg:gap-4">
      <ProjectShots
        title="Lahore AVM Screens"
        images={lahoreAvm.media.gallery}
        className="col-span-12 lg:col-span-4"
      />
      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className={panelTitle}>Price Estimator</p>
        <p className={`mt-1 ${panelMuted}`}>90% conformal range</p>
        <p className="mt-4 text-3xl font-semibold tracking-tight text-[var(--cp-ink,var(--foreground))]">
          5.0 Cr
        </p>
        <p className={`mt-1 text-sm ${panelMuted}`}>4.8 Cr to 5.2 Cr</p>
        <button
          type="button"
          className="relative mt-4 h-2.5 w-full overflow-hidden border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--cp-ink)_6%,transparent)]"
          onMouseEnter={() => setShowComps(true)}
          onMouseLeave={() => setShowComps(false)}
          aria-label="Show nearby comps"
        >
          <motion.div
            className="absolute inset-y-0 left-[18%] right-[18%] bg-[var(--cp-accent)]"
            layoutId="avmRange"
          />
        </button>
        <AnimatePresence>
          {showComps ? (
            <motion.div
              className="mt-2 grid grid-cols-3 gap-1.5"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
            >
              {comps.map((c) => (
                <div
                  key={c.name}
                  className="border border-[var(--hairline)] px-2 py-1.5"
                >
                  <p className="truncate text-[10px] text-[var(--cp-ink-soft,var(--muted))]">
                    {c.name}
                  </p>
                  <p className="text-xs font-medium text-[var(--cp-ink,var(--foreground))]">
                    {c.price}
                  </p>
                </div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className={panelTitle}>SHAP · Why this number</p>
        <ul className="mt-3 space-y-1.5">
          {shap.map((s) => (
            <li
              key={s.label}
              className={`flex items-center justify-between border px-3 py-1.5 text-xs ${
                s.good
                  ? "border-[color-mix(in_srgb,var(--cp-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--cp-accent)_8%,transparent)] text-[var(--cp-ink,var(--foreground))]"
                  : "border-[var(--hairline)] text-[var(--cp-ink-soft,var(--muted))]"
              }`}
            >
              <span>{s.label}</span>
              <span className="font-mono font-semibold">{s.value}</span>
            </li>
          ))}
        </ul>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-6">
        <p className={panelLabel}>Scrape to Prediction Pipeline</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {[
            "Zameen Scrape",
            "Feature Prep (H3/NLP)",
            "CatBoost Regressor",
            "MAPIE Intervals",
          ].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <FlowNode label={label} tone={i % 2 === 0 ? "accent" : "soft"} />
              {i < 3 ? (
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[var(--cp-accent)]"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-6">
        <p className={`mb-3 ${panelLabel}`}>Data Science Stack</p>
        <StackIcons
          items={[
            { name: "Python", Icon: FaPython, color: "#3776AB" },
            { name: "CatBoost", Icon: BrainCircuit, color: "#94A3B8" },
            { name: "MAPIE", Icon: BrainCircuit, color: "#94A3B8" },
            { name: "SHAP", Icon: BrainCircuit, color: "#94A3B8" },
            { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
            { name: "Flask", Icon: SiFlask, color: "#94A3B8" },
          ]}
        />
      </BentoCard>
    </div>
  );
}
