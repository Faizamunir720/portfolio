"use client";

import { PixelNav } from "@/themes/pixel/PixelNav";
import { PixelHero } from "@/themes/pixel/PixelHero";
import { PixelExperience } from "@/themes/pixel/PixelExperience";
import { PixelSkills } from "@/themes/pixel/PixelSkills";
import { PixelProjects } from "@/themes/pixel/PixelProjects";
import { PixelDisciplines } from "@/themes/pixel/PixelDisciplines";
import { PixelContact, PixelFooter } from "@/themes/pixel/PixelContact";

/** Y2K Pixel Brutalism experience  -  entirely different layout from Cosmic. */
export function PixelHome() {
  return (
    <div className="pixel-root min-h-full bg-[#00001B] text-black">
      <PixelNav />
      <main>
        <PixelHero />
        <PixelExperience />
        <PixelSkills />
        <PixelProjects />
        <PixelDisciplines />
        <PixelContact />
      </main>
      <PixelFooter />
    </div>
  );
}
