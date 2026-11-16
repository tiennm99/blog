// Must match the key read by the inline redirect script in _partials/head.html.
const KEY = "tsuki-lang";

for (const menu of document.querySelectorAll("[data-lang-switcher]")) {
  // remember the picked language, so later visits open its translation
  menu.addEventListener("click", (e) => {
    const link = e.target.closest("[data-lang]");
    if (!link) return;
    try { localStorage.setItem(KEY, link.dataset.lang); } catch {}
  });
  // close on a click outside or on Escape
  document.addEventListener("click", (e) => {
    if (menu.open && !menu.contains(e.target)) menu.open = false;
  });
  menu.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
}
