// Lazy-loads .lazy-video elements (looping clips that replace animated GIFs):
// the source loads when the video nears the viewport, and it plays only while
// visible. With reduced motion requested, it shows controls instead of
// autoplaying.
const videos = document.querySelectorAll("video.lazy-video[data-src]");
if (videos.length) {
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** @param {HTMLVideoElement} v */
  const load = (v) => {
    if (!v.dataset.src) return;
    v.src = v.dataset.src;
    delete v.dataset.src;
    if (still) {
      v.controls = true;
      v.preload = "metadata";
    }
  };

  if (!("IntersectionObserver" in window)) {
    for (const v of videos) { load(v); if (!still) v.autoplay = true; }
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        const v = /** @type {HTMLVideoElement} */ (target);
        if (isIntersecting) {
          load(v);
          if (!still) v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      }
    }, { rootMargin: "300px 0px" });
    for (const v of videos) io.observe(v);
  }
}
