export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme";

/** Set to true when re-enabling the header theme toggle. */
export const DARK_MODE_ENABLED = false;

export function resolveTheme(preference: ThemePreference): "light" | "dark" {
  if (!DARK_MODE_ENABLED) {
    return "light";
  }

  if (preference === "light" || preference === "dark") {
    return preference;
  }

  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getStoredThemePreference(): ThemePreference {
  if (!DARK_MODE_ENABLED) {
    return "light";
  }

  if (typeof window === "undefined") {
    return "system";
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }

  return "system";
}

export function applyTheme(preference: ThemePreference) {
  const resolved = resolveTheme(preference);
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.dataset.theme = resolved;
}
