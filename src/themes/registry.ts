export type ThemeId = "cosmic" | "pixel" | "studio";

export type ThemeMeta = {
  id: ThemeId;
  label: string;
  subtitle: string;
  accent: string;
  preview: string[];
};

export const THEMES: ThemeMeta[] = [
  {
    id: "cosmic",
    label: "COSMIC",
    subtitle: "Glass · bento · nebula",
    accent: "#22d3ee",
    preview: ["#05060c", "#22d3ee", "#a78bfa", "#f4f4f5"],
  },
  {
    id: "pixel",
    label: "PIXEL OS",
    subtitle: "Y2K · brutal · bitmap",
    accent: "#FF3B9B",
    preview: ["#00001B", "#FF3B9B", "#2227F7", "#FFD635", "#24D44D"],
  },
  {
    id: "studio",
    label: "Studio",
    subtitle: "Editorial · print · paper",
    accent: "#1F4B3F",
    preview: ["#F7F5F0", "#141414", "#1F4B3F", "#D6D1C7"],
  },
];

export const DEFAULT_THEME: ThemeId = "cosmic";
export const THEME_STORAGE_KEY = "portfolio-theme";

export function isThemeId(value: string | null): value is ThemeId {
  return value === "cosmic" || value === "pixel" || value === "studio";
}
