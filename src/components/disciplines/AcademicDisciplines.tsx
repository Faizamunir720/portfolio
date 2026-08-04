"use client";

import { useState, type ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const tabs: {
  id: "careerlab" | "forensiq" | "courtms" | "lahore-avm" | "finverse";
  label: string;
  Icon: TabIcon;
  project: string;
  Panel: ComponentType;
}[] = [
  {
    id: "careerlab",
    label: "AI & Knowledge Systems",
    Icon: BrainCircuit,
    project: "CAREERLAB.AI",
    Panel: CareerlabPanel,
  },
  {
    id: "forensiq",
    label: "Info Security & Crypto",
    Icon: ShieldCheck,
    project: "ForensiQ",
    Panel: ForensiqPanel,
  },
  {
    id: "courtms",
    label: "Distributed Web Systems",
    Icon: Globe2,
    project: "CourtMS",
    Panel: CourtmsPanel,
  },
  {
    id: "lahore-avm",
    label: "ML & Data Pipelines",
    Icon: LineChart,
    project: "Lahore AVM",
    Panel: LahoreAvmPanel,
  },
  {
    id: "finverse",
    label: "Desktop OOP & Systems",
    Icon: Monitor,
    project: "Finverse",
    Panel: FinversePanel,
  },
];

export function AcademicDisciplines() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("careerlab");
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const Panel = current.Panel;

  return (
    <section
      id="disciplines"
      className="mt-8 w-full py-12 sm:py-16 lg:mt-10"
    >
      <div className="mb-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
          Coursework systems
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Academic Disciplines & Systems Engineering
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-base">
          Deep-dive into custom system architectures, cryptographic security,
          and algorithmic logic across core Computer Science subjects.
        </p>
      </div>

      <div className="-mx-1 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2 px-1">
          {tabs.map((tab) => {
            const selected = tab.id === active;
            const Icon = tab.Icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className="relative rounded-full px-4 py-2.5 text-left text-sm transition"
              >
                {selected ? (
                  <motion.span
                    layoutId="disciplineTab"
                    className="absolute inset-0 rounded-full border border-white/15 bg-white/10 shadow-[0_0_24px_-8px_rgba(34,211,238,0.45)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10 flex flex-col">
                  <span
                    className={`inline-flex items-center gap-2 ${
                      selected ? "font-medium text-white" : "text-zinc-400"
                    }`}
                  >
                    <Icon
                      size={15}
                      className={
                        selected ? "text-cyan-300" : "text-zinc-500"
                      }
                      aria-hidden
                    />
                    {tab.label}
                  </span>
                  <span className="mt-0.5 pl-[23px] text-[11px] text-zinc-500">
                    {tab.project}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 [perspective:1400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18, rotateX: 6 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -12, rotateX: -4 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
