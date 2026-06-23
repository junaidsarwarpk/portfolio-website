import { site } from "@/data/site";

export const siteUrl = "https://junaidsarwar.com";

export const seo = {
  title:
    "Junaid Sarwar | Software Engineer, AI Developer & JavaScript Developer",
  shortTitle: "Junaid Sarwar | Senior AI & Frontend Architect",
  description:
    "Junaid Sarwar is a Senior Software Engineer, AI Developer, and JavaScript Developer based in Lahore, Pakistan. 10+ years building React, Angular, TypeScript, NLP, and enterprise AI platforms for global clients.",
  keywords: [
    "Junaid Sarwar",
    "Junaid Sarwar software engineer",
    "Junaid Sarwar AI developer",
    "Software Engineer",
    "Senior Software Engineer",
    "Senior Software Developer",
    "AI Developer",
    "JavaScript Developer",
    "Frontend Developer",
    "Frontend Architect",
    "React Developer",
    "Angular Developer",
    "TypeScript Developer",
    "Full Stack Developer",
    "Machine Learning Engineer",
    "NLP Developer",
    "AI Engineer",
    "Web Developer Lahore",
    "Software Engineer Pakistan",
    "Freelance JavaScript Developer",
    "Enterprise AI platforms",
    "React",
    "Angular",
    "TypeScript",
    "JavaScript",
  ],
  ogImage: "/static/images/profile.png",
  locale: "en_US",
} as const;

export function getPersonJsonLd() {
  const skillItems = site.skills.flatMap((group) => group.items);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${site.name} — Software Engineer & AI Developer`,
        description: seo.description,
        inLanguage: "en-US",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profile`,
        url: siteUrl,
        name: seo.title,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#person` },
        inLanguage: "en-US",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: site.name,
        url: siteUrl,
        image: `${siteUrl}${seo.ogImage}`,
        email: site.email,
        jobTitle: [
          site.title,
          "Software Engineer",
          "AI Developer",
          "JavaScript Developer",
        ],
        description: seo.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        sameAs: [
          site.linkedin,
          ...site.social.map((item) => item.href),
        ],
        knowsAbout: skillItems,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: site.about.education.school,
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: site.about.certification.name,
          credentialCategory: "certification",
          recognizedBy: {
            "@type": "Organization",
            name: site.about.certification.issuer,
          },
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#services`,
        name: `${site.name} — Software Development & AI Consulting`,
        url: siteUrl,
        image: `${siteUrl}${seo.ogImage}`,
        description: seo.description,
        areaServed: "Worldwide",
        provider: { "@id": `${siteUrl}/#person` },
        serviceType: [
          "Software Engineering",
          "AI Development",
          "JavaScript Development",
          "Frontend Architecture",
          "React Development",
          "Angular Development",
        ],
      },
    ],
  };
}
