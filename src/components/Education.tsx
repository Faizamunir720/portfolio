import { education } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function Education() {
  return (
    <Reveal className="h-full" delay={60}>
      <article className="bento-card relative h-full overflow-hidden p-5 lg:p-6">
        <div className="glow-orb -right-6 bottom-0 h-28 w-28 bg-amber-400/15" />
        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
          Education
        </p>
        <h2 className="mt-3 text-xl font-semibold">{education.role}</h2>
        <p className="mt-1 text-sm text-muted">{education.org}</p>
        <p className="mt-1 font-mono text-xs text-zinc-500">{education.period}</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          {education.points[0]}
        </p>
      </article>
    </Reveal>
  );
}
