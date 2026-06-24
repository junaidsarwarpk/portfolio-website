"use client";

import { useEffect } from "react";

const SESSION_KEY = "visit-logged";

export default function VisitTracker() {
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");

    fetch("/api/visit", { method: "POST" }).catch(() => {
      sessionStorage.removeItem(SESSION_KEY);
    });
  }, []);

  return null;
}
