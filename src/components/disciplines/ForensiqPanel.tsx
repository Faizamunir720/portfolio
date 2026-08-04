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
import { BentoCard, StackIcons } from "./BentoCard";
import { ProjectShots } from "./ProjectShots";

const forensiq = projects.find((p) => p.id === "forensiq")!;

const hashes = [
  "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "a7ffc6f8bf1ed76651c14756a061d662f580ff4de43b49fa82d80a4b80f8434a",
  "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae",
  "fcde2b2edba56bf408601fb721fe9b5c338d10ee429ea04fae5511b68fbf8fb9",
];

const alerts = [
  { sev: "HIGH", msg: "ACL probe on sealed report endpoint", color: "text-rose-300 bg-rose-500/15" },
  { sev: "AUDIT", msg: "Chain hash append • intake ledger", color: "text-amber-300 bg-amber-500/15" },
  { sev: "INFO", msg: "Permission check: investigator read", color: "text-cyan-300 bg-cyan-500/15" },
  { sev: "HIGH", msg: "Phishing drill: unexpected token reuse", color: "text-rose-300 bg-rose-500/15" },
  { sev: "AUDIT", msg: "RSA seal verified for case FQ-204", color: "text-amber-300 bg-amber-500/15" },
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
    const id = window.setInterval(() => setTick((t) => (t + 1) % hashes.length), 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-4 lg:auto-rows-[minmax(220px,1fr)] lg:gap-5">
      {/* Row 1: 4 + 8 */}
      <ProjectShots
        title="ForensiQ Screens"
        images={forensiq.media.gallery}
        className="col-span-12 lg:col-span-4"
        accent="cyan"
      />
      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold">Live Chain of Custody Ledger</p>
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
            <span className="pulse-dot" />
            VERIFIED INTEGRITY
          </span>
        </div>
        <p className="mt-1 text-xs text-zinc-400">SHA-256 intake vs audit ledger</p>
        <div className="mt-3 space-y-1.5 font-mono text-[10px] sm:text-[11px]">
          {hashes.map((h, i) => (
            <button
              key={h}
              type="button"
              onMouseEnter={() => setHoverHash(i)}
              onMouseLeave={() => setHoverHash(null)}
              className={`block w-full truncate rounded-xl border px-3 py-1.5 text-left transition ${
                i === tick || hoverHash === i
                  ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-100"
                  : "border-white/10 bg-black/30 text-zinc-400"
              }`}
            >
              {h}
            </button>
          ))}
        </div>
      </BentoCard>

      {/* Row 2: 4 + 4 + 4 */}
      <BentoCard className="col-span-12 group flex flex-col justify-center bg-gradient-to-br from-cyan-900/30 to-blue-900/10 border-cyan-500/30 lg:col-span-4">
        <p className="text-sm font-semibold">Client-Side RSA Vault</p>
        <p className="mt-1 text-xs text-zinc-400">
          Offline RSA-OAEP keys • server-anchored trust
        </p>
        <div className="mt-4 flex flex-col items-center">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400/10 text-amber-300 transition group-hover:border-cyan-400/50 group-hover:bg-cyan-400/10 group-hover:text-cyan-300"
            whileHover={{ rotate: [0, -8, 8, 0] }}
          >
            <Lock className="block group-hover:hidden" size={26} />
            <LockOpen className="hidden group-hover:block" size={26} />
          </motion.div>
          <p className="mt-3 text-xs text-zinc-400 group-hover:text-cyan-200">
            Hover to decrypt
          </p>
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <div className="mb-2 flex items-center gap-2">
          <Shield size={16} className="text-cyan-300" />
          <p className="text-sm font-semibold">RBAC Matrix</p>
        </div>
        <div className="space-y-2">
          {roles.map((r) => (
            <div key={r.role}>
              <p className="text-xs font-medium text-zinc-300">{r.role}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {r.perms.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2 py-0.5 text-[11px] text-cyan-100"
                  >
                    <Check size={11} /> {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </BentoCard>

      <BentoCard className="col-span-12 flex flex-col justify-center lg:col-span-4">
        <p className="mb-3 text-xs uppercase tracking-[0.16em] text-zinc-500">
          Security Tech Stack
        </p>
        <StackIcons
          items={[
            { name: "React", Icon: SiReact, color: "#61DAFB" },
            { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
            { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
            { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
            { name: "Web Crypto", Icon: FaLock, color: "#22D3EE" },
          ]}
        />
      </BentoCard>

      {/* Row 3: full width alerts */}
      <BentoCard className="col-span-12 flex flex-col justify-center">
        <p className="text-sm font-semibold">Security Probes & Incidents</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {alerts.slice(0, 3).map((a, i) => (
            <motion.li
              key={`${a.msg}-${i}`}
              className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/25 px-3 py-2"
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.35 }}
            >
              <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${a.color}`}>
                {a.sev}
              </span>
              <span className="text-xs text-zinc-300">{a.msg}</span>
            </motion.li>
          ))}
        </ul>
      </BentoCard>
    </div>
  );
}
