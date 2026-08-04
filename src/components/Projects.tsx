import { projects } from "@/data/site";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";

export function Projects() {
  return (
    <section id="work" className="mt-4 lg:mt-6">
      <Reveal>
        <div className="mb-4 px-1 lg:mb-6">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Featured work
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Recent projects.
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
