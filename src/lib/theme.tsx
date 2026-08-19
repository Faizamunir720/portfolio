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
  isThemeId,
  type ThemeId,
} from "@/themes/registry";

type ThemeContextValue = {
  theme: ThemeId;
  setTheme: (id: ThemeId) => void;
  ready: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(id: ThemeId) {
  const root = document.documentElement;
  root.setAttribute("data-theme", id);
  root.style.colorScheme =
    id === "studio" ? "light" : "dark";

  // Cosmic palette lab is Cosmic-only  -  clear its attr when leaving Cosmic
  // so Studio/Pixel don't inherit tester overrides.
  if (id !== "cosmic") {
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
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(DEFAULT_THEME);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const next = isThemeId(stored) ? stored : DEFAULT_THEME;
    setThemeState(next);
    applyTheme(next);
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
