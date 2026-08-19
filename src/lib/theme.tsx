"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  type ThemeId,
} from "@/themes/registry";
import { COSMIC_PALETTE_KEY, getCosmicPalette } from "@/themes/cosmic/palettes";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  root.setAttribute("data-theme", id);
  root.style.colorScheme = id === "studio" ? "light" : "dark";

  // Live site: Cosmic default only — reset palette-lab overrides
  if (id === "cosmic") {
    const original = getCosmicPalette("original");
    root.setAttribute("data-cosmic-palette", "original");
    root.style.colorScheme = original.mode;
    Object.entries(original.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    return;
  }

  // Leaving Cosmic — clear tester overrides so Pixel/Studio stay clean
  root.removeAttribute("data-cosmic-palette");
  [
    "--cp-ink",
    "--cp-ink-soft",
    "--cp-paper",
    "--cp-card",
    "--cp-cta",
    "--cp-cta-fg",
    "--cp-accent",
    "--cp-accent-2",
    "--cp-chip",
    "--cp-nav",
    "--cp-selection-bg",
    "--cp-selection-fg",
    "--cp-pulse",
    "--cp-soft-panel",
    "--cp-sage",
  ].forEach((k) => root.style.removeProperty(k));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Live site locks Cosmic default; clear saved palette-lab / alternate themes
    localStorage.setItem(THEME_STORAGE_KEY, DEFAULT_THEME);
    localStorage.removeItem(COSMIC_PALETTE_KEY);
    setThemeState(DEFAULT_THEME);
    applyTheme(DEFAULT_THEME);
    setReady(true);
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    applyTheme(id);
    localStorage.setItem(THEME_STORAGE_KEY, id);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, ready }),
    [theme, setTheme, ready],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
