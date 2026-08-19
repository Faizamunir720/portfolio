"use client";

import { useEffect, useState } from "react";
import {
  COSMIC_PALETTES,
  COSMIC_PALETTE_KEY,
  getCosmicPalette,
  type CosmicPaletteId,
} from "@/themes/cosmic/palettes";
import { cn } from "@/lib/utils";

function applyPalette(id: CosmicPaletteId) {
  const palette = getCosmicPalette(id);
  const root = document.documentElement;
  root.setAttribute("data-cosmic-palette", palette.id);
  root.style.colorScheme = palette.mode;
  Object.entries(palette.vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

/**
 * Temporary floating palette lab for Cosmic theme only.
 * Remove when you're done testing.
 */
export function CosmicPaletteTester() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<CosmicPaletteId>("original");

  useEffect(() => {
    const stored = localStorage.getItem(COSMIC_PALETTE_KEY);
    const next = getCosmicPalette(stored).id;
    setActive(next);
    applyPalette(next);
    return () => {
      // Leave vars if user stays on Cosmic; ThemeProvider will reset on theme switch.
    };
  }, []);

  const select = (id: CosmicPaletteId) => {
    setActive(id);
    localStorage.setItem(COSMIC_PALETTE_KEY, id);
    applyPalette(id);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-2">
      {open && (
        <div className="w-[min(92vw,320px)] rounded-2xl border border-white/15 bg-[var(--cp-card,#10121a)] p-3 shadow-2xl backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--cp-ink-soft)]">
              Palette lab · Cosmic only
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="cursor-pointer text-[10px] uppercase tracking-wider text-[var(--cp-ink-soft)] hover:text-[var(--cp-ink)]"
            >
              Close
            </button>
          </div>
          <ul className="max-h-[50vh] space-y-1.5 overflow-y-auto">
            {COSMIC_PALETTES.map((p) => {
              const on = active === p.id;
              return (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => select(p.id)}
                    className={cn(
                      "flex w-full cursor-pointer flex-col gap-1.5 rounded-xl border px-2.5 py-2 text-left transition",
                      on
                        ? "border-[var(--cp-accent)] bg-[var(--cp-chip)]"
                        : "border-[var(--hairline)] hover:border-[var(--cp-accent)]",
                    )}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[var(--cp-ink)]">
                        {p.label}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[var(--cp-ink-soft)]">
                        {p.mode}
                      </span>
                    </span>
                    <span className="flex gap-1" aria-hidden>
                      {p.swatches.map((c) => (
                        <span
                          key={c}
                          className="h-3.5 w-3.5 rounded-sm border border-black/20"
                          style={{ background: c }}
                        />
                      ))}
                    </span>
                    <span className="text-[10px] leading-snug text-[var(--cp-ink-soft)]">
                      {p.note}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-2 text-[9px] leading-snug text-[var(--cp-ink-soft)]">
            Temporary tester. Headings use ink · CTAs use accent pair · cards use
            surface. Saved in localStorage.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer rounded-full border border-white/20 bg-black/70 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur-md hover:bg-black/85"
        style={{
          background: "var(--cp-cta, #111)",
          color: "var(--cp-cta-fg, #fff)",
          borderColor: "var(--hairline)",
        }}
      >
        {open ? "Hide palettes" : "Try palettes"}
      </button>
    </div>
  );
}
