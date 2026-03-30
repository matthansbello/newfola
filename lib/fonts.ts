// lib/fonts.ts
import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Druk
export const druk = localFont({
  src: "../public/Druk-XCondSuper.otf",
  variable: "--font-druk",
});

// Portrait
export const portrait = localFont({
  src: [
    { path: "../public/Portrait-Light.otf", weight: "300", style: "normal" },
    { path: "../public/Portrait-Medium.otf", weight: "500", style: "normal" },
    {
      path: "../public/Portrait-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-portrait",
});

// Canela
export const canela = localFont({
  src: [
    {
      path: "../public/CanelaCondensed-Regular-Trial.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/CanelaCondensed-Medium-Trial.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/CanelaCondensed-Bold-Trial.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-canela",
});

// Inter (supporting / UI)
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Playfair
export const playfair = localFont({
  src: "../public/Playfair-VariableFont_opsz,wdth,wght.ttf",
  variable: "--font-playfair",
});
