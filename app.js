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
    themeButton.setAttribute("aria-label", value === "dark" ? "Switch to light theme" : "Switch to dark theme");
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
  function card(item) {
    const node = document.createElement("article");
    node.className = "card";
    node.append(text("span", item[0], "eyebrow"), text("h3", item[1]), text("p", item[2]));
    return node;
  }
  ND.useCases.forEach(item => $("#useCases").append(card(item)));
  ND.apps.forEach(item => $("#appCards").append(card(item)));
  ND.faq.forEach(item => {
    const node = document.createElement("details");
    node.className = "q";
    node.append(text("summary", item[0]), text("p", item[1]));
    $("#faq").append(node);
  });
  let category = "All";
  const categories = ["All", ...new Set(ND.features.map(item => item[0]))];
  function features() {
    const query = $("#fsearch").value.trim().toLowerCase();
    const items = ND.features.filter(item => (category === "All" || item[0] === category) && item.join(" ").toLowerCase().includes(query));
    $("#fgrid").replaceChildren(...items.map(card));
    $("#featureCount").textContent = items.length ? `${items.length} features` : "No matching features. Try another search or category.";
    $("#fchips").querySelectorAll("button").forEach(button => { button.setAttribute("aria-pressed", String(button.textContent === category)); button.classList.toggle("on", button.textContent === category); });
  }
  categories.forEach(value => {
    const button = text("button", value, "chip");
    button.type = "button";
    button.addEventListener("click", () => { category = value; features(); });
    $("#fchips").append(button);
  });
  $("#fsearch").addEventListener("input", features);
  features();
  const tiles = [["⌘", "Work apps"], ["◉", "Meeting mode"], ["♫", "Media"], ["↗", "Share files"], ["✦", "AI assistance"], ["◈", "Creative tools"], ["☷", "Daily routine"], ["▣", "Presentation"]];
  let demoTimer;
  tiles.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tile";
    button.setAttribute("aria-label", `Preview ${item[1]}`);
    button.append(text("span", item[0], "g"), text("span", item[1]));
    button.addEventListener("click", () => {
      clearTimeout(demoTimer);
      $("#heroDeck").querySelectorAll("button").forEach(tile => tile.classList.remove("success"));
      button.classList.add("success");
      $("#heroBanner").textContent = `Preview: ${item[1]} is one tap away. No action runs on your devices.`;
      demoTimer = setTimeout(() => { button.classList.remove("success"); $("#heroBanner").textContent = "Interactive preview · Try a tile."; }, 2600);
    });
    $("#heroDeck").append(button);
  });
  $("#typed").textContent = "Your apps. Your routines. Your workspace.";
  scrollState();
}());
