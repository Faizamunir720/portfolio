"use client";

import { useEffect, useRef } from "react";

function hash2(x: number, y: number) {
  let n = x * 374761393 + y * 668265263;
  n = (n ^ (n >> 13)) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967295;
}

function cellSizeForWidth(w: number) {
  if (w < 480) return 22;
  if (w < 900) return 28;
  return 34;
}

function isDarkCell(x: number, y: number, cols: number, rows: number) {
  const nx = x / Math.max(cols - 1, 1);
  const ny = y / Math.max(rows - 1, 1);
  const jagged = (hash2(x, y) - 0.5) * 0.14;
  const stair = (Math.floor(x / 2) % 3) * 0.012 + (Math.floor(y / 3) % 2) * 0.02;
  const t = nx * 0.52 + ny * 0.78 + jagged + stair;
  // Scattered dark islands in the light field
  if (t < 0.58 && hash2(x + 17, y + 41) > 0.965) return true;
  return t > 0.6;
}

function readCssColor(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export function HeroGridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef<{ cx: number; cy: number } | null>(null);
  const gridRef = useRef<{
    cols: number;
    rows: number;
    cell: number;
    dark: Uint8Array;
    nums: Int8Array;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let disposed = false;

    const buildGrid = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent?.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || Math.round(window.innerHeight * 0.7);
      const cell = cellSizeForWidth(w);
      const cols = Math.ceil(w / cell) + 1;
      const rows = Math.ceil(h / cell) + 1;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const dark = new Uint8Array(cols * rows);
      const nums = new Int8Array(cols * rows);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          dark[i] = isDarkCell(x, y, cols, rows) ? 1 : 0;
        }
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          if (dark[i]) {
            nums[i] = 0;
            continue;
          }
          let n = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (!dx && !dy) continue;
              const nx = x + dx;
              const ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
              if (dark[ny * cols + nx]) n++;
            }
          }
          // Only label cells that feel like the minesweeper seam
          nums[i] = n > 0 && n <= 4 && hash2(x, y) > 0.35 ? n : 0;
        }
      }

      gridRef.current = { cols, rows, cell, dark, nums };
    };

    const paint = () => {
      const g = gridRef.current;
      if (!g) return;
      const { cols, rows, cell, dark, nums } = g;
      const light = readCssColor("--hero-light", "#f4f4f5");
      const ink = readCssColor("--hero-dark", "#05060c");
      const hover = readCssColor("--hero-hover", "#1e3a8a");
      const numColor = readCssColor("--hero-num", "#71717a");

      ctx.fillStyle = light;
      ctx.fillRect(0, 0, cols * cell, rows * cell);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = y * cols + x;
          if (!dark[i]) continue;
          ctx.fillStyle = ink;
          ctx.fillRect(x * cell, y * cell, cell, cell);
        }
      }

      const hoverCell = hoverRef.current;
      if (hoverCell) {
        const { cx, cy } = hoverCell;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const x = cx + dx;
            const y = cy + dy;
            if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
            const dist = Math.abs(dx) + Math.abs(dy);
            ctx.globalAlpha = dist === 0 ? 0.55 : dist === 1 ? 0.32 : 0.18;
            ctx.fillStyle = hover;
            ctx.fillRect(x * cell, y * cell, cell, cell);
          }
        }
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = numColor;
      ctx.font = `600 ${Math.max(10, Math.floor(cell * 0.42))}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const n = nums[y * cols + x];
          if (!n) continue;
          ctx.fillText(String(n), x * cell + cell / 2, y * cell + cell / 2 + 0.5);
        }
      }
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(paint);
    };

    const onResize = () => {
      buildGrid();
      schedule();
    };

    const onMove = (e: PointerEvent) => {
      const g = gridRef.current;
      if (!g) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientY < rect.top ||
        e.clientY > rect.bottom ||
        e.clientX < rect.left ||
        e.clientX > rect.right
      ) {
        if (hoverRef.current) {
          hoverRef.current = null;
          schedule();
        }
        return;
      }
      const cx = Math.floor((e.clientX - rect.left) / g.cell);
      const cy = Math.floor((e.clientY - rect.top) / g.cell);
      const prev = hoverRef.current;
      if (prev && prev.cx === cx && prev.cy === cy) return;
      hoverRef.current = { cx, cy };
      schedule();
    };

    const onLeave = () => {
      hoverRef.current = null;
      schedule();
    };

    buildGrid();
    paint();

    window.addEventListener("resize", onResize);
    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => onResize())
        : null;
    if (canvas.parentElement) ro?.observe(canvas.parentElement);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      ro?.disconnect();
      void disposed;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full touch-none"
      aria-hidden
    />
  );
}
