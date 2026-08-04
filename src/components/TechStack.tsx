"use client";

import { motion, useReducedMotion } from "framer-motion";
import { techNodes } from "@/data/site";
import { resolveTech } from "@/components/TechPill";
import { Reveal } from "@/components/Reveal";

const glowClass: Record<string, string> = {
  cyan: "glow-cyan",
  purple: "glow-purple",
  blue: "glow-blue",
  orange: "glow-orange",
};

export function TechStack() {
  const reduce = useReducedMotion();

  return (
    <section id="tools" className="mt-4 lg:mt-6">
      <Reveal>
        <article className="bento-card relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="glow-orb right-0 top-0 h-48 w-48 bg-cyan-400/20" />
          <div className="glow-orb bottom-0 left-10 h-40 w-40 bg-violet-500/15" />

          <div className="relative z-10 mb-8">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Core Tech & Tools
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Core tools I ship with
            </h2>
            <p className="mt-2 max-w-[48ch] text-sm text-muted sm:text-base">
              The stack behind my full-stack systems, mobile apps, and desktop
              labs.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6">
            {techNodes.map((node, i) => {
              const { Icon, color } = resolveTech(node.name);
              return (
                <motion.div
                  key={node.name}
                  className={`tech-node flex min-h-[120px] flex-col items-center justify-center rounded-3xl border border-white/12 bg-[#0a0c14]/90 px-3 py-5 backdrop-blur-md sm:min-h-[148px] ${glowClass[node.glow]}`}
                  style={{ boxShadow: `0 16px 40px -20px ${color}66` }}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.045,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.06, y: -6 }}
                  title={node.name}
                >
                  <Icon size={38} color={color} aria-hidden />
                  <span className="mt-3 text-center text-sm font-medium text-slate-200">
                    {node.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </article>
      </Reveal>
    </section>
  );
}
