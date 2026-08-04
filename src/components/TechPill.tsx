"use client";

import type { ComponentType } from "react";
import { FaJava, FaLock } from "react-icons/fa";
import {
  SiCplusplus,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiFlutter,
  SiGit,
  SiMongodb,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import { Binary, BrainCircuit, Code2, Database, Layers } from "lucide-react";

type TechIcon = ComponentType<{
  size?: number | string;
  color?: string;
  className?: string;
  "aria-hidden"?: boolean;
}>;

type TechMeta = {
  Icon: TechIcon;
  color: string;
};

const catalog: Record<string, TechMeta> = {
  Flutter: { Icon: SiFlutter, color: "#54C5F8" },
  React: { Icon: SiReact, color: "#61DAFB" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  Python: { Icon: SiPython, color: "#3776AB" },
  Flask: { Icon: SiFlask, color: "#EEEEEE" },
  "Node.js": { Icon: SiNodedotjs, color: "#339933" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  Firebase: { Icon: SiFirebase, color: "#FFCA28" },
  Java: { Icon: FaJava, color: "#F89820" },
  "Java 17": { Icon: FaJava, color: "#F89820" },
  "C++": { Icon: SiCplusplus, color: "#00599C" },
  Git: { Icon: SiGit, color: "#F05032" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Express: { Icon: SiExpress, color: "#FFFFFF" },
  FastAPI: { Icon: SiFastapi, color: "#009688" },
  JWT: { Icon: FaLock, color: "#EB5424" },
  "Web Crypto API": { Icon: FaLock, color: "#A78BFA" },
  Prolog: { Icon: BrainCircuit, color: "#F472B6" },
  CSP: { Icon: Layers, color: "#22D3EE" },
  "Genetic Algorithms": { Icon: Binary, color: "#34D399" },
  CatBoost: { Icon: BrainCircuit, color: "#FFCC00" },
  SHAP: { Icon: BrainCircuit, color: "#60A5FA" },
  Swing: { Icon: Layers, color: "#F89820" },
  "H2 DB": { Icon: Database, color: "#F0A800" },
  FlatLaf: { Icon: Layers, color: "#94A3B8" },
  JFreeChart: { Icon: Code2, color: "#38BDF8" },
};

export function resolveTech(name: string): TechMeta {
  return catalog[name] ?? { Icon: Code2, color: "#A1A1AA" };
}

export function TechPill({ name }: { name: string }) {
  const { Icon, color } = resolveTech(name);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200 transition-colors hover:border-white/20">
      <Icon size={13} color={color} aria-hidden />
      {name}
    </span>
  );
}

export { catalog as techIconCatalog };
