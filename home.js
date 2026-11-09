/* Homepage behaviour: theme, scroll reveal, tilt, video, packs from catalog.json. */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const root = document.documentElement;
  root.classList.add("js");

  // Theme (shares the key used by the other pages).
  let saved = null;
  try { saved = localStorage.getItem("nd-theme"); } catch (_) { /* Storage is optional. */ }
  const setTheme = (v) => { root.dataset.theme = v; try { localStorage.setItem("nd-theme", v); } catch (_) { /* Storage is optional. */ } };
  setTheme(saved === "light" || saved === "dark" ? saved : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  $("#themeBtn").addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  // Nav state and scroll progress.
  const nav = $("#nav"), bar = $("#pbar");
  const onScroll = () => {
    nav.classList.toggle("stuck", scrollY > 8);
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = max > 0 ? (scrollY / max * 100) + "%" : "0";
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll.
  const targets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    targets.forEach((t) => io.observe(t));
  } else targets.forEach((t) => t.classList.add("in"));

  // Hero tablet tilt, skipped for touch and reduced motion.
  const tilt = $("#tilt");
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(hover: none)").matches;
  if (tilt && !calm) {
    const art = tilt.parentElement;
    art.addEventListener("pointermove", (e) => {
      const r = art.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      tilt.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    });
    art.addEventListener("pointerleave", () => { tilt.style.transform = ""; });
  }

  // Video: poster button starts playback.
  const box = $("#video");
  if (box) {
    const v = box.querySelector("video");
    box.querySelector(".video-play").addEventListener("click", () => { v.play().catch(() => {}); });
    v.addEventListener("play", () => box.classList.add("playing"));
    v.addEventListener("ended", () => box.classList.remove("playing"));
  }

  // Packs from the generated catalog. Falls back silently to the static marquee.
  fetch("catalog.json").then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }).then((c) => {
    const packs = c.packs;
    const track = $("#marqueeTrack");
    const names = packs.map((p) => p.name);
    track.replaceChildren(...names.concat(names).map((n) => { const s = document.createElement("span"); s.textContent = n; return s; }));

    const pick = ["vscode", "figma", "photoshop", "obs", "slack", "notion", "blender", "spotify"];
    const chosen = pick.map((id) => packs.find((p) => p.id === id)).filter(Boolean);
    for (const p of packs) if (chosen.length < 8 && !chosen.includes(p)) chosen.push(p);
    $("#packGrid").replaceChildren(...chosen.slice(0, 8).map((p) => {
      const a = document.createElement("a");
      a.className = "pk"; a.href = "marketplace.html?pack=" + encodeURIComponent(p.id);
      a.style.setProperty("--c", /^#[0-9a-f]{6}$/i.test(p.color) && p.color !== "#1F1F1F" ? p.color : "var(--accent)");
      const b = document.createElement("b"); b.textContent = p.name;
      const s = document.createElement("small"); s.textContent = `${p.items} tiles · ${p.category}`;
      a.append(b, s);
      return a;
    }));
  }).catch(() => { $("#packGrid").hidden = true; });
})();
