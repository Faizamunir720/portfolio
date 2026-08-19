"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const TITLE_COLORS = [
  "bg-[#2227F7] text-white",
  "bg-[#FF3B9B] text-black",
  "bg-[#24D44D] text-black",
  "bg-[#FFD635] text-black",
  "bg-[#00a0b5] text-white",
  "bg-[#ffa934] text-black",
  "bg-[#f478b0] text-black",
] as const;

type OsWindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  colorIndex?: number;
  meta?: string;
  onClose?: () => void;
};

export function OsWindow({
  title,
  children,
  className,
  bodyClassName,
  colorIndex = 0,
  meta,
  onClose,
}: OsWindowProps) {
  const bar = TITLE_COLORS[colorIndex % TITLE_COLORS.length];

  return (
    <div
      className={cn(
        "flex flex-col border-[3px] border-black bg-white text-black shadow-[6px_6px_0_#000]",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b-[3px] border-black px-3 py-2",
          bar,
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex shrink-0 gap-1" aria-hidden>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={onClose}
              className="h-3 w-3 border-2 border-black bg-[#FF3B9B]"
            />
            <span className="h-3 w-3 border-2 border-black bg-[#FFD635]" />
            <span className="h-3 w-3 border-2 border-black bg-[#24D44D]" />
          </span>
          <p className="truncate font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
            {title}
          </p>
        </div>
        {meta ? (
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-wider opacity-80">
            {meta}
          </span>
        ) : null}
      </div>
      <div className={cn("p-4 sm:p-5", bodyClassName)}>{children}</div>
    </div>
  );
}

export function PixelLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border-2 border-black bg-[#FFD635] px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-black",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PixelButton({
  children,
  className,
  href,
  onClick,
  type = "button",
  tone = "pink",
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  tone?: "pink" | "blue" | "green" | "yellow" | "white";
}) {
  const tones = {
    pink: "bg-[#FF3B9B]",
    blue: "bg-[#2227F7] text-white",
    green: "bg-[#24D44D]",
    yellow: "bg-[#FFD635]",
    white: "bg-white",
  };

  const classes = cn(
    "inline-flex cursor-pointer items-center justify-center border-[3px] border-black px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-black shadow-[4px_4px_0_#000] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    tones[tone],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
