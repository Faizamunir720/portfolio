"use client";

import { motion } from "framer-motion";
import { Check, Database, Layers } from "lucide-react";
import { FaJava } from "react-icons/fa";
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

const finverse = projects.find((p) => p.id === "finverse")!;

const units = [
  "Wallet",
  "Trade",
  "Charts",
  "Orders",
  "Watchlist",
  "Options",
];

export function FinversePanel() {
  return (
    <div className="grid h-full grid-cols-12 gap-3 lg:auto-rows-[minmax(0,1fr)] lg:gap-4">
      <ProjectShots
        title="Finverse Screens"
        images={finverse.media.gallery}
        className="col-span-12 lg:col-span-4"
      />
      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-8">
        <p className={panelTitle}>12-Unit Vault Trail</p>
        <p className={`mt-1 ${panelMuted}`}>
          Curriculum-gated learning ladder across brokerage surfaces
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {units.map((u) => (
            <span
              key={u}
              className="inline-flex items-center gap-1.5 border border-[color-mix(in_srgb,var(--cp-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--cp-accent)_8%,transparent)] px-3 py-1.5 text-xs font-medium text-[var(--cp-ink,var(--foreground))]"
            >
              <Check
                size={12}
                className="text-[var(--cp-accent)]"
                aria-hidden
              />
              {u}
            </span>
          ))}
        </div>
        <p className={`mt-3 font-mono text-[11px] ${panelMuted}`}>
          Unlocked modules use accent chips · remaining units stay gated
        </p>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className={panelTitle}>Real-time Observer Loop</p>
        <div className="mt-3 flex flex-col gap-2">
          {[
            "PriceEngine Tick",
            "Stock Observers",
            "OrderEngine Check",
            "H2 DB",
          ].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <motion.span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cp-accent)]"
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
              />
              <FlowNode label={label} tone={i % 2 === 0 ? "accent" : "soft"} />
            </div>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className={panelTitle}>Options Settlement Math</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--cp-ink)_3%,transparent)] p-3">
            <p className="text-[10px] text-[var(--cp-ink-soft,var(--muted))]">
              Contract Multiplier
            </p>
            <p className="mt-1 text-xl font-semibold text-[var(--cp-ink,var(--foreground))]">
              100
            </p>
          </div>
          <div className="border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--cp-accent)_8%,transparent)] p-3">
            <p className="text-[10px] text-[var(--cp-ink-soft,var(--muted))]">
              Educational Premium
            </p>
            <p className="mt-1 text-xl font-semibold text-[var(--cp-ink,var(--foreground))]">
              2%
            </p>
          </div>
        </div>
        <p className={`mt-3 inline-flex items-center gap-2 ${panelMuted}`}>
          <span className="pulse-dot" />
          Settler thread: active
        </p>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className={`mb-3 ${panelLabel}`}>Java Desktop Tech Stack</p>
        <StackIcons
          items={[
            { name: "Java 17", Icon: FaJava, color: "#F89820" },
            { name: "Swing", Icon: Layers, color: "#94A3B8" },
            { name: "FlatLaf", Icon: Layers, color: "#94A3B8" },
            { name: "H2 DB", Icon: Database, color: "#60A5FA" },
            { name: "JFreeChart", Icon: Layers, color: "#94A3B8" },
          ]}
        />
      </BentoCard>
    </div>
  );
}
