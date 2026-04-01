import type { Metadata } from "next";
import "@/styles/globals.css";
// app/layout.tsx
import { druk, portrait, canela, inter, playfair } from "../lib/fonts";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "FOLA PR",
  description:
    "A full-service brand marketing, communications, social impact, and event production agency. We challenge the status quo for our clients across luxury, culture, tech & corporate, entertainment, VIP/Celebrity, and lifestyle.",
  keywords: [
    "FOLA PR",
    "brand marketing",
    "communications",
    "social impact",
    "event production",
  ],
  authors: [{ name: "Lulu Greg" }],
  creator: "FOLA PR",
  publisher: "FOLA PR",
  applicationName: "FOLA PR",
  metadataBase: new URL("https://wewantfola.com"),
  openGraph: {
    title: "FOLA PR",
    description:
      "FOLA PR is a full-service brand marketing, communications, social impact, and event production agency",
    url: "https://wewantfola.com",
    siteName: "FOLA PR",
    locale: "en_US",
    images: [
      {
        url: "/assets/images/home/FOLA-home-6.webp",
        width: 1200,
        height: 630,
        alt: "FOLA PR",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FOLA PR",
    description:
      "FOLA PR is a full-service brand marketing, communications, social impact, and event production agency",
    images: ["/assets/images/home/FOLA-home-6.webp"],
  },
  icons: {
    icon: [{ url: "/favicon.webp", type: "image/webp" }],
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Add these meta tags to disable Google Translate */}
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="notranslate" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="/assets/css/vendors/bootstrap.css"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          href="/assets/fonts/font-awesome/css/font-awesome.css"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          href="/assets/css/vendors/magnific-popup.css"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          href="/assets/css/vendors/splitting.css"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          href="/assets/css/vendors/swiper.css"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          href="/assets/css/vendors/animate.css"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          href="/assets/css/main.css"
          type="text/css"
          media="all"
        />
      </head>
      <body
        lang="en"
        className={`${druk.variable} ${portrait.variable} ${canela.variable} ${inter.variable} ${playfair.variable}`}
      >
        <div className="cursor "></div>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
