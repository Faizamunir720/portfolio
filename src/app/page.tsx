import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ParticleBackground } from "@/components/ParticleBackground";
import { AcademicDisciplines } from "@/components/disciplines/AcademicDisciplines";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 mx-auto w-full max-w-[1440px] px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <section id="about-grid">
          <Hero />
        </section>

        <section className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-6">
          <Experience />
          <Education />
        </section>

        <TechStack />

        <Projects />
        <AcademicDisciplines />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-white/10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Faiza Munir</p>
          <p>Rawalpindi / Islamabad</p>
        </div>
      </footer>
    </>
  );
}
