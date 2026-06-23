import type { Metadata } from "next";
import { seo, siteUrl } from "@/data/seo";
import { site } from "@/data/site";

export function buildSiteMetadata(): Metadata {
  const ogImage = {
    url: seo.ogImage,
    width: 730,
    height: 1000,
    alt: `${site.name} — Software Engineer, AI Developer and JavaScript Developer`,
  };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: seo.title,
      template: `%s | ${site.name}`,
    },
    description: seo.description,
    keywords: [...seo.keywords],
    applicationName: site.name,
    authors: [{ name: site.name, url: siteUrl }],
    creator: site.name,
    publisher: site.name,
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: seo.locale,
      url: siteUrl,
      siteName: site.name,
      title: seo.title,
      description: seo.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
    },
    other: {
      "geo.region": "PK-PB",
      "geo.placename": site.location,
    },
    icons: {
      icon: [{ url: "/static/images/logo.svg", type: "image/svg+xml" }],
      apple: "/apple-icon.png",
    },
  };
}
