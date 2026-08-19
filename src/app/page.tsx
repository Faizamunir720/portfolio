"use client";

import { ThemeProvider, useTheme } from "@/lib/theme";
import { CosmicHome } from "@/themes/cosmic/CosmicHome";
import { PixelHome } from "@/themes/pixel/PixelHome";
import { StudioHome } from "@/themes/studio/StudioHome";

function ThemedHome() {
  const { theme, ready } = useTheme();

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05060c] font-mono text-xs uppercase tracking-widest text-zinc-500">
        Loading skin…
      </div>
    );
  }

  if (theme === "pixel") return <PixelHome />;
  if (theme === "studio") return <StudioHome />;
  return <CosmicHome />;
}

export default function Home() {
  return (
    <ThemeProvider>
      <ThemedHome />
    </ThemeProvider>
  );
}
