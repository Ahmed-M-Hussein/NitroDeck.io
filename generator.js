(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };

  // Theme: same preference key as the other pages.
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("nd-theme"); } catch (_) { /* Storage is optional. */ }
  const setTheme = (v) => { root.dataset.theme = v; try { localStorage.setItem("nd-theme", v); } catch (_) { /* Storage is optional. */ } };
  setTheme(saved === "light" || saved === "dark" ? saved : matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  $("#themeBtn").addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  // The rules below mirror docs/marketplace-contract.md and tools/build-catalog.mjs.
  const CATEGORIES = ["Community", "Development", "Creative", "Gaming and chat", "Microsoft Office", "Notes and documents", "Windows tools", "Browsers", "AI", "Streaming and media", "Game development"];
  const ICONS = { "Microsoft Office": "document", Development: "code", Creative: "palette", "Gaming and chat": "gamepad", "Notes and documents": "notes", "Windows tools": "settings", Browsers: "globe", AI: "sparkle", "Streaming and media": "broadcast", "Game development": "cube", Community: "app" };
  const KEYS = [..."abcdefghijklmnopqrstuvwxyz0123456789", ...Array.from({ length: 20 }, (_, i) => `f${i + 1}`),
    "enter", "escape", "tab", "space", "backspace", "delete", "up", "down", "left", "right", "home", "end", "pageup", "pagedown",
    "minus", "equal", "comma", "period", "slash", "backslash", "semicolon", "quote", "bracketleft", "bracketright", "grave"];
  const CODE_TO_KEY = { Enter: "enter", Escape: "escape", Tab: "tab", Space: "space", Backspace: "backspace", Delete: "delete", ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right",
    Home: "home", End: "end", PageUp: "pageup", PageDown: "pagedown", Minus: "minus", Equal: "equal", Comma: "comma", Period: "period", Slash: "slash", Backslash: "backslash",
    Semicolon: "semicolon", Quote: "quote", BracketLeft: "bracketleft", BracketRight: "bracketright", Backquote: "grave" };
  const MODS = [["primary", "Ctrl/⌘"], ["alt", "Alt/⌥"], ["shift", "Shift"]];
  const REPO = "https://github.com/Ahmed-M-Hussein/NitroDeck.io";

  const state = { items: [], recording: null };
  const newShortcut = () => ({ type: "shortcut", label: "", keys: { mods: ["primary"], key: "" } });
  const newGroup = () => ({ type: "group", label: "", items: [newShortcut()] });

  const f = { name: $("#name"), id: $("#id"), desc: $("#desc"), cat: $("#cat"), color: $("#color"), author: $("#author"), appName: $("#appName"), mac: $("#pMac"), win: $("#pWin") };
  for (const c of CATEGORIES) f.cat.append(new Option(c, c));
  let idTouched = false;
  const slug = (t) => t.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);

  function keyFromEvent(e) {
    if (/^Key[A-Z]$/.test(e.code)) return e.code[3].toLowerCase();
    if (/^Digit[0-9]$/.test(e.code)) return e.code[5];
    if (/^F([1-9]|1[0-9]|20)$/.test(e.code)) return e.code.toLowerCase();
    return CODE_TO_KEY[e.code] ?? null;
  }
  window.addEventListener("keydown", (e) => {
    const rec = state.recording;
    if (!rec) return;
    if (["Control", "Alt", "Shift", "Meta"].includes(e.key)) return;
    e.preventDefault();
    if (e.ctrlKey && e.metaKey) return flash("Use either Ctrl or ⌘, not both. They are the same key in a pack.");
    const key = keyFromEvent(e);
    if (!key) return flash("That key is not allowed in packs. Pick another.");
    rec.keys = { mods: MODS.map((m) => m[0]).filter((m) => (m === "primary" ? e.ctrlKey || e.metaKey : m === "alt" ? e.altKey : e.shiftKey)), key };
    state.recording = null;
    flashClear(); renderItems(); refresh();
  }, true);
  let flashEl = null;
  const flash = (msg) => { flashEl ??= $("#prNote"); flashEl.textContent = msg; };
  const flashClear = () => { refresh(); };

  function shortcutRow(item, list, index, onChange) {
    const row = el("div", "gen-row");
    const label = el("input"); label.placeholder = "Label, e.g. Bold"; label.maxLength = 120; label.value = item.label; label.setAttribute("aria-label", "Control label");
    label.addEventListener("input", () => { item.label = label.value; refresh(); });
    const mods = el("div", "gen-mods");
    for (const [m, text] of MODS) {
      const b = el("button", "gen-mod", text); b.type = "button";
      b.setAttribute("aria-pressed", String(item.keys.mods.includes(m)));
      b.addEventListener("click", () => { item.keys.mods = item.keys.mods.includes(m) ? item.keys.mods.filter((x) => x !== m) : MODS.map((x) => x[0]).filter((x) => x === m || item.keys.mods.includes(x)); b.setAttribute("aria-pressed", String(item.keys.mods.includes(m))); refresh(); });
      mods.append(b);
    }
    const rec = el("button", "gen-small rec" + (state.recording === item ? " on" : ""), state.recording === item ? "Press keys…" : "Record"); rec.type = "button";
    rec.addEventListener("click", () => { state.recording = state.recording === item ? null : item; renderItems(); });
    mods.append(rec);
    const key = el("select"); key.setAttribute("aria-label", "Key");
    key.append(new Option("Key…", ""));
    for (const k of KEYS) key.append(new Option(k, k));
    key.value = item.keys.key;
    key.addEventListener("change", () => { item.keys.key = key.value; refresh(); });
    row.append(label, mods, key, tools(list, index, onChange));
    return row;
  }

  function tools(list, index, onChange) {
    const t = el("div", "gen-tools");
    const mk = (text, title, fn, disabled) => { const b = el("button", "gen-small", text); b.type = "button"; b.title = title; b.setAttribute("aria-label", title); b.disabled = disabled; b.addEventListener("click", fn); return b; };
    const move = (d) => () => { [list[index], list[index + d]] = [list[index + d], list[index]]; onChange(); };
    t.append(mk("↑", "Move up", move(-1), index === 0), mk("↓", "Move down", move(1), index === list.length - 1), mk("✕", "Remove", () => { list.splice(index, 1); onChange(); }, false));
    return t;
  }

  function renderItems() {
    const host = $("#items");
    const again = () => { renderItems(); refresh(); };
    host.replaceChildren(...state.items.map((item, i) => {
      if (item.type === "shortcut") return shortcutRow(item, state.items, i, again);
      const row = el("div", "gen-row group");
      const head = el("div", "gen-group-head");
      const label = el("input"); label.placeholder = "Group name, e.g. Format"; label.maxLength = 120; label.value = item.label; label.setAttribute("aria-label", "Group name");
      label.addEventListener("input", () => { item.label = label.value; refresh(); });
      head.append(el("span", "mp-sub", "Group"), label, tools(state.items, i, again));
      const sub = el("div", "gen-sub");
      item.items.forEach((child, ci) => sub.append(shortcutRow(child, item.items, ci, again)));
      const add = el("button", "gen-small", "+ Shortcut in this group"); add.type = "button";
      add.addEventListener("click", () => { item.items.push(newShortcut()); again(); });
      sub.append(add);
      row.append(head, sub);
      return row;
    }));
  }

  const primaryCount = (items) => items.reduce((n, i) => n + 1 + (i.items ? primaryCount(i.items) : 0), 0);

  function build() {
    const problems = [];
    const name = f.name.value.trim();
    const id = f.id.value.trim();
    const app = f.appName.value.trim();
    if (!name) problems.push("Give the pack a name.");
    if (!/^[a-z0-9][a-z0-9-]{0,47}$/.test(id)) problems.push("The pack id needs lowercase letters, digits and hyphens, for example affinity-photo.");
    if (!f.desc.value.trim()) problems.push("Add a short description.");
    if (!f.author.value.trim()) problems.push("Add your GitHub name as the author.");
    if (!f.mac.checked && !f.win.checked) problems.push("Choose at least one platform.");
    const items = [];
    if (app) items.push({ type: "app", label: app.slice(0, 120), appName: app });
    const convert = (item, where) => {
      const label = item.label.trim();
      if (!label) problems.push(`${where} needs a label.`);
      if (item.type === "group") {
        if (!item.items.length) problems.push(`${where} is empty. Add a shortcut or remove it.`);
        return { type: "group", label, items: item.items.map((c, n) => convert(c, `${label || "Group"}, shortcut ${n + 1}`)) };
      }
      if (!item.keys.key) problems.push(`${where} needs a key.`);
      return { type: "shortcut", label, keys: { mods: [...item.keys.mods], key: item.keys.key } };
    };
    state.items.forEach((item, n) => items.push(convert(item, item.type === "group" ? `Group ${n + 1}` : `Shortcut ${n + 1}`)));
    if (!items.length) problems.push("Add at least one control.");
    if (primaryCount(items) > 200) problems.push("Packs are limited to 200 controls.");
    const pack = { format: "nitrodeck-pack", version: 1, title: name, items };
    const platforms = [f.mac.checked && "mac", f.win.checked && "windows"].filter(Boolean);
    const meta = { name, category: f.cat.value, description: f.desc.value.trim(), color: f.color.value, icon: ICONS[f.cat.value] ?? "app", platforms, match: [app || name].filter(Boolean), author: f.author.value.trim() };
    const json = JSON.stringify(pack, null, 2) + "\n";
    if (json.length > 1_048_576) problems.push("The pack is larger than 1 MB.");
    return { problems, pack, meta, json, metaJson: JSON.stringify(meta, null, 2) + "\n", id };
  }

  const shown = (k) => (k.key ? [...k.mods.map((m) => MODS.find((x) => x[0] === m)[1]), k.key.length === 1 ? k.key.toUpperCase() : k.key].join("+") : "…");
  function tint(hex, i) { return `color-mix(in srgb, ${hex} ${100 - (i % 4) * 9}%, #000)`; }

  function refresh() {
    const out = build();
    const host = $("#preview");
    host.replaceChildren();
    out.pack.items.forEach((item, i) => {
      const t = el("div", "mp-tile" + (item.type === "group" ? " group" : ""));
      t.style.background = tint(f.color.value, i);
      t.append(el("span", "", item.label || "Untitled"), el("b", "", item.type === "shortcut" ? shown(item.keys) : item.type === "app" ? "launch" : `${item.items.length} inside`));
      host.append(t);
    });
    if (!out.pack.items.length) host.append(el("span", "mp-sub", "Your tiles appear here."));
    $("#count").textContent = `${primaryCount(out.pack.items)} controls`;
    const list = $("#problems");
    list.replaceChildren(...(out.problems.length ? out.problems.map((p) => el("li", "", p)) : [Object.assign(el("li", "ok", "Everything checks out. Ready to submit."))]));
    const ok = out.problems.length === 0;
    for (const b of [$("#dlPack"), $("#dlMeta"), $("#copy")]) b.disabled = !ok;
    const pr = $("#pr");
    pr.setAttribute("aria-disabled", String(!ok));
    pr.href = ok ? `${REPO}/upload/main/packs` : "#";
    pr.textContent = "Upload both files on GitHub";
    $("#prNote").textContent = ok
      ? "1. Download both files. 2. Click the GitHub button and drop them in. 3. Choose “Create a new branch and start a pull request”. The catalog updates after it is merged."
      : "Fix the items above to enable submitting.";
    $("#packName").textContent = `packs/${out.id || "your-id"}.nitrodeck-pack.json`;
    $("#metaName").textContent = `packs/${out.id || "your-id"}.meta.json`;
    $("#packJson").textContent = out.json;
    $("#metaJson").textContent = out.metaJson;
    last = out;
  }
  let last = null;

  function download(name, text) {
    const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: name });
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  $("#dlPack").addEventListener("click", () => last && download(`${last.id}.nitrodeck-pack.json`, last.json));
  $("#dlMeta").addEventListener("click", () => last && download(`${last.id}.meta.json`, last.metaJson));
  $("#copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(last.json); $("#copy").textContent = "Copied"; }
    catch (_) { $("#copy").textContent = "Copy failed. Use Show the files"; }
    setTimeout(() => { $("#copy").textContent = "Copy pack JSON"; }, 1800);
  });
  $("#pr").addEventListener("click", (e) => { if ($("#pr").getAttribute("aria-disabled") === "true") e.preventDefault(); });

  $("#addShortcut").addEventListener("click", () => { state.items.push(newShortcut()); renderItems(); refresh(); });
  $("#addGroup").addEventListener("click", () => { state.items.push(newGroup()); renderItems(); refresh(); });

  // Import an existing pack to edit it. Anything outside the contract is ignored, never kept.
  $("#importFile").addEventListener("change", async (e) => {
    const file = e.target.files[0]; e.target.value = "";
    if (!file || file.size > 1_048_576) return flash("Choose a pack file under 1 MB.");
    try {
      const data = JSON.parse(await file.text());
      if (data.format !== "nitrodeck-pack" || data.version !== 1 || !Array.isArray(data.items)) throw new Error();
      const shortcut = (i) => ({ type: "shortcut", label: String(i.label ?? "").slice(0, 120), keys: { mods: MODS.map((m) => m[0]).filter((m) => (i.keys?.mods ?? []).includes(m)), key: KEYS.includes(i.keys?.key) ? i.keys.key : "" } });
      state.items = []; let app = "";
      for (const i of data.items) {
        if (i.type === "app" && !app) app = String(i.appName ?? i.label ?? "");
        else if (i.type === "shortcut") state.items.push(shortcut(i));
        else if (i.type === "group") state.items.push({ type: "group", label: String(i.label ?? "").slice(0, 120), items: (i.items ?? []).filter((c) => c.type === "shortcut").map(shortcut) });
      }
      f.name.value = String(data.title ?? "").slice(0, 60); f.appName.value = app.slice(0, 120);
      if (!f.id.value) f.id.value = slug(f.name.value);
      renderItems(); refresh();
    } catch (_) { flash("That file is not a NitroDeck pack."); }
  });

  f.name.addEventListener("input", () => { if (!idTouched) f.id.value = slug(f.name.value); refresh(); });
  f.id.addEventListener("input", () => { idTouched = true; f.id.value = f.id.value.toLowerCase().replace(/[^a-z0-9-]/g, ""); refresh(); });
  for (const k of ["desc", "cat", "color", "author", "appName", "mac", "win"]) f[k].addEventListener("input", refresh);

  state.items.push(newShortcut());
  renderItems(); refresh();
})();
