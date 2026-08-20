"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { contact } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { HeroGridCanvas } from "@/components/HeroGridCanvas";
import { RollingTextButton } from "@/components/RollingTextButton";

/** Headline as black canvas pixels — readable on the light grid, no card behind it. */
function CanvasHeadline() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const paint = () => {
      const w = parent.clientWidth;
      if (w < 8) return;
      const line = Math.max(36, Math.min(Math.round(w * 0.155), 76));
      const h = Math.round(line * 2.35);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000000";
      ctx.font = `800 ${line}px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.textBaseline = "top";
      ctx.fillText("Systems that", 0, 0);
      ctx.fillText("hold.", 0, line * 1.05);
    };

    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return (
    <canvas
      ref={ref}
      className="block max-w-full"
      role="img"
      aria-label="Systems that hold."
    />
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate h-[68svh] min-h-[440px] max-h-[620px] w-full overflow-hidden sm:h-[72svh] sm:min-h-[480px] sm:max-h-[680px] lg:h-[74svh] lg:max-h-[720px]"
      aria-label="Introduction"
    >
      <HeroGridCanvas />

      <div className="pointer-events-none absolute inset-0 z-20">
        <motion.div
          className="pointer-events-auto absolute left-4 top-[20%] z-20 max-w-[calc(100%-5.5rem)] sm:left-8 sm:top-[24%] sm:max-w-none lg:left-12 lg:top-[26%]"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{ isolation: "isolate", mixBlendMode: "normal" }}
        >
          <h1 className="m-0 max-w-[16ch] p-0 leading-none sm:max-w-[18ch]">
            <CanvasHeadline />
          </h1>

          <div className="relative z-20 mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
            <RollingTextButton
              href="#work"
              label="View Projects"
              rollLabel="See the work"
              className="rounded-full bg-[#05060c] px-3.5 py-2 text-[13px] font-semibold text-[#f4f4f5] sm:px-5 sm:py-2.5 sm:text-sm"
            />
            <RollingTextButton
              href="#"
              label="Download CV"
              rollLabel="Get the PDF"
              showChevron={false}
              icon={<Download size={14} color="#000000" />}
              className="rounded-full border-2 border-[#000000] bg-[#f4f4f5] px-3.5 py-2 text-[13px] font-semibold text-[#000000] sm:px-5 sm:py-2.5 sm:text-sm"
            />
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#000000] bg-[#f4f4f5] sm:h-10 sm:w-10"
              aria-label="GitHub"
            >
              <GitHubIcon size={15} color="#000000" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#000000] bg-[#f4f4f5] sm:h-10 sm:w-10"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={15} color="#000000" />
            </a>
          </div>
        </motion.div>

        <div className="pointer-events-none absolute bottom-4 right-4 z-20 flex flex-col items-end gap-1.5 sm:bottom-7 sm:right-8 sm:gap-2 lg:right-12">
          {!reduce ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gifs/hero-wave.gif"
                alt=""
                width={140}
                height={147}
                className="h-[72px] w-auto select-none drop-shadow-md sm:h-[120px] lg:h-[136px]"
                decoding="async"
                aria-hidden
              />
            </motion.div>
          ) : null}
          <motion.p
            className="max-w-[20ch] text-right text-[11px] leading-relaxed text-[#f4f4f5] sm:max-w-[34ch] sm:text-sm"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Helping products ship end-to-end web systems, desktop trading
            platforms, and mobile apps with architecture that survives real
            constraints.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
