"use client";

import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import { contact } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#about-grid", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#disciplines", label: "Systems" },
  { href: "#contact", label: "Contact" },
];

const HIDE_DELTA = 12;
const SHOW_DELTA = 8;
const TOP_REVEAL = 64;
const LERP = 0.14;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const targetHidden = useRef(0);
  const currentHidden = useRef(0);
  const reduceMotion = useRef(false);
  const rafRef = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const applyTransform = (cur: number) => {
      const el = headerRef.current;
      if (!el) return;
      el.style.transform = `translate3d(0, ${-(cur * 110)}%, 0)`;
      el.style.opacity = String(1 - cur * 0.3);
    };

    const tick = () => {
      const target = targetHidden.current;
      let cur = currentHidden.current;

      if (reduceMotion.current) {
        cur = target;
      } else {
        cur += (target - cur) * LERP;
        if (Math.abs(target - cur) < 0.002) cur = target;
      }

      currentHidden.current = cur;
      applyTransform(cur);

      if (cur !== target) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = 0;
      }
    };

    const kick = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      setScrolled(y > 24);

      let next = targetHidden.current;
      if (y <= TOP_REVEAL) next = 0;
      else if (delta > HIDE_DELTA) next = 1;
      else if (delta < -SHOW_DELTA) next = 0;

      if (next !== targetHidden.current) {
        targetHidden.current = next;
        kick();
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const overHero = !scrolled;
  const iconInk = overHero ? "#000000" : "#e4e4e7";

  return (
    <header
      ref={headerRef}
      data-over-hero={overHero ? "true" : "false"}
      className={`fixed inset-x-0 top-0 z-40 ${
        scrolled
          ? "border-b border-white/10 bg-[#05060c]/92 text-white"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{
        transform: "translate3d(0,0,0)",
        opacity: 1,
        isolation: "isolate",
        mixBlendMode: "normal",
      }}
    >
      <nav className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12">
        {/* Solid plate when over light hero — brand cannot bleach into the canvas */}
        <a
          href="#hero"
          aria-label="FAIZA"
          className={
            overHero
              ? "rounded-full bg-[#f4f4f5] px-3 py-1.5 text-sm font-semibold tracking-wide text-black"
              : "px-1 text-sm font-semibold tracking-wide text-white"
          }
          style={
            overHero
              ? {
                  color: "#000000",
                  WebkitTextFillColor: "#000000",
                  isolation: "isolate",
                  mixBlendMode: "normal",
                  backgroundColor: "#f4f4f5",
                }
              : undefined
          }
        >
          FAIZA<span className="opacity-45">.</span>
        </a>
        <ul
          className={`hidden items-center gap-6 text-[11px] font-medium uppercase tracking-[0.16em] md:flex ${
            scrolled ? "text-zinc-400" : "text-black/70"
          }`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`transition-colors ${
                  scrolled ? "hover:text-white" : "hover:text-black"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div
          className={
            overHero
              ? "flex items-center gap-2 rounded-full bg-[#f4f4f5] px-2 py-1"
              : "flex items-center gap-2"
          }
          style={
            overHero
              ? {
                  isolation: "isolate",
                  mixBlendMode: "normal",
                  backgroundColor: "#f4f4f5",
                }
              : undefined
          }
        >
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
              scrolled
                ? "border-white/12 hover:border-white/30"
                : "border-black/30 hover:border-black/55"
            }`}
            aria-label="GitHub"
          >
            <GitHubIcon size={15} color={iconInk} />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
              scrolled
                ? "border-white/12 hover:border-white/30"
                : "border-black/30 hover:border-black/55"
            }`}
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={15} color={iconInk} />
          </a>
          <a
            href={`mailto:${contact.email}`}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full border transition ${
              scrolled
                ? "border-white/12 hover:border-white/30"
                : "border-black/30 hover:border-black/55"
            }`}
            aria-label="Email"
          >
            <Mail size={15} color={iconInk} />
          </a>
        </div>
      </nav>
    </header>
  );
}
