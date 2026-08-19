"use client";

import { cn } from "@/lib/utils";

/** Adapted from 21st.dev Pulsing Grid  -  monochrome ASCII video texture. */
export function AsciiArt({ className }: { className?: string }) {
  return (
    <video
      className={cn("block h-full w-full object-cover", className)}
      src="https://assets.21st.dev/ascii-recipes/videos/user_2nElBLvklOKlAURm6W1PTu6yYFh/d9e0e4bf-92cf-4d89-873b-70a2d4bb0bcb.mp4"
      poster="https://assets.21st.dev/ascii-recipes/thumbnails/user_2nElBLvklOKlAURm6W1PTu6yYFh/d173e473-b31e-4979-b5f7-4bc822d2b92b.webp"
      autoPlay
      loop
      muted
      playsInline
      aria-hidden
    />
  );
}
