"use client";

import { useEffect } from "react";

export default function NavScript() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
    const nav = document.querySelector<HTMLElement>(".site-nav");

    const handleScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (!toggle || !nav) {
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const handleToggle = () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    };

    toggle.addEventListener("click", handleToggle);

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      toggle.removeEventListener("click", handleToggle);
    };
  }, []);

  return null;
}
