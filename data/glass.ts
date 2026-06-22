/**
 * Liquid glass appearance — adjust these values to tune the frosted-glass look site-wide.
 * CSS variables are defined in styles/_root.scss for light and dark themes.
 *
 * Lower bg opacity  → more transparent panels → blur/orbs show through more strongly.
 * Higher blurPx     → stronger frost effect.
 */
export const glassConfig = {
  /** Panel fill opacity (0–1). Default lowered for a more apparent glass effect. */
  bgOpacity: 0.28,
  bgStrongOpacity: 0.42,
  bgSubtleOpacity: 0.18,
  heroPhotoGlassOpacity: 0.32,

  /** Border highlight strength (0–1). */
  borderOpacity: 0.78,
  borderSoftOpacity: 0.45,

  /** Backdrop filter */
  blurPx: 48,
  saturate: 190,

  /** Header scroll blur — content passing behind the navbar */
  headerBlurPx: 28,
  headerBlurScrolledPx: 40,
  headerTrackOpacity: 0.12,
  headerTrackScrolledOpacity: 0.22,

  /** Hero photo glass tint (lavender wash) */
  heroPhotoTintOpacity: 0.38,
} as const;

export function getGlassCssVariables(): Record<string, string> {
  const c = glassConfig;
  return {
    "--glass-bg": `rgba(255, 255, 255, ${c.bgOpacity})`,
    "--glass-bg-strong": `rgba(255, 255, 255, ${c.bgStrongOpacity})`,
    "--glass-bg-subtle": `rgba(255, 255, 255, ${c.bgSubtleOpacity})`,
    "--glass-border": `rgba(255, 255, 255, ${c.borderOpacity})`,
    "--glass-border-soft": `rgba(255, 255, 255, ${c.borderSoftOpacity})`,
    "--glass-blur": `blur(${c.blurPx}px) saturate(${c.saturate}%)`,
    "--glass-header-blur": `blur(${c.headerBlurPx}px) saturate(${c.saturate}%)`,
    "--glass-header-blur-scrolled": `blur(${c.headerBlurScrolledPx}px) saturate(${c.saturate + 20}%)`,
    "--glass-header-track": `rgba(255, 255, 255, ${c.headerTrackOpacity})`,
    "--glass-header-track-scrolled": `rgba(255, 255, 255, ${c.headerTrackScrolledOpacity})`,
    "--glass-hero-photo-top": `rgba(255, 255, 255, ${c.bgOpacity + 0.14})`,
    "--glass-hero-photo-mid": `rgba(255, 255, 255, ${c.heroPhotoGlassOpacity})`,
    "--glass-hero-photo-bottom": `rgba(237, 233, 255, ${c.heroPhotoTintOpacity})`,
  };
}
