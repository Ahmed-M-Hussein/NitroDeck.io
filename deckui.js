/* Rendered NitroDeck home screen: small tiles, widgets and sections, built from data.
   Used in the hero and the first feature row. Everything is text-only DOM, no innerHTML. */
(() => {
  "use strict";
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const tr = (s, v) => (window.NDI18N ? window.NDI18N.t(s, v) : s);
  const T = (icon, label, state, extra) => ({ k: "tile", icon, label, state, extra });

  const PROFILES = {
    dev: {
      name: "Developer", icon: "{ }", app: "Visual Studio Code", host: "MacBook Pro",
      items: [
        { k: "label", text: "Build and ship" },
        T("⚡", "Build and ship", "run"), T("▶", "Run tests", "ok"), T("▶", "Lint", "err"),
        T("▶", "Dev server"), T("⚡", "Deploy"), T("⎇", "Git pull"),
        { k: "label", text: "Machine" },
        { k: "stats", span: 3, title: "System", rows: [["CPU", 37, "ok", "%"], ["Memory", 69, "warn", "%"], ["Disk", 52, "ok", "%"], ["Battery", 88, "ok", "%"]] },
        { k: "slider", span: 3, title: "Volume", value: 64 },
        { k: "slider", span: 3, title: "Brightness", value: 82 },
        { k: "label", text: "Everyday" },
        T("⌘⇧4", "Screenshot"), T("🔇", "Mute"), T("🎙", "Mic", "ok"), T("♫", "Spotify"), T("●", "OBS scene"), { k: "toggle", title: "Focus", on: true },
        { k: "chips", span: 6, title: "main", chips: [["Modified", "3"], ["Staged", "1"], ["Ahead", "2"], ["Tests", "128 ok"]] },
      ],
    },
    creative: {
      name: "Creative", icon: "✦", app: "Adobe Photoshop", host: "Studio PC",
      items: [
        { k: "label", text: "Tools" },
        T("↶", "Undo"), T("↷", "Redo"), T("✎", "Brush", "run"), T("◌", "Eraser"), T("▤", "Layers"), T("⇪", "Export", "ok"),
        { k: "label", text: "Adjust" },
        { k: "dial", span: 2, title: "Brush size", value: 62, text: "62 px" },
        { k: "slider", span: 4, title: "Opacity", value: 78 },
        { k: "swatch", span: 3, title: "Color", colors: ["#f1a99c", "#91b6ff", "#6fd3a0", "#f2c46d", "#b79cff"] },
        { k: "dial", span: 3, title: "Zoom", value: 40, text: "120%" },
        { k: "label", text: "Everyday" },
        T("⌘⇧4", "Screenshot"), T("🔇", "Mute"), T("♫", "Spotify", "ok"), T("☀", "Lights"), T("⇄", "Send file"), { k: "toggle", title: "Focus", on: false },
        { k: "chips", span: 6, title: "Export", chips: [["Preset", "Web"], ["Format", "PNG"], ["Scale", "2x"], ["Queue", "2 jobs"]] },
      ],
    },
    meeting: {
      name: "Meetings", icon: "◉", app: "Zoom", host: "MacBook Pro",
      items: [
        { k: "label", text: "In the call" },
        T("🎙", "Mic", "ok"), T("▣", "Camera"), T("⇪", "Share"), T("✋", "Raise hand"), T("●", "Record", "run"), T("⏻", "Leave", "err"),
        { k: "label", text: "Room" },
        { k: "meet", span: 3, title: "Next meeting", time: "10:30", name: "Design review", sub: "4 people · Zoom" },
        { k: "slider", span: 3, title: "Speaker volume", value: 58 },
        { k: "slider", span: 3, title: "Room lights", value: 70 },
        { k: "label", text: "Everyday" },
        T("⌘⇧4", "Screenshot"), T("💬", "Chat"), T("♫", "Spotify"), T("▤", "Notes"), T("⇄", "Send file"), { k: "toggle", title: "Do not disturb", on: true },
        { k: "chips", span: 6, title: "Today", chips: [["Meetings", "3"], ["Next", "10:30"], ["Recording", "On"], ["Mic", "Live"]] },
      ],
    },
  };

  function node(it) {
    const span = it.span ? " s" + it.span : "";
    switch (it.k) {
      case "label": return el("p", "du-label", tr(it.text));
      case "tile": {
        const t = el("div", "du-tile" + (it.state ? " " + it.state : ""));
        const badge = el("i", "du-badge");
        if (it.state === "ok") badge.textContent = "✓"; else if (it.state === "err") badge.textContent = "!"; else if (it.state === "run") badge.className = "du-badge du-spin";
        t.append(badge, el("b", "du-ico" + (it.icon.length > 2 ? " wide" : ""), it.icon), el("span", "", tr(it.label)));
        return t;
      }
      case "stats": {
        const w = el("div", "du-w du-rs2" + span);
        w.append(el("h4", "", tr(it.title)));
        for (const [name, v, tone, unit] of it.rows) {
          const r = el("div", "du-row");
          const head = el("div", "du-rh"); const val = el("em", "", v + unit);
          head.append(el("span", "", tr(name)), val);
          const bar = el("div", "du-bar"); const fill = el("i", tone); fill.style.width = v + "%";
          if (name === "CPU" || name === "Memory") { fill.dataset.live = name; val.dataset.live = name; }
          bar.append(fill); r.append(head, bar); w.append(r);
        }
        return w;
      }
      case "slider": {
        const w = el("div", "du-w du-sl" + span);
        const head = el("div", "du-rh"); head.append(el("h4", "", tr(it.title)), el("em", "", it.value + "%"));
        const bar = el("div", "du-track"); const f = el("i"); f.style.width = it.value + "%"; const knob = el("u"); f.append(knob); bar.append(f);
        const btns = el("div", "du-btns"); btns.append(el("span", "", "−"), el("span", "", "+"));
        w.append(head, bar, btns);
        return w;
      }
      case "dial": {
        const w = el("div", "du-w du-dial" + span);
        const ring = el("div", "du-ring"); ring.style.setProperty("--v", it.value); ring.append(el("b", "", tr(it.text)));
        w.append(el("h4", "", tr(it.title)), ring);
        return w;
      }
      case "swatch": {
        const w = el("div", "du-w" + span); w.append(el("h4", "", tr(it.title)));
        const row = el("div", "du-sw"); it.colors.forEach((c, i) => { const s = el("i"); s.style.background = c; if (i === 1) s.className = "on"; row.append(s); });
        w.append(row); return w;
      }
      case "meet": {
        const w = el("div", "du-w du-rs2 du-meet" + span);
        const head = el("div", "du-rh"); head.append(el("h4", "", tr(it.title)), el("em", "", it.time));
        w.append(head, el("b", "", tr(it.name)), el("small", "", tr(it.sub)), el("span", "du-join", tr("Join")));
        return w;
      }
      case "toggle": {
        const t = el("div", "du-tile du-tg" + (it.on ? " on" : ""));
        const sw = el("div", "du-switch"); sw.append(el("i"));
        t.append(sw, el("span", "", tr(it.title)));
        return t;
      }
      case "chips": {
        const w = el("div", "du-w du-chips" + span);
        w.append(el("h4", "", tr(it.title)));
        const row = el("div", "du-cr");
        for (const [a, b] of it.chips) { const c = el("span"); c.append(el("small", "", tr(a)), el("b", "", tr(b))); row.append(c); }
        w.append(row); return w;
      }
    }
    return el("span");
  }

  function render(host, key) {
    const p = PROFILES[key];
    host.dataset.profile = key;
    host.replaceChildren();
    const top = el("div", "du-top");
    const logo = el("img", "du-logo"); logo.src = "assets/appIcon.png"; logo.alt = "";
    const pills = el("div", "du-pills");
    for (const [k, v] of Object.entries(PROFILES)) {
      const b = el("button", "du-pill" + (k === key ? " on" : ""), v.icon);
      b.type = "button"; b.dataset.p = k; b.title = tr(v.name); b.setAttribute("aria-label", tr(v.name));
      pills.append(b);
    }
    const dev = el("div", "du-dev"); dev.append(el("b", "", p.host), el("span", "", "● " + tr("Connected · Local")));
    top.append(logo, pills, dev);
    const nav = el("div", "du-nav");
    ["Home", "Process", "Queue", "Meetings", "Settings"].forEach((n, i) => nav.append(el("span", i === 0 ? "on" : "", tr(n))));
    const smart = el("div", "du-smart"); smart.append(el("span", "du-dot"), el("span", "", tr("deck.front", { app: p.app, profile: tr(p.name) })));
    const grid = el("div", "du-grid");
    p.items.forEach((it) => grid.append(node(it)));
    host.append(top, nav, smart, grid);
  }

  function init(host, switchable) {
    render(host, host.dataset.profile || "dev");
    if (!switchable) return;
    const keys = Object.keys(PROFILES);
    let timer = null, paused = false;
    host.addEventListener("click", (e) => {
      const b = e.target.closest(".du-pill"); if (!b) return;
      paused = true; render(host, b.dataset.p);
    });
    host.addEventListener("pointerenter", () => { paused = true; });
    host.addEventListener("pointerleave", () => { paused = false; });
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = setInterval(() => {
        if (paused || document.hidden) return;
        const next = keys[(keys.indexOf(host.dataset.profile) + 1) % keys.length];
        host.classList.add("fade");
        setTimeout(() => { render(host, next); host.classList.remove("fade"); }, 220);
      }, 6000);
    }
  }

  // Live numbers on the stats widget.
  function live() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setInterval(() => {
      document.querySelectorAll(".deckui [data-live]").forEach((n) => {
        const base = n.dataset.live === "CPU" ? 37 : 69;
        const v = Math.max(8, Math.min(96, base + Math.round((Math.random() - 0.5) * 14)));
        if (n.tagName === "I") n.style.width = v + "%"; else n.textContent = v + "%";
      });
    }, 1800);
  }

  document.querySelectorAll(".deckui").forEach((h) => init(h, h.hasAttribute("data-switch")));
  document.addEventListener("ndlang", () => document.querySelectorAll(".deckui").forEach((h) => render(h, h.dataset.profile || "dev")));
  live();
})();
