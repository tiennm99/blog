const KEY = "tsuki-theme";
const root = document.documentElement;
const btn = document.querySelector("[data-theme-toggle]");
const mq = matchMedia("(prefers-color-scheme: dark)");
const dark = () => mq.matches;
// media-scoped defaults, restored when the site follows the OS again
const metas = [...document.querySelectorAll('meta[name="theme-color"]')]
  .map((m) => [m, m.getAttribute("content")]);

/**
 * Point the browser UI colour (meta theme-color) at the page background of
 * an explicitly chosen theme; without a choice, restore the media defaults.
 */
function syncThemeColor() {
  const bg = root.hasAttribute("data-theme")
    && getComputedStyle(root).getPropertyValue("--tsuki-bg").trim();
  for (const [meta, def] of metas) meta.setAttribute("content", bg || def);
}

syncThemeColor();

if (btn) {
  btn.hidden = false;
  btn.addEventListener("click", () => {
    const systemDark = dark();
    const current = root.getAttribute("data-theme") || (systemDark ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    // picking the OS theme clears the stored choice, so the site follows the OS again
    if ((next === "dark") === systemDark) {
      root.removeAttribute("data-theme");
      try { localStorage.removeItem(KEY); } catch {}
    } else {
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch {}
    }
    syncPressed();
    syncThemeColor();
  });

  syncPressed();
  // without a stored choice the page follows the OS, so the button must too
  mq.addEventListener("change", syncPressed);
}

/** Mirror the theme in effect (chosen, else the OS one) on aria-pressed. */
function syncPressed() {
  const theme = root.getAttribute("data-theme") || (dark() ? "dark" : "light");
  btn.setAttribute("aria-pressed", String(theme === "dark"));
}
