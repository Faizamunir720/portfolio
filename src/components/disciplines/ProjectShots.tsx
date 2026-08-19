"use client";

import { useState } from "react";
import { BentoCard } from "./BentoCard";

export function ProjectShots({
  title,
  images,
  className = "col-span-12 lg:col-span-4",
}: {
  title: string;
  images: string[];
  className?: string;
  /** @deprecated ignored — theme accent only */
  accent?: string;
}) {
  const shots = images.filter(Boolean);
  const [active, setActive] = useState(0);

  if (!shots.length) {
    return (
      <BentoCard
        className={`${className} flex h-full min-h-[160px] items-center justify-center lg:min-h-0`}
      >
        <div className="px-4 text-center">
          <p className="text-sm font-semibold text-[var(--cp-ink,var(--foreground))]">
            {title}
          </p>
          <p className="mt-1 text-xs text-[var(--cp-ink-soft,var(--muted))]">
            Screenshots coming soon
          </p>
        </div>
      </BentoCard>
    );
  }

  return (
    <BentoCard
      className={`${className} flex h-full min-h-[160px] flex-col overflow-hidden !p-0 lg:min-h-0`}
    >
      <div className="relative z-10 flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center justify-between px-4 py-2.5">
          <p className="truncate text-xs font-semibold text-[var(--cp-ink,var(--foreground))] sm:text-sm">
            {title}
          </p>
          <div className="ml-2 flex shrink-0 gap-1">
            {shots.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show screenshot ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? "w-4 bg-[var(--cp-accent)]"
                    : "w-1.5 bg-[color-mix(in_srgb,var(--cp-ink)_25%,transparent)] hover:bg-[color-mix(in_srgb,var(--cp-ink)_40%,transparent)]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden bg-[color-mix(in_srgb,var(--cp-ink)_4%,var(--background))]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shots[active]}
            alt={`${title} screenshot ${active + 1}`}
            className="absolute inset-0 h-full w-full object-contain p-2"
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </BentoCard>
  );
}
