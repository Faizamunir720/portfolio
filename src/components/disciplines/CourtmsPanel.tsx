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
import {
  BentoCard,
  StackIcons,
  panelLabel,
  panelMuted,
  panelTitle,
} from "./BentoCard";
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
    <div className="grid min-h-0 grid-cols-12 gap-2 sm:gap-3 lg:h-full lg:auto-rows-[minmax(0,1fr)] lg:gap-4">
      <ProjectShots
        title="CourtMS Screens"
        images={courtms.media.gallery}
        className="col-span-12 lg:col-span-4"
      />
      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-8">
        <p className={panelTitle}>5-State Case Lifecycle</p>
        <p className={`mt-1 ${panelMuted}`}>
          Handler-enforced transitions across the court queue
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
          {steps.map((label, i) => (
            <button
              key={label}
              type="button"
              onMouseEnter={() => setActive(i)}
              className="relative px-2.5 py-1.5 text-[11px] font-medium text-[var(--cp-ink,var(--foreground))] sm:px-3 sm:py-2 sm:text-xs"
            >
              {active === i ? (
                <motion.span
                  layoutId="courtStatePill"
                  className="absolute inset-0 border border-[color-mix(in_srgb,var(--cp-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--cp-accent)_10%,transparent)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              ) : (
                <span className="absolute inset-0 border border-[var(--hairline)]" />
              )}
              <span className="relative z-10">
                {i + 1}. {label}
              </span>
            </button>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center border border-[var(--hairline)] text-[var(--cp-accent)]">
            <Shield size={16} />
          </span>
          <div>
            <p className={panelTitle}>5-Role Boundaries</p>
            <p className={panelMuted}>JWT authorize portals</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {portals.map((p) => (
            <span
              key={p}
              className="inline-flex items-center justify-center gap-1.5 border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--cp-ink)_3%,transparent)] px-2 py-2.5 text-xs font-medium text-[var(--cp-ink,var(--foreground))]"
            >
              <KeyRound size={12} className="text-[var(--cp-accent)]" />
              {p}
            </span>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <div className="mb-2 inline-flex h-9 w-9 items-center justify-center border border-[var(--hairline)] text-[var(--cp-accent)]">
          <FileKey size={16} />
        </div>
        <p className={panelTitle}>JWT RBAC & Multer Gate</p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-[var(--cp-accent-2,var(--cp-accent))]">
          /api/documents/:id/download
        </p>
        <p className={`mt-2 ${panelMuted}`}>
          Ownership filters on every gated download
        </p>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className={`mb-3 ${panelLabel}`}>Stack & Database</p>
        <StackIcons
          items={[
            { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
            { name: "Express", Icon: SiExpress, color: "#94A3B8" },
            { name: "React", Icon: SiReact, color: "#61DAFB" },
            { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
          ]}
        />
      </BentoCard>
    </div>
  );
}
