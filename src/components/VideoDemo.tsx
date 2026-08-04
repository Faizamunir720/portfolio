"use client";

import { useEffect, useRef } from "react";

/** Autoplaying muted demo video locked to 2× playback. */
export function VideoDemo({
  src,
  poster,
  className = "",
  fit = "contain",
}: {
  src: string;
  poster?: string;
  className?: string;
  fit?: "contain" | "cover";
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.loop = true;

    const lockRate = () => {
      if (el.playbackRate !== 2) el.playbackRate = 2;
      if (el.defaultPlaybackRate !== 2) el.defaultPlaybackRate = 2;
    };

    const tryPlay = () => {
      lockRate();
      const p = el.play();
      if (p) void p.catch(() => {});
    };

    lockRate();
    tryPlay();

    el.addEventListener("loadedmetadata", tryPlay);
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("play", lockRate);
    el.addEventListener("ratechange", lockRate);
    el.addEventListener("seeking", lockRate);

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) tryPlay();
                else el.pause();
              }
            },
            { threshold: 0.2 },
          )
        : null;

    io?.observe(el);

    return () => {
      io?.disconnect();
      el.removeEventListener("loadedmetadata", tryPlay);
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      el.removeEventListener("play", lockRate);
      el.removeEventListener("ratechange", lockRate);
      el.removeEventListener("seeking", lockRate);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      aria-label="Project demonstration at 2x speed"
    />
  );
}
