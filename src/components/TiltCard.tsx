"use client";

import {
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees */
  maxTilt?: number;
};

/** Subtle 3D perspective tilt that follows the cursor. */
export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 22 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${springX}deg) rotateY(${springY}deg)`;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * maxTilt * 2);
    rotateY.set((px - 0.5) * maxTilt * 2);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transform, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor-hover
    >
      {children}
    </motion.div>
  );
}
