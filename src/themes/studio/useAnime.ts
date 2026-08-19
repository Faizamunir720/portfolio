"use client";

import { useEffect, type RefObject } from "react";
import { animate, createTimeline, onScroll, stagger } from "animejs";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function showFinal(els: Iterable<Element>) {
  for (const el of els) {
    const node = el as HTMLElement;
    node.style.opacity = "1";
    node.style.transform = "none";
  }
}

function hideInitial(els: Iterable<Element>) {
  for (const el of els) {
    const node = el as HTMLElement;
    node.style.opacity = "0";
    node.style.transform = "translateY(20px)";
  }
}

/** Hero sequence: name → tagline → meta → media. */
export function useStudioHeroTimeline(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const name = root.querySelectorAll<HTMLElement>('[data-studio-hero="name"]');
    const taglines = root.querySelectorAll<HTMLElement>(
      '[data-studio-hero="tagline"]',
    );
    const metaItems = root.querySelectorAll<HTMLElement>(
      '[data-studio-hero="meta"] li',
    );
    const media = root.querySelectorAll<HTMLElement>(
      '[data-studio-hero="media"]',
    );
    const all = [...name, ...taglines, ...metaItems, ...media];

    if (!all.length) return;

    if (prefersReducedMotion()) {
      showFinal(all);
      return;
    }

    hideInitial(all);

    // Double-rAF so Safari paints the initial hidden state first.
    let cancelled = false;
    let tl: ReturnType<typeof createTimeline> | null = null;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled || !rootRef.current) return;

        tl = createTimeline({
          defaults: { ease: "out(3)", duration: 750 },
          autoplay: true,
        });

        if (name.length) {
          tl.add(name, {
            opacity: { from: 0, to: 1 },
            y: { from: 28, to: 0 },
            rotateX: { from: 10, to: 0 },
          });
        }

        if (taglines.length) {
          tl.add(
            taglines,
            {
              opacity: { from: 0, to: 1 },
              y: { from: 16, to: 0 },
              delay: stagger(80),
            },
            "-=420",
          );
        }

        if (metaItems.length) {
          tl.add(
            metaItems,
            {
              opacity: { from: 0, to: 1 },
              y: { from: 12, to: 0 },
              delay: stagger(70),
            },
            "-=320",
          );
        }

        if (media.length) {
          tl.add(
            media,
            {
              opacity: { from: 0, to: 1 },
              y: { from: 24, to: 0 },
              rotateY: { from: -6, to: 0 },
            },
            "-=480",
          );
        }
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      tl?.pause();
      // Keep final visible state after unmount/remount churn (Strict Mode).
      showFinal(all);
    };
  }, [rootRef]);
}

/** Scroll-reveal with anime.js onScroll + IntersectionObserver fallback. */
export function useStudioScrollReveal(
  rootRef: RefObject<HTMLElement | null>,
  selector = "[data-studio-reveal]",
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = [
      ...root.querySelectorAll<HTMLElement>(selector),
    ];
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      showFinal(targets);
      return;
    }

    hideInitial(targets);

    const observers: Array<{ revert?: () => void }> = [];
    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries, observer) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            if (el.dataset.studioAnimated === "1") continue;
            el.dataset.studioAnimated = "1";
            animate(el, {
              opacity: { from: 0, to: 1 },
              y: { from: 18, to: 0 },
              rotateX: { from: 4, to: 0 },
              duration: 700,
              ease: "out(3)",
            });
            observer.unobserve(el);
          }
        },
        { root: null, threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
    }

    targets.forEach((el) => {
      // Primary: anime.js scroll observer
      try {
        const anim = animate(el, {
          opacity: { from: 0, to: 1 },
          y: { from: 18, to: 0 },
          rotateX: { from: 4, to: 0 },
          duration: 700,
          ease: "out(3)",
          autoplay: false,
        });
        const scrollObs = onScroll({
          target: el,
          enter: "bottom-=12% top",
          repeat: false,
          onEnter: () => {
            if (el.dataset.studioAnimated === "1") return;
            el.dataset.studioAnimated = "1";
            anim.play();
            io?.unobserve(el);
          },
        });
        observers.push(scrollObs);
      } catch {
        // fall through to IO only
      }
      if (io) io.observe(el);
    });

    return () => {
      observers.forEach((o) => o.revert?.());
      io?.disconnect();
    };
  }, [rootRef, selector]);
}

export function useStudioStaggerList(
  rootRef: RefObject<HTMLElement | null>,
  itemSelector = "[data-studio-item]",
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = [...root.querySelectorAll<HTMLElement>(itemSelector)];
    if (!items.length) return;

    if (prefersReducedMotion()) {
      showFinal(items);
      return;
    }

    hideInitial(items);

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      animate(items, {
        opacity: { from: 0, to: 1 },
        y: { from: 16, to: 0 },
        delay: stagger(100),
        duration: 620,
        ease: "out(3)",
      });
    };

    let scrollObs: { revert?: () => void } | null = null;
    try {
      scrollObs = onScroll({
        target: root,
        enter: "bottom-=10% top",
        repeat: false,
        onEnter: play,
      });
    } catch {
      /* IO fallback */
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(root);

    // If already in view on mount (common for Exp/Edu under hero)
    requestAnimationFrame(() => {
      const rect = root.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) play();
    });

    return () => {
      scrollObs?.revert?.();
      io.disconnect();
    };
  }, [rootRef, itemSelector]);
}

export { animate, createTimeline, stagger, onScroll };
