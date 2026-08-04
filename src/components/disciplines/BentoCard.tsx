"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

function splitCardClasses(className: string) {
  const parts = className.split(/\s+/).filter(Boolean);
  const outer: string[] = [];
  const inner: string[] = [];
  for (const p of parts) {
    if (
      /^(col-span|row-span|sm:col-span|md:col-span|lg:col-span|sm:row-span|md:row-span|lg:row-span|h-\[|min-h-\[|lg:h-\[|sm:h-\[|md:h-\[|h-full|min-h-full)/.test(
        p,
      )
    ) {
      outer.push(p);
    } else {
      inner.push(p);
    }
  }
  return { outer: outer.join(" "), inner: inner.join(" ") };
}

/** Premium 3D glass bento card with pointer tilt + specular glare. */
export function BentoCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const { outer, inner } = splitCardClasses(className);
  const isPadded = !inner.includes("!p-0");

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const springX = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const springY = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });

  const rotateX = useTransform(springY, [0, 1], [9, -9]);
  const rotateY = useTransform(springX, [0, 1], [-11, 11]);
  const glareX = useTransform(springX, (v) => `${v * 100}%`);
  const glareY = useTransform(springY, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(255,255,255,0.18), transparent 42%)`;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    setHover(false);
    mx.set(0.5);
    my.set(0.5);
  };

  if (reduce) {
    return (
      <div className={outer || "h-full"}>
        <div
          className={`h-full rounded-3xl border border-white/12 bg-[#0c0e16]/95 shadow-2xl backdrop-blur-xl ${
            isPadded ? "p-5 sm:p-6" : ""
          } ${inner}`}
          style={style}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`[perspective:1100px] ${outer || "h-full"}`}>
      <motion.div
        ref={ref}
        className={`bento-3d relative h-full min-h-0 transform-gpu overflow-hidden rounded-3xl border border-white/12 bg-[#0c0e16]/95 shadow-2xl backdrop-blur-xl will-change-transform ${
          isPadded ? "p-5 sm:p-6" : ""
        } ${inner}`}
        style={{
          ...style,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={onLeave}
        animate={{
          y: hover ? -6 : 0,
          boxShadow: hover
            ? "0 28px 60px -28px rgba(34,211,238,0.28), 0 16px 40px -24px rgba(0,0,0,0.85)"
            : "0 20px 40px -28px rgba(0,0,0,0.8)",
        }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] mix-blend-soft-light"
          style={{ background: glareBg, opacity: hover ? 1 : 0 }}
        />
        <div className="relative z-[2] h-full min-h-0">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function StackIcons({
  items,
}: {
  items: {
    name: string;
    Icon: React.ComponentType<{ size?: number; color?: string }>;
    color: string;
  }[];
}) {
  return (
    <div className="flex flex-wrap content-center items-center justify-center gap-3">
      {items.map(({ name, Icon, color }, i) => (
        <motion.div
          key={name}
          className="flex flex-col items-center gap-1.5"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ y: [0, -5, 0], rotateY: [0, 8, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        >
          <span
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40"
            style={{
              boxShadow: `0 12px 28px -10px ${color}aa`,
              transform: "translateZ(24px)",
            }}
          >
            <Icon size={22} color={color} />
          </span>
          <span className="text-[10px] font-medium text-slate-300">{name}</span>
        </motion.div>
      ))}
    </div>
  );
}

export function FlowNode({
  label,
  accent = "cyan",
}: {
  label: string;
  accent?: string;
}) {
  const colors: Record<string, string> = {
    cyan: "border-cyan-400/40 bg-cyan-400/10 text-cyan-100",
    violet: "border-violet-400/40 bg-violet-400/10 text-violet-100",
    emerald: "border-emerald-400/40 bg-emerald-400/10 text-emerald-100",
    amber: "border-amber-400/40 bg-amber-400/10 text-amber-100",
    blue: "border-blue-400/40 bg-blue-400/10 text-blue-100",
    lime: "border-lime-400/40 bg-lime-400/10 text-lime-100",
    pink: "border-pink-400/40 bg-pink-400/10 text-pink-100",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 text-xs font-medium ${colors[accent] ?? colors.cyan}`}
    >
      {label}
    </span>
  );
}
