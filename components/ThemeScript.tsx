export default function ThemeScript() {
  const script = `
(function () {
  var key = ${JSON.stringify("theme")};
  var stored = localStorage.getItem(key);
  var preference =
    stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : "system";
  var dark =
    preference === "dark" ||
    (preference === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  var root = document.documentElement;
  root.classList.toggle("dark", dark);
  root.dataset.theme = dark ? "dark" : "light";
})();
`.trim();

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
