/* Product demonstrations only. This website never connects to a desktop agent. */
(function () {
  "use strict";
  const $ = selector => document.querySelector(selector);
  const root = document.documentElement;
  const themeButton = $("#themeBtn");
  let saved;
  try { saved = localStorage.getItem("nd-theme"); } catch (_) { /* Storage is optional. */ }
  function theme(value) {
    root.dataset.theme = value;
    themeButton.setAttribute("aria-label", window.NDI18N ? window.NDI18N.t(value === "dark" ? "Switch to light theme" : "Switch to dark theme") : (value === "dark" ? "Switch to light theme" : "Switch to dark theme"));
    try { localStorage.setItem("nd-theme", value); } catch (_) { /* Storage is optional. */ }
  }
  theme(saved === "light" || saved === "dark" ? saved : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  themeButton.addEventListener("click", () => theme(root.dataset.theme === "dark" ? "light" : "dark"));
  const burger = $("#burger");
  function closeMenu() { $("#navlinks").classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  burger.addEventListener("click", () => burger.setAttribute("aria-expanded", String($("#navlinks").classList.toggle("open"))));
  document.querySelectorAll("#navlinks a").forEach(link => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
  function scrollState() {
    const height = root.scrollHeight - innerHeight;
    $("#nav").classList.toggle("stuck", scrollY > 20);
    $("#pbar").style.width = `${height > 0 ? scrollY / height * 100 : 0}%`;
    $("#toTop").classList.toggle("show", scrollY > 800);
  }
  addEventListener("scroll", scrollState, { passive: true });
  $("#toTop").addEventListener("click", () => scrollTo({ top: 0 }));
  function text(tag, value, className) {
    const node = document.createElement(tag);
    node.textContent = value;
    if (className) node.className = className;
    return node;
  }
  const tr = (key, vars) => (window.NDI18N ? window.NDI18N.t(key, vars) : key);
  function card(item) {
    const node = document.createElement("article");
    node.className = "card";
    node.append(text("span", tr(item[0]), "eyebrow"), text("h3", tr(item[1])), text("p", tr(item[2])));
    return node;
  }
  let category = "All";
  const categories = ["All", ...new Set(ND.features.map(item => item[0]))];
  function features() {
    const query = $("#fsearch").value.trim().toLowerCase();
    const items = ND.features.filter(item => (category === "All" || item[0] === category) && item.map(value => tr(value)).join(" ").toLowerCase().includes(query));
    $("#fgrid").replaceChildren(...items.map(card));
    $("#featureCount").textContent = items.length ? tr("{n} features", { n: items.length }) : tr("No matching features. Try another search or category.");
    $("#fchips").querySelectorAll("button").forEach(button => { const on = button.dataset.cat === category; button.setAttribute("aria-pressed", String(on)); button.classList.toggle("on", on); });
  }
  const tiles = [["⌘", "Work apps"], ["◉", "Meeting mode"], ["♫", "Media"], ["↗", "Share files"], ["✦", "AI assistance"], ["◈", "Creative tools"], ["☷", "Daily routine"], ["▣", "Presentation"]];
  let demoTimer;
  function banner() { $("#heroBanner").textContent = tr("Interactive preview · Try a tile."); }
  function buildTiles() {
    clearTimeout(demoTimer);
    $("#heroDeck").replaceChildren(...tiles.map(item => {
      const label = tr(item[1]);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tile";
      button.setAttribute("aria-label", tr("Preview {label}", { label }));
      button.append(text("span", item[0], "g"), text("span", label));
      button.addEventListener("click", () => {
        clearTimeout(demoTimer);
        $("#heroDeck").querySelectorAll("button").forEach(tile => tile.classList.remove("success"));
        button.classList.add("success");
        $("#heroBanner").textContent = tr("Preview: {label} is one tap away. No action runs on your devices.", { label });
        demoTimer = setTimeout(() => { button.classList.remove("success"); banner(); }, 2600);
      });
      return button;
    }));
    banner();
  }
  function build() {
    $("#useCases").replaceChildren(...ND.useCases.map(card));
    $("#appCards").replaceChildren(...ND.apps.map(card));
    $("#faq").replaceChildren(...ND.faq.map(item => {
      const node = document.createElement("details");
      node.className = "q";
      node.append(text("summary", tr(item[0])), text("p", tr(item[1])));
      return node;
    }));
    $("#fchips").replaceChildren(...categories.map(value => {
      const button = text("button", tr(value), "chip");
      button.type = "button";
      button.dataset.cat = value;
      button.addEventListener("click", () => { category = value; features(); });
      return button;
    }));
    features();
    buildTiles();
    $("#typed").textContent = tr("Your apps. Your routines. Your workspace.");
    theme(root.dataset.theme);
  }
  $("#fsearch").addEventListener("input", features);
  document.addEventListener("ndlang", build);
  build();
  scrollState();
}());
