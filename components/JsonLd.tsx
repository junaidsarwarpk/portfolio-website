import { getPersonJsonLd } from "@/data/seo";

export default function JsonLd() {
  const jsonLd = getPersonJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
