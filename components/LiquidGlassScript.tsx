"use client";

import { useEffect } from "react";

const LIQUID_GLASS_SELECTOR = [
  ".header-glass",
  ".hero-content",
  ".about-summary",
  ".metric-card",
  ".skill-card",
  ".experience-card",
  ".project-card",
  ".contact-intro",
  ".contact-form",
  ".contact-card",
  ".contact-card-static",
  ".site-nav",
].join(",");

function bindLiquidGlass(element: HTMLElement) {
  if (element.dataset.liquidGlassBound === "true") {
    return;
  }

  element.dataset.liquidGlassBound = "true";

  let activePointerId: number | null = null;

  const setPosition = (clientX: number, clientY: number) => {
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    element.style.setProperty("--lg-x", `${x}%`);
    element.style.setProperty("--lg-y", `${y}%`);
  };

  const activate = (clientX: number, clientY: number) => {
    element.classList.add("is-liquid-active");
    setPosition(clientX, clientY);
  };

  const deactivate = () => {
    activePointerId = null;
    element.classList.remove("is-liquid-active");
    document.removeEventListener("pointermove", onDocumentPointerMove);
    document.removeEventListener("pointerup", onDocumentPointerEnd);
    document.removeEventListener("pointercancel", onDocumentPointerEnd);
  };

  const onDocumentPointerMove = (event: PointerEvent) => {
    if (activePointerId === null || event.pointerId !== activePointerId) {
      return;
    }

    event.preventDefault();
    setPosition(event.clientX, event.clientY);
  };

  const onDocumentPointerEnd = (event: PointerEvent) => {
    if (activePointerId === null || event.pointerId !== activePointerId) {
      return;
    }

    deactivate();
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || activePointerId !== null) {
      return;
    }

    activePointerId = event.pointerId;
    activate(event.clientX, event.clientY);

    document.addEventListener("pointermove", onDocumentPointerMove, {
      passive: false,
    });
    document.addEventListener("pointerup", onDocumentPointerEnd);
    document.addEventListener("pointercancel", onDocumentPointerEnd);
  };

  element.addEventListener("pointerdown", onPointerDown);
}

export default function LiquidGlassScript() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bindAll = () => {
      document.querySelectorAll<HTMLElement>(LIQUID_GLASS_SELECTOR).forEach(bindLiquidGlass);
    };

    bindAll();

    const observer = new MutationObserver(bindAll);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
