/**
 * Temporary Cosmic palette lab  -  role mapping per swatch set.
 * Contrast-first: ink always reads on paper / night surfaces.
 */

export type CosmicPaletteId =
  | "original"
  | "earth"
  | "mirage-light"
  | "mirage-dark"
  | "arcade-light"
  | "arcade-dark";

export type CosmicPalette = {
  id: CosmicPaletteId;
  label: string;
  mode: "dark" | "light";
  note: string;
  swatches: string[];
  /** CSS custom properties injected onto <html> */
  vars: Record<string, string>;
};

export const COSMIC_PALETTE_KEY = "cosmic-palette-lab";

export const COSMIC_PALETTES: CosmicPalette[] = [
  {
    id: "original",
    label: "Cosmic (default)",
    mode: "dark",
    note: "Current void + cyan / violet glows",
    swatches: ["#05060c", "#22d3ee", "#a78bfa", "#f4f4f5"],
    vars: {
      "--background": "#05060c",
      "--foreground": "#f4f4f5",
      "--muted": "#c4c4cc",
      "--hairline": "rgb(255 255 255 / 0.12)",
      "--surface": "rgb(14 16 24 / 0.94)",
      "--surface-solid": "#10121a",
      "--glow-gold": "rgba(255, 190, 70, 0.35)",
      "--glow-cyan": "rgba(80, 180, 255, 0.25)",
      "--cp-ink": "#f4f4f5",
      "--cp-ink-soft": "#c4c4cc",
      "--cp-paper": "#05060c",
      "--cp-card": "rgb(12 14 22 / 0.94)",
      "--cp-cta": "#ffffff",
      "--cp-cta-fg": "#0a0a0e",
      "--cp-accent": "#22d3ee",
      "--cp-accent-2": "#a78bfa",
      "--cp-chip": "rgb(0 0 0 / 0.45)",
      "--cp-nav": "rgb(5 6 12 / 0.92)",
      "--cp-selection-bg": "#ffffff",
      "--cp-selection-fg": "#0a0a0e",
      "--cp-pulse": "#4ade80",
    },
  },
  {
    id: "earth",
    label: "Mother Earth",
    mode: "light",
    note: "Lucky Dice paper · Mother Earth ink · Bay / Blue soft fills",
    swatches: ["#513229", "#F4F1E2", "#D8EBF9", "#FCE6B7", "#D7D4B1"],
    vars: {
      // Mother Earth #513229, Lucky Dice #F4F1E2, Something Blue #D8EBF9,
      // The Bay #FCE6B7, Walking Vinnie #D7D4B1
      "--background": "#F4F1E2",
      "--foreground": "#513229",
      "--muted": "#5C453C",
      "--hairline": "rgb(81 50 41 / 0.22)",
      "--surface": "rgb(255 252 245 / 0.92)",
      "--surface-solid": "#FFF8EA",
      "--glow-gold": "rgba(252, 230, 183, 0.65)",
      "--glow-cyan": "rgba(216, 235, 249, 0.7)",
      "--cp-ink": "#513229",
      "--cp-ink-soft": "#5C453C",
      "--cp-paper": "#F4F1E2",
      "--cp-card": "#FFFCF5",
      "--cp-cta": "#513229",
      "--cp-cta-fg": "#F4F1E2",
      "--cp-accent": "#513229",
      "--cp-accent-2": "#3F6F8C",
      "--cp-chip": "#D8EBF9",
      "--cp-nav": "rgb(244 241 226 / 0.94)",
      "--cp-selection-bg": "#513229",
      "--cp-selection-fg": "#F4F1E2",
      "--cp-pulse": "#6B8F4E",
      "--cp-soft-panel": "#FCE6B7",
      "--cp-sage": "#D7D4B1",
    },
  },
  {
    id: "mirage-light",
    label: "Mirage Light",
    mode: "light",
    note: "Praxeti paper · Midnight ink · Spring lime CTAs · forest accent",
    swatches: ["#F6F7ED", "#001F3F", "#DBE64C", "#00804C", "#74C365"],
    vars: {
      // Praxeti #F6F7ED, Midnight #001F3F, Spring #DBE64C,
      // Picture Book #00804C, Mantis #74C365, Nuit #1E488F
      "--background": "#F6F7ED",
      "--foreground": "#001F3F",
      "--muted": "#2A4254",
      "--hairline": "rgb(0 31 63 / 0.18)",
      "--surface": "rgb(255 255 255 / 0.88)",
      "--surface-solid": "#FFFFFF",
      "--glow-gold": "rgba(219, 230, 76, 0.45)",
      "--glow-cyan": "rgba(116, 195, 101, 0.35)",
      "--cp-ink": "#001F3F",
      "--cp-ink-soft": "#2A4254",
      "--cp-paper": "#F6F7ED",
      "--cp-card": "#FFFFFF",
      "--cp-cta": "#001F3F",
      "--cp-cta-fg": "#DBE64C",
      "--cp-accent": "#00804C",
      "--cp-accent-2": "#1A3F7A",
      "--cp-chip": "#DBE64C",
      "--cp-nav": "rgb(246 247 237 / 0.94)",
      "--cp-selection-bg": "#DBE64C",
      "--cp-selection-fg": "#001F3F",
      "--cp-pulse": "#74C365",
      "--cp-soft-panel": "#E8F5E0",
    },
  },
  {
    id: "mirage-dark",
    label: "Mirage Dark",
    mode: "dark",
    note: "Midnight field · Spring text accents · Nuit surfaces",
    swatches: ["#001F3F", "#DBE64C", "#1E488F", "#F6F7ED", "#74C365"],
    vars: {
      "--background": "#001F3F",
      "--foreground": "#F6F7ED",
      "--muted": "#A9B9C9",
      "--hairline": "rgb(246 247 237 / 0.16)",
      "--surface": "rgb(10 42 74 / 0.94)",
      "--surface-solid": "#0A2A4A",
      "--glow-gold": "rgba(219, 230, 76, 0.35)",
      "--glow-cyan": "rgba(30, 72, 143, 0.45)",
      "--cp-ink": "#F6F7ED",
      "--cp-ink-soft": "#A9B9C9",
      "--cp-paper": "#001F3F",
      "--cp-card": "#0A2A4A",
      "--cp-cta": "#DBE64C",
      "--cp-cta-fg": "#001F3F",
      "--cp-accent": "#DBE64C",
      "--cp-accent-2": "#74C365",
      "--cp-chip": "rgb(30 72 143 / 0.85)",
      "--cp-nav": "rgb(0 31 63 / 0.94)",
      "--cp-selection-bg": "#DBE64C",
      "--cp-selection-fg": "#001F3F",
      "--cp-pulse": "#DBE64C",
      "--cp-soft-panel": "#1E488F",
    },
  },
  {
    id: "arcade-light",
    label: "Arcade Light",
    mode: "light",
    note: "Arcade White paper · Ghostlands / Martian ink · yellow + pink chips",
    swatches: ["#EDEBE2", "#113C42", "#136C51", "#EEDC5B", "#E9B8DE"],
    vars: {
      // Arcade #EDEBE2, Ghostlands #113C42, Pink #E9B8DE,
      // Martian #136C51, Dull Yellow #EEDC5B, Mauve #B97DA8
      "--background": "#EDEBE2",
      "--foreground": "#113C42",
      "--muted": "#35555A",
      "--hairline": "rgb(17 60 66 / 0.2)",
      "--surface": "rgb(255 255 255 / 0.86)",
      "--surface-solid": "#F7F5EE",
      "--glow-gold": "rgba(238, 220, 91, 0.5)",
      "--glow-cyan": "rgba(233, 184, 222, 0.45)",
      "--cp-ink": "#113C42",
      "--cp-ink-soft": "#35555A",
      "--cp-paper": "#EDEBE2",
      "--cp-card": "#F7F5EE",
      "--cp-cta": "#136C51",
      "--cp-cta-fg": "#EEDC5B",
      "--cp-accent": "#136C51",
      "--cp-accent-2": "#9A5F8C",
      "--cp-chip": "#EEDC5B",
      "--cp-nav": "rgb(237 235 226 / 0.94)",
      "--cp-selection-bg": "#136C51",
      "--cp-selection-fg": "#EEDC5B",
      "--cp-pulse": "#136C51",
      "--cp-soft-panel": "#E9B8DE",
    },
  },
  {
    id: "arcade-dark",
    label: "Arcade Dark",
    mode: "dark",
    note: "Ghostlands coal · Dull Yellow headings · Pink / Mauve accents",
    swatches: ["#113C42", "#EEDC5B", "#E9B8DE", "#EDEBE2", "#B97DA8"],
    vars: {
      "--background": "#113C42",
      "--foreground": "#EDEBE2",
      "--muted": "#B7C8CA",
      "--hairline": "rgb(237 235 226 / 0.16)",
      "--surface": "rgb(20 70 76 / 0.94)",
      "--surface-solid": "#164A50",
      "--glow-gold": "rgba(238, 220, 91, 0.35)",
      "--glow-cyan": "rgba(233, 184, 222, 0.3)",
      "--cp-ink": "#EDEBE2",
      "--cp-ink-soft": "#B7C8CA",
      "--cp-paper": "#113C42",
      "--cp-card": "#164A50",
      "--cp-cta": "#EEDC5B",
      "--cp-cta-fg": "#113C42",
      "--cp-accent": "#EEDC5B",
      "--cp-accent-2": "#E9B8DE",
      "--cp-chip": "rgb(185 125 168 / 0.45)",
      "--cp-nav": "rgb(17 60 66 / 0.94)",
      "--cp-selection-bg": "#EEDC5B",
      "--cp-selection-fg": "#113C42",
      "--cp-pulse": "#EEDC5B",
      "--cp-soft-panel": "#B97DA8",
    },
  },
];

export function getCosmicPalette(id: string | null): CosmicPalette {
  return (
    COSMIC_PALETTES.find((p) => p.id === id) ??
    COSMIC_PALETTES[0]
  );
}
