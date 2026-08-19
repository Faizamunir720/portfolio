# Pixel Brutalism Theme — Design System

## Palette (Y2K / Gaming Pixel — not B&W)

| Token | Hex | Use |
|-------|-----|-----|
| Bit Black | `#00001B` | Canvas / deep panels |
| Bonus Blue | `#2227F7` | Primary OS chrome, CTAs |
| Power-Up Pink | `#FF3B9B` | Accents, active states, nav |
| Glitch Green | `#24D44D` | Success / unlock / status |
| Yummy Yellow | `#FFD635` | Labels, marquees, alerts |
| Bubblegum | `#f478b0` | Section fields |
| Tangerine | `#ffa934` | Window chrome rotation |
| Ocean | `#00a0b5` | Meta chips |
| Ink | `#000000` | Borders / hard shadows |
| Paper | `#F5F5F0` | Window bodies |

## Type
- Display: Space Grotesk (black / tight)
- UI / labels: JetBrains Mono (uppercase tracking)
- Cosmic theme keeps Inter + IBM Plex Mono

## Layout rules
- 0 radius, 2–3px black borders, hard offset shadows
- Asymmetric OS windows, desktop icons for systems
- Doodle SVG + pixel grid + subtle scanlines
- Mechanical motion; respect prefers-reduced-motion

## Architecture
- `data-theme="cosmic" | "pixel"` on `<html>`
- Shared content: `src/data/site.ts`
- Theme switcher: OS window dropdown (Theme.app)
- Persistence: localStorage `portfolio-theme`
