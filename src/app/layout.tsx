import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Inter,
  JetBrains_Mono,
  Newsreader,
  Source_Serif_4,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faiza Munir | Software Engineering Student & Full Stack Developer",
  description:
    "Portfolio of Faiza Munir. Full-stack systems, desktop labs, applied cryptography, and ML products.",
};

const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('portfolio-theme');
    if (t === 'cosmic' || t === 'pixel' || t === 'studio') {
      document.documentElement.setAttribute('data-theme', t);
    } else {
      document.documentElement.setAttribute('data-theme', 'cosmic');
    }
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'cosmic');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="cosmic"
      suppressHydrationWarning
      className={`${inter.variable} ${ibmPlexMono.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${newsreader.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
