"use client";

import { StudioNav } from "@/themes/studio/StudioNav";
import { StudioHero } from "@/themes/studio/StudioHero";
import { StudioExperience } from "@/themes/studio/StudioExperience";
import { StudioSkills } from "@/themes/studio/StudioSkills";
import { StudioProjects } from "@/themes/studio/StudioProjects";
import { StudioDisciplines } from "@/themes/studio/StudioDisciplines";
import { StudioContact, StudioFooter } from "@/themes/studio/StudioContact";

/** Editorial / print-minimalism theme  -  anime.js motion, shared site.ts data. */
export function StudioHome() {
  return (
    <div className="studio-root min-h-full bg-[var(--st-paper)] text-[var(--st-ink)]">
      <StudioNav />
      <main>
        <StudioHero />
        <StudioExperience />
        <StudioSkills />
        <StudioProjects />
        <StudioDisciplines />
        <StudioContact />
      </main>
      <StudioFooter />
    </div>
  );
}
