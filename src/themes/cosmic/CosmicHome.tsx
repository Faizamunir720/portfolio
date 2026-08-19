import { Education } from "@/components/Education";
import { EngineeringLessons } from "@/components/EngineeringLessons";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { AcademicDisciplines } from "@/components/disciplines/AcademicDisciplines";
import { Projects } from "@/components/Projects";
import { CosmicFooter } from "@/themes/cosmic/CosmicFooter";
import { CosmicSmoothScroll } from "@/themes/cosmic/CosmicSmoothScroll";

/**
 * Curtain reveal (clip-path + fixed footer under opaque sheet).
 * Footer typography deblurs on scroll; chrome/buttons stay sharp.
 */
export function CosmicHome() {
  return (
    <>
      <CosmicSmoothScroll />
      <Navbar />

      <div className="cosmic-curtain relative z-10 bg-[var(--background)]">
        <Hero />
        <main className="relative w-full bg-[var(--background)]">
          <Experience />
          <Education />
          <Projects />
          <AcademicDisciplines />
          <EngineeringLessons />
        </main>
      </div>

      <CosmicFooter />
    </>
  );
}
