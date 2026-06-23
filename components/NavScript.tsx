"use client";

import { useEffect } from "react";
export default function NavScript() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");
    const nav = document.querySelector<HTMLElement>(".site-nav");

    const setMenuOpen = (open: boolean) => {
      toggle?.setAttribute("aria-expanded", String(open));
      nav?.classList.toggle("is-open", open);
      header?.classList.toggle("is-menu-open", open);
    };

    const handleScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    if (!toggle || !nav) {
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    const handleToggle = () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!expanded);
    };

    toggle.addEventListener("click", handleToggle);

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuOpen(false);
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      toggle.removeEventListener("click", handleToggle);
    };
  }, []);

  return null;
}
