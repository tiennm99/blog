const dataset = document.documentElement.dataset;
const COPY = dataset.copyCode || "Copy";
const COPIED = dataset.copiedCode || "Copied";
/** Languages that carry no information worth a badge. */
const PLAIN = new Set(["", "text", "txt", "plain", "plaintext", "fallback"]);

/**
 * Collect one entry per code block: Chroma wrappers, plus any bare <pre>
 * outside them. A bare <pre> gets a wrapper so the toolbar does not scroll
 * away with the code.
 * @returns {{ box: HTMLElement, code: HTMLElement }[]}
 */
function codeBlocks() {
  const blocks = [];
  for (const box of document.querySelectorAll(".highlight")) {
    // With line numbers in a table, the code is in the last cell; the first holds the gutter.
    const code = box.querySelector(".lntd:last-child code") || box.querySelector("code");
    // The line-number gutter is decoration; keep one tab stop per block.
    box.querySelector(".lntd:first-child pre")?.removeAttribute("tabindex");
    if (code) blocks.push({ box, code });
  }
  for (const pre of document.querySelectorAll("pre")) {
    if (pre.closest(".highlight")) continue;
    const code = pre.querySelector("code");
    if (!code) continue;
    const box = document.createElement("div");
    box.className = "code-block";
    pre.replaceWith(box);
    box.appendChild(pre);
    blocks.push({ box, code });
  }
  return blocks;
}

/** One polite live region announces copy results to screen readers. */
const status = document.createElement("span");
status.className = "visually-hidden";
status.setAttribute("role", "status");
document.body.appendChild(status);

/**
 * @param {HTMLButtonElement} btn
 * @param {HTMLElement} code
 */
function bindCopy(btn, code) {
  let timer = 0;
  btn.addEventListener("click", async () => {
    try {
      // textContent keeps the source newlines exactly; innerText would add
      // extra breaks for Chroma's flex line spans.
      await navigator.clipboard.writeText(code.textContent.replace(/\n$/, ""));
      btn.textContent = COPIED;
      btn.setAttribute("data-state", "copied");
      status.textContent = COPIED;
    } catch {
      btn.textContent = COPY;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      btn.textContent = COPY;
      btn.removeAttribute("data-state");
      status.textContent = "";
    }, 1500);
  });
}

for (const { box, code } of codeBlocks()) {
  const bar = document.createElement("div");
  bar.className = "code-toolbar";

  const lang = (code.dataset.lang || "").toLowerCase();
  if (!PLAIN.has(lang)) {
    const badge = document.createElement("span");
    badge.className = "code-lang";
    badge.textContent = lang;
    bar.appendChild(badge);
  }

  if (navigator.clipboard) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy";
    btn.textContent = COPY;
    bindCopy(btn, code);
    bar.appendChild(btn);
  }

  if (bar.firstChild) {
    box.appendChild(bar);
    box.classList.add("has-code-toolbar");
  }
}
