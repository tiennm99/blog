const toc = document.querySelector(".toc");
if (toc) {
  const links = new Map();
  for (const a of toc.querySelectorAll('a[href^="#"]')) {
    const id = decodeURIComponent(a.getAttribute("href").slice(1));
    if (id) links.set(id, a);
  }

  const headings = [...document.querySelectorAll(".post-content :is(h2, h3, h4)[id]")]
    .filter((h) => links.has(h.id));
  if (headings.length) {
    /** @param {string} [id] highlight that heading's link, or clear all when undefined */
    let active;
    const setActive = (id) => {
      if (id === active) return;
      active = id;
      for (const a of toc.querySelectorAll('a[aria-current="true"]')) a.removeAttribute("aria-current");
      if (id) links.get(id)?.setAttribute("aria-current", "true");
    };

    // The active section is the last heading above a line at 25% of the
    // viewport. The line must sit below the headings' 6rem scroll margin, so a
    // jumped-to or deep-linked heading counts as active.
    const update = () => {
      const line = innerHeight * 0.25;
      let current;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id;
        else break;
      }
      setActive(current);
    };

    let frame = 0;
    addEventListener("scroll", () => {
      if (!frame) frame = requestAnimationFrame(() => { frame = 0; update(); });
    }, { passive: true });
    addEventListener("hashchange", update);
    addEventListener("resize", update);
    update();
  }
}
