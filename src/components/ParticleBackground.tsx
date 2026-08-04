"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number; // 0..1 depth
  r: number;
  a: number;
  tw: number;
  tws: number;
};

type Fish = {
  t: number; // progress along path 0..1
  speed: number;
  size: number;
  z: number;
  path: number; // which stream
  hue: number; // gold / amber / cyan accent
  wobble: number;
};

type Nebula = {
  x: number;
  y: number;
  r: number;
  c: string;
  a: number;
};

/**
 * Ethereal cosmic river background:
 * golden light schools, nebula wells, layered parallax (3D depth).
 * Inspired by bioluminescent / celestial illustration art.
 */
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const scroll = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let fish: Fish[] = [];
    let nebulae: Nebula[] = [];
    let time = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    /** Bezier streams: river of light paths across the void */
    const pathPoint = (path: number, t: number) => {
      const p = t % 1;
      // Multiple S-curve rivers
      if (path === 0) {
        // Main golden river: bottom-left → top-center-right
        const x =
          w * (-0.05 + p * 1.1) +
          Math.sin(p * Math.PI * 2) * w * 0.12;
        const y =
          h * (1.05 - p * 1.15) +
          Math.sin(p * Math.PI * 3) * h * 0.08;
        return { x, y };
      }
      if (path === 1) {
        // Secondary school: right side upward swirl
        const ang = p * Math.PI * 1.6 + 0.4;
        const cx = w * 0.78;
        const cy = h * 0.55;
        const rad = Math.min(w, h) * (0.18 + p * 0.22);
        return {
          x: cx + Math.cos(ang) * rad,
          y: cy + Math.sin(ang) * rad * 1.15,
        };
      }
      // Soft left vortex (subtle)
      const ang = -p * Math.PI * 2.2;
      const cx = w * 0.22;
      const cy = h * 0.35;
      const rad = Math.min(w, h) * (0.08 + (1 - p) * 0.2);
      return {
        x: cx + Math.cos(ang) * rad,
        y: cy + Math.sin(ang) * rad,
      };
    };

    const seed = () => {
      const area = w * h;
      stars = [];
      const starCount = Math.min(120, Math.floor(area / 14000));
      for (let i = 0; i < starCount; i++) {
        const z = Math.random();
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.35 + z * 1.4,
          a: 0.1 + z * 0.35,
          tw: Math.random() * Math.PI * 2,
          tws: 0.008 + Math.random() * 0.02,
        });
      }

      fish = [];
      const fishCount = Math.min(55, Math.floor(area / 24000));
      for (let i = 0; i < fishCount; i++) {
        const path = i % 3 === 0 ? 1 : i % 5 === 0 ? 2 : 0;
        fish.push({
          t: Math.random(),
          speed: 0.0003 + Math.random() * 0.0007,
          size: 1.8 + Math.random() * 3.8,
          z: 0.2 + Math.random() * 0.65,
          path,
          hue: path === 1 ? 38 + Math.random() * 20 : 42 + Math.random() * 16,
          wobble: Math.random() * Math.PI * 2,
        });
      }

      nebulae = [
        { x: w * 0.78, y: h * 0.78, r: Math.min(w, h) * 0.38, c: "255,160,60", a: 0.055 },
        { x: w * 0.55, y: h * 0.12, r: Math.min(w, h) * 0.3, c: "80,160,255", a: 0.04 },
        { x: w * 0.18, y: h * 0.82, r: Math.min(w, h) * 0.32, c: "180,80,200", a: 0.035 },
        { x: w * 0.88, y: h * 0.22, r: Math.min(w, h) * 0.24, c: "255,200,80", a: 0.045 },
      ];
    };

    const drawNebulae = () => {
      for (const n of nebulae) {
        const px =
          n.x + (mouse.current.x - 0.5) * 28 * (n.r / 200);
        const py =
          n.y + (mouse.current.y - 0.5) * 20 * (n.r / 200) + scroll.current * 0.02;
        const g = ctx.createRadialGradient(px, py, 0, px, py, n.r);
        g.addColorStop(0, `rgba(${n.c},${n.a})`);
        g.addColorStop(0.45, `rgba(${n.c},${n.a * 0.35})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawStar = (s: Star) => {
      const parallax = (1 - s.z) * 40;
      const x = s.x + (mouse.current.x - 0.5) * parallax;
      const y =
        s.y +
        (mouse.current.y - 0.5) * parallax * 0.7 +
        scroll.current * (0.02 + s.z * 0.04);
      const twinkle = 0.55 + Math.sin(s.tw) * 0.45;
      const a = s.a * twinkle;

      // Core
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fill();

      // Occasional cross flare for nearer stars
      if (s.z > 0.72 && s.r > 1.2) {
        ctx.strokeStyle = `rgba(255,240,200,${a * 0.35})`;
        ctx.lineWidth = 0.6;
        const L = s.r * 3.2;
        ctx.beginPath();
        ctx.moveTo(x - L, y);
        ctx.lineTo(x + L, y);
        ctx.moveTo(x, y - L);
        ctx.lineTo(x, y + L);
        ctx.stroke();
      }
    };

    const drawFish = (f: Fish) => {
      const p0 = pathPoint(f.path, f.t);
      const p1 = pathPoint(f.path, f.t + 0.012);
      const ang = Math.atan2(p1.y - p0.y, p1.x - p0.x);
      const parallax = (1 - f.z) * 55;
      const wob =
        Math.sin(time * 0.04 + f.wobble) * (3 + f.size * 0.4);
      const x =
        p0.x +
        (mouse.current.x - 0.5) * parallax +
        Math.cos(ang + Math.PI / 2) * wob;
      const y =
        p0.y +
        (mouse.current.y - 0.5) * parallax * 0.65 +
        scroll.current * (0.03 + f.z * 0.05) +
        Math.sin(ang + Math.PI / 2) * wob * 0.4;

      const len = f.size * (0.85 + f.z * 0.55);
      const glow = 0.12 + f.z * 0.28;

      // Soft glow halo
      const g = ctx.createRadialGradient(x, y, 0, x, y, len * 2.6);
      g.addColorStop(0, `hsla(${f.hue}, 90%, 62%, ${glow * 0.35})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, len * 2.6, 0, Math.PI * 2);
      ctx.fill();

      // Teardrop / fish body
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.moveTo(len * 1.1, 0);
      ctx.quadraticCurveTo(0, len * 0.45, -len * 0.9, 0);
      ctx.quadraticCurveTo(0, -len * 0.45, len * 1.1, 0);
      ctx.fillStyle = `hsla(${f.hue}, 90%, ${58 + f.z * 12}%, ${0.28 + f.z * 0.22})`;
      ctx.shadowColor = `hsla(${f.hue}, 100%, 55%, 0.35)`;
      ctx.shadowBlur = 6 * f.z;
      ctx.fill();
      // Tail notch
      ctx.beginPath();
      ctx.moveTo(-len * 0.55, 0);
      ctx.lineTo(-len * 1.15, len * 0.35);
      ctx.lineTo(-len * 0.85, 0);
      ctx.lineTo(-len * 1.15, -len * 0.35);
      ctx.closePath();
      ctx.fillStyle = `hsla(${f.hue}, 85%, 65%, ${0.2 + f.z * 0.18})`;
      ctx.fill();
      ctx.restore();
      ctx.shadowBlur = 0;
    };

    const drawRiverRibbon = () => {
      // Soft luminous ribbon under main path
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const t = i / 60;
        const p = pathPoint(0, t);
        const px = p.x + (mouse.current.x - 0.5) * 20;
        const py = p.y + (mouse.current.y - 0.5) * 14 + scroll.current * 0.03;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.strokeStyle = "rgba(255,190,70,0.035)";
      ctx.lineWidth = Math.min(w, h) * 0.06;
      ctx.lineCap = "round";
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,220,120,0.05)";
      ctx.lineWidth = Math.min(w, h) * 0.02;
      ctx.stroke();
    };

    const tick = () => {
      // Smooth mouse lerp
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;
      time += 1;

      ctx.clearRect(0, 0, w, h);

      // Deep void wash
      const voidGrad = ctx.createLinearGradient(0, 0, w * 0.3, h);
      voidGrad.addColorStop(0, "rgba(4,8,18,0.15)");
      voidGrad.addColorStop(1, "rgba(8,4,16,0.05)");
      ctx.fillStyle = voidGrad;
      ctx.fillRect(0, 0, w, h);

      drawNebulae();
      drawRiverRibbon();

      // Stars (far → near by z)
      stars.sort((a, b) => a.z - b.z);
      for (const s of stars) {
        if (!reduce) s.tw += s.tws;
        drawStar(s);
      }

      // Fish streams
      for (const f of fish) {
        if (!reduce) {
          f.t += f.speed * (0.7 + f.z * 0.6);
          if (f.t > 1) f.t -= 1;
        }
        drawFish(f);
      }

      // Dust sparkles near mouse (interactive depth cue)
      if (!reduce) {
        for (let i = 0; i < 6; i++) {
          const ang = time * 0.02 + i;
          const rad = 40 + i * 18;
          const x = mouse.current.x * w + Math.cos(ang) * rad;
          const y = mouse.current.y * h + Math.sin(ang * 1.3) * rad * 0.6;
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,230,160,${0.08 + (i % 3) * 0.04})`;
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mouse.current.tx = e.clientX / window.innerWidth;
      mouse.current.ty = e.clientY / window.innerHeight;
    };
    const onScroll = () => {
      scroll.current = window.scrollY;
    };

    resize();
    if (reduce) {
      // Static frame
      drawNebulae();
      drawRiverRibbon();
      for (const s of stars) drawStar(s);
      for (const f of fish) drawFish(f);
    } else {
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* Quiet depth base — low glow so UI stays readable */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 85% 80%, rgba(255,150,40,0.06), transparent 55%),
            radial-gradient(ellipse 45% 40% at 15% 85%, rgba(120,60,160,0.05), transparent 50%),
            radial-gradient(ellipse 55% 45% at 75% 12%, rgba(60,120,220,0.05), transparent 50%),
            radial-gradient(ellipse 100% 80% at 50% 50%, #070b16 0%, #05060c 55%, #030308 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-45"
      />
      {/* Stronger center dim so cards/text pop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 42%, rgba(5,6,12,0.35) 0%, rgba(3,4,10,0.72) 100%)",
        }}
      />
    </>
  );
}
