"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

/**
 * Lightweight interactive cosmic mesh for the hero card.
 * Uses rAF + throttled resize; skips work when reduced-motion is preferred.
 */
export function TechGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parent = canvas.parentElement;
    if (!parent) return;

    let raf = 0;
    let nodes: Node[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let lastResize = 0;

    const seed = () => {
      const area = w * h;
      const count = Math.max(18, Math.min(42, Math.floor(area / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      }));
    };

    const resize = () => {
      const now = performance.now();
      if (now - lastResize < 80) return;
      lastResize = now;
      const rect = parent.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const drawGrid = () => {
      const step = 48;
      ctx.strokeStyle = "rgba(255,255,255,0.035)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += step) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += step) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      drawGrid();
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.28)";
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      drawGrid();

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mouseRef.current.active) {
        const glow = ctx.createRadialGradient(mx, my, 0, mx, my, 160);
        glow.addColorStop(0, "rgba(34,211,238,0.12)");
        glow.addColorStop(0.45, "rgba(139,92,246,0.06)");
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
      }

      const linkDist = 110;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        a.x = Math.max(0, Math.min(w, a.x));
        a.y = Math.max(0, Math.min(h, a.y));

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.08;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        if (mouseRef.current.active) {
          const dx = a.x - mx;
          const dy = a.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(34,211,238,${(1 - dist / 140) * 0.18})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.arc(a.x, a.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(parent);
    resize();

    parent.addEventListener("pointermove", onMove, { passive: true });
    parent.addEventListener("pointerleave", onLeave);

    if (reduce) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
    />
  );
}
