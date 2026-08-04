"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileKey, KeyRound, Shield } from "lucide-react";
import {
  SiExpress,
  SiMongodb,
  SiNodedotjs,
  SiReact,
} from "react-icons/si";
import { projects } from "@/data/site";
import { BentoCard, StackIcons } from "./BentoCard";
import { ProjectShots } from "./ProjectShots";

const courtms = projects.find((p) => p.id === "courtms")!;

const steps = [
  "Submitted",
  "Registered",
  "Hearing Scheduled",
  "Ongoing / Adjourned",
  "Closed",
];

const portals = ["Citizen", "Lawyer", "Clerk", "Judge", "Admin"];

export function CourtmsPanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % steps.length),
      1800,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 lg:auto-rows-[minmax(220px,1fr)] lg:gap-5">
      {/* Row 1: 4 + 8 */}
      <ProjectShots
        title="CourtMS Screens"
        images={courtms.media.gallery}
        className="col-span-12 lg:col-span-4"
        accent="blue"
      />
      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-8">
        <p className="text-sm font-semibold">5-State Case Lifecycle</p>
        <p className="mt-1 text-xs text-zinc-400">
          Handler-enforced transitions across the court queue
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {steps.map((label, i) => (
            <button
              key={label}
              type="button"
              onMouseEnter={() => setActive(i)}
              className="relative rounded-full px-3 py-2 text-xs font-medium text-zinc-300"
            >
              {active === i ? (
                <motion.span
                  layoutId="courtStatePill"
                  className="absolute inset-0 rounded-full border border-blue-400/40 bg-blue-500/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : (
                <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03]" />
              )}
              <span className="relative z-10">
                {i + 1}. {label}
              </span>
            </button>
          ))}
        </div>
      </BentoCard>

      {/* Row 2: 4 + 4 + 4 */}
      <BentoCard className="col-span-12 flex flex-col justify-center border-blue-500/25 lg:col-span-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-400/10 text-blue-300">
            <Shield size={16} />
          </span>
          <div>
            <p className="text-sm font-semibold">5-Role Boundaries</p>
            <p className="text-xs text-zinc-400">JWT authorize portals</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {portals.map((p) => (
            <span
              key={p}
              className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-indigo-400/25 bg-indigo-400/10 px-2 py-2.5 text-xs font-medium text-indigo-100"
            >
              <KeyRound size={12} />
              {p}
            </span>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
          <FileKey size={16} />
        </div>
        <p className="text-sm font-semibold">JWT RBAC & Multer Gate</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-cyan-200/90">
          /api/documents/:id/download
        </p>
        <p className="mt-2 text-xs text-zinc-400">
          Ownership filters on every gated download
        </p>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-zinc-500">
          Stack & Database
        </p>
        <StackIcons
          items={[
            { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
            { name: "Express", Icon: SiExpress, color: "#FFFFFF" },
            { name: "React", Icon: SiReact, color: "#61DAFB" },
            { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
          ]}
        />
      </BentoCard>
    </div>
  );
}
