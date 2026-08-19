"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, LockOpen, Shield } from "lucide-react";
import { FaLock } from "react-icons/fa";
import {
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
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

const forensiq = projects.find((p) => p.id === "forensiq")!;

const hashes = [
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
  "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae",
  "fcde2b2edba56bf408601fb721fe9b5c338d10ee429ea04fae5511b68fbf8fb9",
];

const alerts = [
  { sev: "HIGH", msg: "ACL probe on sealed report endpoint" },
  { sev: "AUDIT", msg: "Chain hash append · intake ledger" },
  { sev: "INFO", msg: "Permission check: investigator read" },
];

const roles = [
  { role: "Investigator", perms: ["Intake", "View", "Seal"] },
  { role: "Admin", perms: ["Users", "Audit", "Keys"] },
  { role: "Auditor", perms: ["Ledger", "Export"] },
];

export function ForensiqPanel() {
  const [tick, setTick] = useState(0);
  const [hoverHash, setHoverHash] = useState<number | null>(null);

  useEffect(() => {
    const id = window.setInterval(
      () => setTick((t) => (t + 1) % hashes.length),
      2200,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid min-h-0 grid-cols-12 gap-2 sm:gap-3 lg:h-full lg:auto-rows-[minmax(0,1fr)] lg:gap-4">
      <ProjectShots
        title="ForensiQ Screens"
        images={forensiq.media.gallery}
        className="col-span-12 lg:col-span-4"
      />
      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={panelTitle}>Live Chain of Custody Ledger</p>
          <span className="inline-flex items-center gap-2 border border-[color-mix(in_srgb,var(--cp-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--cp-accent)_8%,transparent)] px-3 py-1 text-[11px] font-medium text-[var(--cp-ink,var(--foreground))]">
            <span className="pulse-dot" />
            VERIFIED INTEGRITY
          </span>
        </div>
        <p className={`mt-1 ${panelMuted}`}>SHA-256 intake vs audit ledger</p>
        <div className="mt-3 space-y-1.5 font-mono text-[10px] sm:text-[11px]">
          {hashes.map((h, i) => (
            <button
              key={h}
              type="button"
              onMouseEnter={() => setHoverHash(i)}
              onMouseLeave={() => setHoverHash(null)}
              className={`block w-full truncate border px-3 py-1.5 text-left transition ${
                i === tick || hoverHash === i
                  ? "border-[color-mix(in_srgb,var(--cp-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--cp-accent)_10%,transparent)] text-[var(--cp-ink,var(--foreground))]"
                  : "border-[var(--hairline)] text-[var(--cp-ink-soft,var(--muted))]"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="group col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className={panelTitle}>Client-Side RSA Vault</p>
        <p className={`mt-1 ${panelMuted}`}>
          Offline RSA-OAEP keys · server-anchored trust
        </p>
        <div className="mt-4 flex flex-col items-center">
          <motion.div
            className="flex h-16 w-16 items-center justify-center border border-[var(--hairline)] text-[var(--cp-accent)] transition group-hover:border-[color-mix(in_srgb,var(--cp-accent)_45%,transparent)] group-hover:bg-[color-mix(in_srgb,var(--cp-accent)_8%,transparent)]"
            whileHover={{ rotate: [0, -6, 6, 0] }}
          >
            <Lock className="block group-hover:hidden" size={26} />
            <LockOpen className="hidden group-hover:block" size={26} />
          </motion.div>
          <p className={`mt-3 ${panelMuted}`}>Hover to decrypt</p>
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <div className="mb-2 flex items-center gap-2">
          <Shield size={16} className="text-[var(--cp-accent)]" />
          <p className={panelTitle}>RBAC Matrix</p>
        </div>
        <div className="space-y-2">
          {roles.map((r) => (
            <div key={r.role}>
              <p className="text-xs font-medium text-[var(--cp-ink,var(--foreground))]">
                {r.role}
              </p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {r.perms.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 border border-[var(--hairline)] px-2 py-0.5 text-[11px] text-[var(--cp-ink-soft,var(--muted))]"
                  >
                    <Check size={11} className="text-[var(--cp-accent)]" /> {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className={`mb-3 ${panelLabel}`}>Security Tech Stack</p>
        <StackIcons
          items={[
            { name: "React", Icon: SiReact, color: "#61DAFB" },
            { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
            { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
            { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
            { name: "Web Crypto", Icon: FaLock, color: "#94A3B8" },
          ]}
        />
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center">
        <p className={panelTitle}>Security Probes & Incidents</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {alerts.map((a, i) => (
            <motion.li
              key={`${a.msg}-${i}`}
              className="flex items-start gap-2 border border-[var(--hairline)] px-3 py-2"
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.35 }}
            >
              <span className="border border-[color-mix(in_srgb,var(--cp-accent)_30%,transparent)] bg-[color-mix(in_srgb,var(--cp-accent)_8%,transparent)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--cp-ink,var(--foreground))]">
                {a.sev}
              </span>
              <span className="text-xs text-[var(--cp-ink-soft,var(--muted))]">
                {a.msg}
              </span>
            </motion.li>
          ))}
        </ul>
      </BentoCard>
    </div>
  );
}
