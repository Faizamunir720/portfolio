"use client";

import { motion, useReducedMotion } from "framer-motion";
import { techNodes } from "@/data/site";
import { PixelLabel } from "@/themes/pixel/PixelPrimitives";

const CHIP_COLORS = [
  "bg-[#FF3B9B]",
  "bg-[#2227F7] text-white",
  "bg-[#FFD635]",
  "bg-[#24D44D]",
  "bg-[#ffa934]",
  "bg-[#00a0b5] text-white",
  "bg-[#f478b0]",
  "bg-white",
];

export function PixelSkills() {
  const reduce = useReducedMotion();

  return (
    <section className="border-b-[3px] border-black bg-[#00001B] px-3 py-12 sm:px-5 sm:py-16">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <PixelLabel>03 · TOOLKIT</PixelLabel>
            <h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-black tracking-tight text-white sm:text-4xl">
              Skill inventory
            </h2>
          </div>
          <p className="max-w-sm font-mono text-[11px] uppercase tracking-[0.14em] text-[#FFD635]/80">
            Hard borders · zero radius · press to invert
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {techNodes.map((node, i) => (
            <motion.button
              key={node.name}
              type="button"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
              whileTap={reduce ? undefined : { x: 3, y: 3 }}
              className={`group cursor-pointer border-[3px] border-black px-3 py-4 text-left shadow-[4px_4px_0_#000] transition-transform hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#000] ${CHIP_COLORS[i % CHIP_COLORS.length]}`}
            >
              <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.18em] opacity-60">
                NODE_{String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-2 block font-[family-name:var(--font-space-grotesk)] text-lg font-black tracking-tight">
                {node.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
