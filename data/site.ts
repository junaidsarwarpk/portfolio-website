export const site = {
  name: "Junaid Sarwar",
  title: "Senior AI & Frontend Architect",
  email: "junaidsarwar001@gmail.com",
  location: "Lahore, Pakistan",
  copyrightYear: 2026,
  linkedin: "https://www.linkedin.com/in/junaidsarwar1013",
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/junaidsarwar1013",
      icon: "/static/icons/linkedin.svg",
    },
    {
      label: "Upwork",
      href: "https://www.upwork.com/freelancers/~012e2fbdbc8a1ea8e7",
      icon: "/static/icons/upwork.png",
    },
  ],
  phone: {
    primary: "+92 305 651 7730",
    primaryTel: "+923056517730",
    secondary: "+92 336 388 4433",
    secondaryTel: "+923363884433",
    whatsapp: "https://wa.me/923056517730",
  },
  hero: {
    greeting: "Hello, I'm Junaid, a",
    highlight: "Senior AI & Frontend Architect.",
    bio: "Senior Software Developer and Team Lead with 10+ years building scalable frontend architectures in React and Angular. Based in Lahore, Pakistan — driving AI-powered enterprise platforms and high-impact technical initiatives.",
  },
  about: {
    summary:
      "Senior Software Developer and proficient Team Lead with over 7 years of experience building scalable frontend architectures in React and Angular. Known for driving 95% on-time delivery across agile teams and increasing team productivity by 30%. Passionate about crafting maintainable, testable UI ecosystems and leading high-impact technical initiatives.",
    metrics: [
      { value: "10+", label: "Years Experience" },
      { value: "95%", label: "On-time Delivery" },
      { value: "30%", label: "Team Productivity Gain" },
    ],
    education: {
      degree: "Bachelor of Information Technology",
      school: "University of Gujrat, Hafiz Hayat Campus",
      period: "2011 – 2015",
    },
    certification: {
      name: "AI Capabilities and Limitations",
      issuer: "Anthropic",
      date: "May 2026",
    },
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Tech Stack", href: "#tech-stack" },
    { label: "Works", href: "#works" },
    { label: "Contact", href: "#contact" },
  ],
  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "Angular (1 & 2+)",
        "React Native",
        "TypeScript",
        "JavaScript ES6+",
      ],
    },
    {
      category: "AI / ML",
      items: [
        "RAG",
        "Prompt Engineering",
        "NER",
        "Computer Vision",
        "AI-based Text OCR",
        "Deep Learning",
      ],
    },
    {
      category: "State & UI",
      items: [
        "Redux",
        "MobX",
        "NgRx",
        "Ant Design",
        "Angular Material",
        "SCSS",
        "Storybook",
      ],
    },
    {
      category: "Tools & Practices",
      items: [
        "Git",
        "Keycloak",
        "Agile (JIRA, Confluence)",
        "REST APIs",
        "React Query",
      ],
    },
  ],
  experience: [
    {
      role: "Senior Software Developer",
      company: "Aessco (Ministry of Justice - KSA)",
      period: "Nov 2021 – Present",
      location: "Remote Contract",
      highlights: [
        "Fine-tuned transformer-based NLP models achieving 98% accuracy in entity extraction, reducing document processing from a full day to under 2 minutes.",
        "Built the Real Estate Exchange platform for property management, trading, mortgage, and financing using React, Ant Design, and MobX.",
        "Developed a scalable Angular-based document extraction tool processing 100,000+ documents with two-tier quality control.",
      ],
    },
    {
      role: "Senior Software Developer / Team Lead",
      company: "Contour Software (Halcom d.d Slovenia)",
      period: "Apr 2019 – Apr 2021",
      location: "Lahore, Pakistan",
      highlights: [
        "Led cross-functional teams of 5–7 developers, achieving 95% on-time project delivery through agile ceremonies.",
        "Designed project architecture using React, React Hooks, and Context API, eliminating Redux and reducing boilerplate by 70%.",
        "Mentored juniors through code reviews and 1:1 sessions, resulting in 30% improvement in team productivity.",
      ],
    },
    {
      role: "Senior Software Developer",
      company: "Simple Software Solutions (Sibme - U.S.A)",
      period: "Nov 2015 – Apr 2019",
      location: "Lahore, Pakistan",
      highlights: [
        "Led the foundational frontend architecture of Sibme, a major US ed-tech platform, establishing scalable design and reusable component libraries.",
        "Migrated multiple legacy PHP modules to Angular 2+, improving performance, maintainability, and UI responsiveness.",
        "Developed a custom T-shirt design tool using Angular and jQuery UI, showcasing versatility in interactive UI design.",
      ],
    },
  ],
  projects: [
    {
      name: "Ministry of Justice — Real Estate Exchange",
      description:
        "Enterprise platform for property management, trading, mortgage, and financing with AI-powered document extraction at scale.",
      tags: ["React", "Angular", "AI/ML", "Enterprise"],
    },
    {
      name: "Sibme",
      description:
        "Video coaching and resource sharing platform designed to improve teaching and learning for schools and education organizations.",
      url: "https://app.sibme.com",
      tags: ["Angular", "Ed-Tech", "Architecture"],
    },
    {
      name: "Teedesign",
      description:
        "Custom T-shirt design panel with draw, resize, rotate, text formatting, and custom image upload capabilities.",
      url: "https://dev.teedesignshop.com/designs/",
      tags: ["Angular", "React", "E-Commerce"],
    },
  ],
} as const;
