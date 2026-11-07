const KEY = "tsuki-theme";
const root = document.documentElement;
const btn = document.querySelector("[data-theme-toggle]");

/**
 * Point the browser UI colour (meta theme-color) at the page background of
 * an explicitly chosen theme. Without a choice the media-scoped tags apply.
 */
function syncThemeColor() {
  if (!root.hasAttribute("data-theme")) return;
  const bg = getComputedStyle(root).getPropertyValue("--tsuki-bg").trim();
  if (!bg) return;
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.setAttribute("content", bg);
  }
}

syncThemeColor();

if (btn) {
  btn.hidden = false;
  btn.addEventListener("click", () => {
    const explicit = root.getAttribute("data-theme");
    const current = explicit
      || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem(KEY, next); } catch {}
    btn.setAttribute("aria-pressed", String(next === "dark"));
    syncThemeColor();
  });

  const stored = (() => { try { return localStorage.getItem(KEY); } catch { return null; } })();
  const isDark = stored === "dark"
    || (!stored && matchMedia("(prefers-color-scheme: dark)").matches);
  btn.setAttribute("aria-pressed", String(isDark));
}
