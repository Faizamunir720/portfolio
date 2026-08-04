import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

type SectionShellProps = {
  id: string;
  index: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  index,
  title,
  children,
  className = "",
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`border-b border-hairline px-4 py-20 sm:px-6 sm:py-24 lg:py-28 ${className}`}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <header className="mb-10 flex flex-wrap items-baseline gap-x-4 gap-y-2 sm:mb-12">
            <span className="font-mono text-sm uppercase tracking-[0.22em] text-accent-bright">
              {index}
            </span>
            <h2
              id={`${id}-heading`}
              className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              {title}
            </h2>
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
