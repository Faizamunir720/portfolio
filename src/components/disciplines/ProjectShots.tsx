"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BentoCard } from "./BentoCard";

export function ProjectShots({
  title,
  images,
  className = "col-span-12 lg:col-span-4",
  accent = "cyan",
}: {
  title: string;
  images: string[];
  className?: string;
  accent?: "cyan" | "violet" | "blue" | "lime" | "amber";
}) {
  const shots = images.filter(Boolean);
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    if (shots.length < 2) return;
    const id = window.setInterval(() => {
      setDir(1);
      setActive((i) => (i + 1) % shots.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [shots.length]);

  const dot: Record<string, string> = {
    cyan: "bg-cyan-400",
    violet: "bg-violet-400",
    blue: "bg-blue-400",
    lime: "bg-lime-400",
    amber: "bg-amber-400",
  };

  if (!shots.length) {
    return (
      <BentoCard
        className={`${className} flex h-[240px] items-center justify-center lg:h-[280px]`}
      >
        <div className="px-4 text-center">
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-xs text-zinc-500">Screenshots coming soon</p>
        </div>
      </BentoCard>
    );
  }

  return (
    <BentoCard
      className={`${className} flex h-[240px] flex-col overflow-hidden !p-0 lg:h-[280px]`}
    >
      <div className="relative z-10 flex h-full min-h-[240px] flex-col lg:min-h-[280px]">
        <div className="flex shrink-0 items-center justify-between px-4 py-2.5">
          <p className="truncate text-xs font-semibold sm:text-sm">{title}</p>
          <div className="ml-2 flex shrink-0 gap-1">
            {shots.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show screenshot ${i + 1}`}
                onClick={() => {
                  setDir(i > active ? 1 : -1);
                  setActive(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? `w-4 ${dot[accent]}`
                    : "w-1.5 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden bg-[#05060c]">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={shots[active]}
              src={shots[active]}
              alt={`${title} screenshot ${active + 1}`}
              className="absolute inset-0 h-full w-full object-contain p-2"
              initial={{ x: dir * 28, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir * -28, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              draggable={false}
            />
          </AnimatePresence>
        </div>
      </div>
    </BentoCard>
  );
}
