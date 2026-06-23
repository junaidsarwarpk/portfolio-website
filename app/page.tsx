import type { Metadata } from "next";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import { seo } from "@/data/seo";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Works />
      <Contact />
    </>
  );
}
