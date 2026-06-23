import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import LiquidGlassScript from "@/components/LiquidGlassScript";
import NavScript from "@/components/NavScript";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeScript from "@/components/ThemeScript";
import { getGlassCssVariables } from "@/data/glass";
import { buildSiteMetadata } from "@/lib/metadata";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = buildSiteMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={inter.variable}
      style={getGlassCssVariables()}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <div className="ambient-bg" aria-hidden="true">
            <span className="orb orb-1" />
            <span className="orb orb-2" />
            <span className="orb orb-3" />
            <span className="orb orb-4" />
          </div>
          <div className="page-frame">
            <Header />
            <main>{children}</main>
            <NavScript />
            <LiquidGlassScript />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
