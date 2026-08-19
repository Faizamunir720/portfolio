"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Monitor, X } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { THEMES, type ThemeId } from "@/themes/registry";
import { cn } from "@/lib/utils";

type ThemeSwitcherProps = {
  variant?: "cosmic" | "pixel" | "studio";
  className?: string;
};

export function ThemeSwitcher({
  variant = "cosmic",
  className,
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointer = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isPixel = variant === "pixel";
  const isStudio = variant === "studio";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open theme selector"
        className={cn(
          "inline-flex items-center gap-2 cursor-pointer transition-transform",
          isPixel
            ? "border-2 border-black bg-[#FFD635] px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black shadow-[3px_3px_0_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
            : isStudio
              ? "border-b border-[#141414] pb-0.5 font-[family-name:var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[#141414] hover:text-[#1F4B3F]"
              : "icon-btn gap-0 px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-300",
        )}
      >
        {!isStudio && <Monitor size={isPixel ? 12 : 14} />}
        {isPixel ? "OS" : isStudio ? "Theme" : "Theme"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Theme selector"
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute right-0 top-[calc(100%+8px)] z-50 w-[240px] overflow-hidden",
              isPixel
                ? "border-2 border-black bg-white text-black shadow-[6px_6px_0_#000]"
                : isStudio
                  ? "border border-[#D6D1C7] bg-[#F7F5F0] text-[#141414] shadow-none"
                  : "rounded-2xl border border-white/15 bg-[#10121a]/95 text-zinc-100 shadow-2xl backdrop-blur-xl",
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between px-3 py-2",
                isPixel
                  ? "border-b-2 border-black bg-[#2227F7] text-white"
                  : isStudio
                    ? "border-b border-[#D6D1C7]"
                    : "border-b border-white/10 bg-white/5",
              )}
            >
              <div className="flex items-center gap-2">
                {isPixel && (
                  <span className="flex gap-1" aria-hidden>
                    <span className="h-2.5 w-2.5 border border-black bg-[#FF3B9B]" />
                    <span className="h-2.5 w-2.5 border border-black bg-[#FFD635]" />
                    <span className="h-2.5 w-2.5 border border-black bg-[#24D44D]" />
                  </span>
                )}
                <p
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.16em]",
                    isPixel
                      ? "font-bold"
                      : isStudio
                        ? "text-[#8A8A8A]"
                        : "text-zinc-400",
                  )}
                >
                  Theme.app
                </p>
              </div>
              <button
                type="button"
                aria-label="Close theme selector"
                onClick={() => setOpen(false)}
                className={cn(
                  "cursor-pointer p-0.5",
                  isPixel
                    ? "border border-black bg-white text-black hover:bg-[#FF3B9B]"
                    : isStudio
                      ? "text-[#8A8A8A] hover:text-[#141414]"
                      : "text-zinc-400 hover:text-white",
                )}
              >
                <X size={12} />
              </button>
            </div>

            <ul className="p-2 space-y-1.5">
              {THEMES.map((t) => {
                const active = theme === t.id;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setTheme(t.id as ThemeId);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex w-full cursor-pointer items-start gap-3 px-2.5 py-2 text-left transition-colors",
                        isPixel
                          ? cn(
                              "border-2 border-black",
                              active
                                ? "bg-[#FF3B9B] text-black shadow-[3px_3px_0_#000]"
                                : "bg-[#F5F5F0] hover:bg-[#ffef5a]",
                            )
                          : isStudio
                            ? cn(
                                "border border-transparent",
                                active
                                  ? "border-[#141414] bg-white"
                                  : "hover:bg-white/70",
                              )
                            : cn(
                                "rounded-xl",
                                active
                                  ? "bg-white/10 ring-1 ring-cyan-400/40"
                                  : "hover:bg-white/5",
                              ),
                      )}
                    >
                      <span className="mt-0.5 flex shrink-0 gap-0.5" aria-hidden>
                        {t.preview.map((c) => (
                          <span
                            key={c}
                            className={cn(
                              "h-3 w-3",
                              isPixel
                                ? "border border-black"
                                : isStudio
                                  ? "border border-[#D6D1C7]"
                                  : "rounded-sm",
                            )}
                            style={{ background: c }}
                          />
                        ))}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={cn(
                            "block text-xs font-semibold tracking-wide",
                            isPixel && "font-mono uppercase",
                            isStudio &&
                              "font-[family-name:var(--font-newsreader)]",
                          )}
                        >
                          {t.label}
                          {active ? " · ON" : ""}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 block text-[10px]",
                            isPixel
                              ? "text-black/70"
                              : isStudio
                                ? "text-[#8A8A8A]"
                                : "text-zinc-500",
                          )}
                        >
                          {t.subtitle}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p
              className={cn(
                "px-3 pb-2.5 font-mono text-[9px] uppercase tracking-wider",
                isPixel
                  ? "text-black/50"
                  : isStudio
                    ? "text-[#8A8A8A]"
                    : "text-zinc-600",
              )}
            >
              More skins soon
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
