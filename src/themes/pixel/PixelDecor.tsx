"use client";

import { cn } from "@/lib/utils";

export function PixelGridBg({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-[0.35]",
        className,
      )}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    />
  );
}

export function HalftoneOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light",
        className,
      )}
      style={{
        backgroundImage:
          "radial-gradient(circle, #fff 1px, transparent 1.5px)",
        backgroundSize: "6px 6px",
      }}
    />
  );
}

export function DoodleLayer({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full overflow-visible",
        className,
      )}
      fill="none"
    >
      <ellipse
        cx="12"
        cy="22"
        rx="7"
        ry="5"
        stroke="#FFD635"
        strokeWidth="0.4"
        strokeDasharray="1 1.2"
        opacity="0.75"
      />
      <path
        d="M78 16 C 82 26, 86 22, 90 32"
        stroke="#FF3B9B"
        strokeWidth="0.45"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M88 28 L90 32 L86 33"
        stroke="#FF3B9B"
        strokeWidth="0.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 70 l1.2 3 3.2 0.3 -2.4 2 0.9 3.2 -2.9 -1.7 -2.9 1.7 0.9 -3.2 -2.4 -2 3.2 -0.3 z"
        fill="#24D44D"
        opacity="0.85"
      />
      <path
        d="M60 76 c 2 3, 5 -2, 7 1 s 4 4, 6 0"
        stroke="#2227F7"
        strokeWidth="0.4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M7 48 l3 3 M10 48 l-3 3"
        stroke="#ffa934"
        strokeWidth="0.5"
      />
      <path
        d="M92 56 l2.5 2.5 M94.5 56 l-2.5 2.5"
        stroke="#f478b0"
        strokeWidth="0.5"
      />
      <circle cx="86" cy="78" r="1.6" stroke="#FFD635" strokeWidth="0.35" />
      <circle
        cx="86"
        cy="78"
        r="3.2"
        stroke="#FF3B9B"
        strokeWidth="0.3"
        strokeDasharray="0.6 0.8"
      />
    </svg>
  );
}

export function Scanlines({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] opacity-[0.07]",
        className,
      )}
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.55) 2px, rgba(0,0,0,0.55) 3px)",
      }}
    />
  );
}
