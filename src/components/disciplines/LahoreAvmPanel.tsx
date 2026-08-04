"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { FaPython } from "react-icons/fa";
import { SiFastapi, SiFlask } from "react-icons/si";
import { projects } from "@/data/site";
import { BentoCard, FlowNode, StackIcons } from "./BentoCard";
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
    <div className="grid grid-cols-12 gap-4 lg:auto-rows-[minmax(220px,1fr)] lg:gap-5">
      {/* Row 1: 4 + 4 + 4 */}
      <ProjectShots
        title="Lahore AVM Screens"
        images={lahoreAvm.media.gallery}
        className="col-span-12 lg:col-span-4"
        accent="lime"
      />
      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className="text-sm font-semibold">Price Estimator</p>
        <p className="mt-1 text-xs text-zinc-400">90% conformal range</p>
        <p className="mt-4 text-3xl font-semibold tracking-tight text-lime-300">
          5.0 Cr
        </p>
        <p className="mt-1 text-sm text-zinc-400">4.8 Cr to 5.2 Cr</p>
        <button
          type="button"
          className="relative mt-4 h-3 w-full overflow-hidden rounded-full bg-white/10"
          onMouseEnter={() => setShowComps(true)}
          onMouseLeave={() => setShowComps(false)}
          aria-label="Show nearby comps"
        >
          <motion.div
            className="absolute inset-y-0 left-[18%] right-[18%] rounded-full bg-gradient-to-r from-lime-400/80 via-emerald-300 to-pink-400/70"
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
                  className="rounded-lg border border-pink-400/20 bg-pink-400/5 px-2 py-1.5"
                >
                  <p className="truncate text-[10px] text-zinc-400">{c.name}</p>
                  <p className="text-xs font-medium text-pink-100">{c.price}</p>
                </div>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className="text-sm font-semibold">SHAP • Why this number</p>
        <ul className="mt-3 space-y-1.5">
          {shap.map((s, i) => (
            <motion.li
              key={s.label}
              className={`flex items-center justify-between rounded-xl border px-3 py-1.5 text-xs ${
                s.good
                  ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                  : "border-amber-400/25 bg-amber-400/10 text-amber-100"
              }`}
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
            >
              <span>{s.label}</span>
              <span className="font-mono font-semibold">{s.value}</span>
            </motion.li>
          ))}
        </ul>
      </BentoCard>

      {/* Row 2: 6 + 6 */}
      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-6">
        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
          Scrape to Prediction Pipeline
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {[
            ["Zameen Scrape", "lime"],
            ["Feature Prep (H3/NLP)", "pink"],
            ["CatBoost Regressor", "lime"],
            ["MAPIE Intervals", "pink"],
          ].map(([label, accent], i) => (
            <div key={label} className="flex items-center gap-2">
              <FlowNode label={label} accent={accent} />
              {i < 3 ? (
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-lime-400"
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-6">
        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-zinc-500">
          Data Science Stack
        </p>
        <StackIcons
          items={[
            { name: "Python", Icon: FaPython, color: "#3776AB" },
            { name: "CatBoost", Icon: BrainCircuit, color: "#FFCC00" },
            { name: "MAPIE", Icon: BrainCircuit, color: "#F472B6" },
            { name: "SHAP", Icon: BrainCircuit, color: "#60A5FA" },
            { name: "FastAPI", Icon: SiFastapi, color: "#009688" },
            { name: "Flask", Icon: SiFlask, color: "#EEEEEE" },
          ]}
        />
      </BentoCard>
    </div>
  );
}
