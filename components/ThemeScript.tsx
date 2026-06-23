export default function ThemeScript() {
  const script = `
(function () {
  var root = document.documentElement;
  root.classList.remove("dark");
  root.dataset.theme = "light";
})();
`.trim();

  return (
    <script
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
