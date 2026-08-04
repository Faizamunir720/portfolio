"use client";

import { motion } from "framer-motion";
import { Check, Database, Layers } from "lucide-react";
import { FaJava } from "react-icons/fa";
import { projects } from "@/data/site";
import { BentoCard, FlowNode, StackIcons } from "./BentoCard";
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
    <div className="grid grid-cols-12 gap-4 lg:auto-rows-[minmax(220px,1fr)] lg:gap-5">
      {/* Row 1: 4 + 8 */}
      <ProjectShots
        title="Finverse Screens"
        images={finverse.media.gallery}
        className="col-span-12 lg:col-span-4"
        accent="amber"
      />
      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-8">
        <p className="text-sm font-semibold">12-Unit Vault Trail</p>
        <p className="mt-1 text-xs text-zinc-400">
          Curriculum-gated learning ladder across brokerage surfaces
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {units.map((u, i) => (
            <motion.span
              key={u}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-100"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(52,211,153,0)",
                  "0 0 16px 0 rgba(52,211,153,0.35)",
                  "0 0 0 0 rgba(52,211,153,0)",
                ],
              }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
            >
              <Check size={12} className="text-emerald-300" />
              {u}
            </motion.span>
          ))}
        </div>
        <p className="mt-3 font-mono text-[11px] text-amber-200/80">
          Unlocked modules glow mint • remaining units stay gated
        </p>
      </BentoCard>

      {/* Row 2: 4 + 4 + 4 */}
      <BentoCard className="col-span-12 flex flex-col justify-center bg-gradient-to-br from-amber-900/25 to-emerald-900/10 border-amber-500/25 lg:col-span-4">
        <p className="text-sm font-semibold">Real-time Observer Loop</p>
        <div className="mt-3 flex flex-col gap-2">
          {[
            ["PriceEngine Tick", "amber"],
            ["Stock Observers", "lime"],
            ["OrderEngine Check", "amber"],
            ["H2 DB", "lime"],
          ].map(([label, accent], i) => (
            <div key={label} className="flex items-center gap-2">
              <motion.span
                className="h-2 w-2 shrink-0 rounded-full bg-amber-300"
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.25 }}
              />
              <FlowNode label={label} accent={accent} />
            </div>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className="text-sm font-semibold">Options Settlement Math</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3">
            <p className="text-[10px] text-zinc-400">Contract Multiplier</p>
            <p className="mt-1 text-xl font-semibold text-amber-100">100</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-3">
            <p className="text-[10px] text-zinc-400">Educational Premium</p>
            <p className="mt-1 text-xl font-semibold text-emerald-100">2%</p>
          </div>
        </div>
        <p className="mt-3 inline-flex items-center gap-2 text-xs text-zinc-400">
          <span className="pulse-dot !bg-emerald-400" />
          Settler thread: active
        </p>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-zinc-500">
          Java Desktop Tech Stack
        </p>
        <StackIcons
          items={[
            { name: "Java 17", Icon: FaJava, color: "#F89820" },
            { name: "Swing", Icon: Layers, color: "#F89820" },
            { name: "FlatLaf", Icon: Layers, color: "#22D3EE" },
            { name: "H2 DB", Icon: Database, color: "#60A5FA" },
            { name: "JFreeChart", Icon: Layers, color: "#FACC15" },
          ]}
        />
      </BentoCard>
    </div>
  );
}
