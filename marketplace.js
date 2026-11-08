(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };

  // Theme: same preference key as the main page.
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("nd-theme"); } catch (_) { /* Storage is optional. */ }
  const setTheme = (v) => { root.dataset.theme = v; try { localStorage.setItem("nd-theme", v); } catch (_) { /* Storage is optional. */ } };
  setTheme(saved === "light" || saved === "dark" ? saved : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  $("#themeBtn").addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  const state = { packs: [], q: "", platform: "all", category: "All" };
  const SHA = /^[0-9a-f]{64}$/;
  const ID = /^[a-z0-9][a-z0-9-]{0,47}$/;

  const label = (key) => ({ primary: "Ctrl/⌘", alt: "Alt/⌥", shift: "Shift" }[key] ?? key);
  const keyText = (k) => [...k.mods.map(label), k.key.length === 1 ? k.key.toUpperCase() : k.key].join("+");
  const platformText = (p) => p.length === 2 ? "Mac and Windows" : p[0] === "mac" ? "Mac only" : "Windows only";
  const tint = (hex, i) => `color-mix(in srgb, ${hex} ${100 - (i % 4) * 9}%, #000)`;

  function visible() {
    const q = state.q.trim().toLowerCase();
    return state.packs.filter((p) =>
      (state.platform === "all" || p.platforms.includes(state.platform)) &&
      (state.category === "All" || p.category === state.category) &&
      (!q || [p.name, p.category, p.description, ...p.match].join(" ").toLowerCase().includes(q)));
  }

  function badge(node, pack) {
    node.style.background = pack.color;
    node.textContent = pack.name.trim()[0].toUpperCase();
  }

  function render() {
    const list = visible();
    $("#count").textContent = `${list.length} ${list.length === 1 ? "pack" : "packs"}`;
    $("#empty").hidden = list.length > 0;
    const grid = $("#grid");
    grid.replaceChildren(...list.map((pack, n) => {
      const card = el("button", "mp-card");
      card.type = "button";
      card.style.animationDelay = `${Math.min(n, 12) * 25}ms`;
      card.setAttribute("aria-label", `${pack.name}, ${pack.items} controls. Open details`);
      const top = el("div", "mp-top");
      const b = el("div", "mp-badge"); badge(b, pack);
      const titles = el("div");
      titles.append(el("h3", "", pack.name), el("span", "mp-sub", pack.category));
      top.append(b, titles);
      const mini = el("div", "mp-mini");
      for (let i = 0; i < 12; i++) { const t = el("i"); t.style.background = tint(pack.color, i); mini.append(t); }
      const tags = el("div", "mp-tags");
      tags.append(el("span", "mp-tag" + (pack.official ? " official" : ""), pack.official ? "Official" : "Community"), el("span", "mp-tag", platformText(pack.platforms)), el("span", "mp-tag", `${pack.items} controls`));
      card.append(top, mini, el("p", "", pack.description), tags);
      card.addEventListener("click", () => open(pack));
      return card;
    }));
  }

  function tiles(items, color, host) {
    for (const [i, item] of items.entries()) {
      const t = el("div", "mp-tile" + (item.type === "group" ? " group" : ""));
      t.style.background = tint(color, i);
      t.append(el("span", "", item.label));
      const sub = item.type === "shortcut" ? keyText(item.keys) : item.type === "app" ? "launch" : item.type === "group" ? `${item.items.length} inside` : item.type;
      t.append(el("b", "", sub));
      host.append(t);
    }
  }

  async function open(pack) {
    const d = $("#detail");
    badge($("#dBadge"), pack);
    $("#dTitle").textContent = pack.name;
    $("#dMeta").textContent = `${pack.category} · ${platformText(pack.platforms)} · by ${pack.author}${pack.official ? " (official)" : " (community)"}`;
    $("#dDesc").textContent = pack.description;
    $("#dHash").textContent = pack.sha256;
    const host = $("#dTiles");
    host.replaceChildren(el("span", "mp-sub", "Loading…"));
    const valid = ID.test(pack.id) && SHA.test(pack.sha256);
    const install = $("#dInstall");
    install.href = valid ? `nitrodeck://install?pack=${pack.id}&sha256=${pack.sha256}` : "#";
    const dl = $("#dDownload");
    dl.href = pack.file;
    dl.download = `${pack.id}.nitrodeck-pack.json`;
    $("#dNote").textContent = "Install opens the NitroDeck app on this computer and asks you to confirm before anything is created. Needs a NitroDeck version with pack install links. Otherwise download the file and use Import pack in the app.";
    if (!d.open) d.showModal();
    try {
      const res = await fetch(pack.file);
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      host.replaceChildren();
      tiles(data.items, pack.color, host);
    } catch (_) {
      host.replaceChildren(el("span", "mp-sub", "Preview unavailable."));
    }
  }

  function chips() {
    const cats = ["All", ...new Set(state.packs.map((p) => p.category))];
    const host = $("#cats");
    host.replaceChildren(...cats.map((c) => {
      const b = el("button", "", c);
      b.type = "button";
      b.setAttribute("aria-pressed", String(c === state.category));
      b.addEventListener("click", () => { state.category = c; chips(); render(); });
      return b;
    }));
  }

  $("#q").addEventListener("input", (e) => { state.q = e.target.value; render(); });
  $("#platform").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    state.platform = b.dataset.v;
    for (const x of $("#platform").children) x.setAttribute("aria-pressed", String(x === b));
    render();
  });
  $("#detail").addEventListener("click", (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); });

  fetch("catalog.json").then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); }).then((c) => {
    state.packs = c.packs.sort((a, b) => a.name.localeCompare(b.name));
    chips(); render();
    const wanted = new URLSearchParams(location.search).get("pack");
    const hit = wanted && state.packs.find((p) => p.id === wanted);
    if (hit) open(hit);
  }).catch(() => { $("#error").hidden = false; });
})();
