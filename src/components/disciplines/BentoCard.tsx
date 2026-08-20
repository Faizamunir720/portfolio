"use client";

import { type CSSProperties, type ReactNode } from "react";

function splitCardClasses(className: string) {
  const parts = className.split(/\s+/).filter(Boolean);
  const outer: string[] = [];
  const inner: string[] = [];
  for (const p of parts) {
    if (
      /^(col-span|row-span|sm:col-span|md:col-span|lg:col-span|sm:row-span|md:row-span|lg:row-span|h-\[|min-h-\[|lg:h-\[|sm:h-\[|md:h-\[|h-full|min-h-full)/.test(
        p,
      )
    ) {
      outer.push(p);
    } else {
      inner.push(p);
    }
  }
  return { outer: outer.join(" "), inner: inner.join(" ") };
}

/** Flat discipline panel — hairline frame, surface tokens only. */
export function BentoCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const { outer, inner } = splitCardClasses(className);
  const isPadded = !inner.includes("!p-0");

  return (
    <div className={outer || "h-full"}>
      <div
        className={`h-full min-h-0 border border-[var(--hairline)] bg-[var(--cp-card,var(--background))] ${
          isPadded ? "p-4 sm:p-5" : ""
        } ${inner}`}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}

export function StackIcons({
  items,
}: {
  items: {
    name: string;
    Icon: React.ComponentType<{ size?: number; color?: string }>;
    color: string;
  }[];
}) {
  return (
    <div className="flex flex-wrap content-center items-center justify-center gap-3">
      {items.map(({ name, Icon, color }) => (
        <div key={name} className="flex flex-col items-center gap-1.5">
          <span className="flex h-10 w-10 items-center justify-center border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--cp-ink)_3%,transparent)]">
            <Icon size={18} color={color} />
          </span>
          <span className="text-[10px] font-medium text-[var(--cp-ink-soft,var(--muted))]">
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Theme-aware flow chip — accent only, no rainbow variants. */
export function FlowNode({
  label,
  tone = "accent",
}: {
  label: string;
  tone?: "accent" | "soft";
  /** @deprecated ignored — kept for call-site compatibility */
  accent?: string;
}) {
  return (
    <span
      className={
        tone === "soft"
          ? "inline-flex shrink-0 items-center border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--cp-ink)_4%,transparent)] px-3 py-1.5 text-xs font-medium text-[var(--cp-ink-soft,var(--muted))]"
          : "inline-flex shrink-0 items-center border border-[color-mix(in_srgb,var(--cp-accent)_35%,transparent)] bg-[color-mix(in_srgb,var(--cp-accent)_8%,transparent)] px-3 py-1.5 text-xs font-medium text-[var(--cp-ink,var(--foreground))]"
      }
    >
      {label}
    </span>
  );
}

export const panelLabel =
  "font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--cp-ink-soft,var(--muted))]";

export const panelTitle =
  "text-sm font-semibold text-[var(--cp-ink,var(--foreground))]";

export const panelMuted =
  "text-xs text-[var(--cp-ink-soft,var(--muted))]";
