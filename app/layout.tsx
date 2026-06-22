import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import NavScript from "@/components/NavScript";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeScript from "@/components/ThemeScript";
import "./globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://junaidsarwar.com"),
  title: "Junaid Sarwar | Senior AI & Frontend Architect",
  description:
    "Senior AI & Frontend Architect with 10+ years building scalable React and Angular platforms, NLP models, and enterprise AI systems.",
  icons: {
    icon: [{ url: "/static/images/logo.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Junaid Sarwar | Senior AI & Frontend Architect",
    description:
      "Senior AI & Frontend Architect specializing in React, Angular, NLP, and enterprise AI platforms.",
    images: ["/static/images/profile.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
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
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
