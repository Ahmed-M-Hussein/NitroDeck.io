// Validates every pack in packs/ against the pack marketplace contract and writes catalog.json.
// Usage: node tools/build-catalog.mjs [--check]   (--check validates and fails if catalog.json is out of date)
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(root, 'packs');
const check = process.argv.includes('--check');

const CATEGORIES = ['Development', 'Creative', 'Gaming and chat', 'Microsoft Office', 'Notes and documents', 'Windows tools', 'Browsers', 'AI', 'Streaming and media', 'Game development', 'Community'];
const TYPES = new Set(['app', 'obs', 'gaming', 'system', 'stats', 'metric', 'media', 'notes', 'group', 'shortcut']);
const ID = /^[a-z0-9][a-z0-9-]{0,47}$/;
const MODS = new Set(['primary', 'alt', 'shift']);
const KEYS = new Set([...'abcdefghijklmnopqrstuvwxyz0123456789', ...Array.from({ length: 20 }, (_, i) => `f${i + 1}`),
  'enter', 'escape', 'tab', 'space', 'backspace', 'delete', 'up', 'down', 'left', 'right', 'home', 'end', 'pageup', 'pagedown',
  'minus', 'equal', 'comma', 'period', 'slash', 'backslash', 'semicolon', 'quote', 'bracketleft', 'bracketright', 'grave']);
const SYSTEM = new Set(['play-pause', 'next-track', 'previous-track', 'desktop-previous', 'desktop-next', 'volume-up', 'volume-down', 'mute']);
const METRIC = new Set(['cpu', 'memory', 'disk', 'battery', 'network', 'thermal', 'gpu']);
const OBS = new Set(['outputs', 'scenes', 'audio', 'sources', 'status']);
const GAMING = new Set(['favorites', 'session', 'audio', 'discord', 'twitch', 'soundboard', 'lighting', 'feedback']);
const ITEM_FIELDS = new Set(['type', 'label', 'span', 'obsPanel', 'gamingPanel', 'appName', 'systemAction', 'metricKind', 'items', 'keys']);
const errors = [];
const fail = (id, msg) => errors.push(`${id}: ${msg}`);

function validatePack(id, bytes) {
  if (bytes.length > 1_048_576) return fail(id, 'larger than 1 MiB');
  let pack;
  try { pack = JSON.parse(bytes.toString('utf8')); } catch { return fail(id, 'not valid JSON'); }
  const own = Object.keys(pack).sort().join();
  if (own !== 'format,items,title,version') fail(id, `unexpected top-level fields (${own})`);
  if (pack.format !== 'nitrodeck-pack' || pack.version !== 1) fail(id, 'format must be nitrodeck-pack version 1');
  if (typeof pack.title !== 'string' || !pack.title || pack.title.length > 120) fail(id, 'bad title');
  let count = 0;
  const walk = (items, depth, path) => {
    if (!Array.isArray(items)) return fail(id, `${path} items must be an array`);
    for (const [n, item] of items.entries()) {
      const at = `${path}[${n}]`;
      if (++count > 200) return fail(id, 'more than 200 controls');
      if (depth > 6) return fail(id, 'nested deeper than six levels');
      for (const k of Object.keys(item)) if (!ITEM_FIELDS.has(k)) fail(id, `${at}: unknown field "${k}"`);
      if (!TYPES.has(item.type)) fail(id, `${at}: unknown type "${item.type}"`);
      if (typeof item.label !== 'string' || !item.label || item.label.length > 120) fail(id, `${at}: bad label`);
      if (item.span !== undefined && ![1, 2, 3, 4].includes(item.span)) fail(id, `${at}: bad span`);
      const only = (field, type) => { if (item[field] !== undefined && item.type !== type) fail(id, `${at}: ${field} only allowed on ${type}`); };
      only('appName', 'app'); only('obsPanel', 'obs'); only('gamingPanel', 'gaming'); only('systemAction', 'system'); only('metricKind', 'metric'); only('items', 'group'); only('keys', 'shortcut');
      if (item.type === 'system' && !SYSTEM.has(item.systemAction)) fail(id, `${at}: bad systemAction`);
      if (item.type === 'metric' && !METRIC.has(item.metricKind)) fail(id, `${at}: bad metricKind`);
      if (item.type === 'obs' && !OBS.has(item.obsPanel)) fail(id, `${at}: bad obsPanel`);
      if (item.type === 'gaming' && !GAMING.has(item.gamingPanel)) fail(id, `${at}: bad gamingPanel`);
      if (item.type === 'shortcut') {
        const k = item.keys;
        if (!k || Object.keys(k).sort().join() !== 'key,mods') fail(id, `${at}: keys must be exactly {mods, key}`);
        else if (!Array.isArray(k.mods) || k.mods.length > 3 || new Set(k.mods).size !== k.mods.length || !k.mods.every((m) => MODS.has(m)) || !KEYS.has(k.key)) fail(id, `${at}: invalid shortcut keys`);
      }
      if (item.type === 'group') walk(item.items ?? [], depth + 1, `${at}.items`);
    }
  };
  walk(pack.items, 1, 'items');
  return count;
}

const files = readdirSync(dir).filter((f) => f.endsWith('.nitrodeck-pack.json')).sort();
const packs = [];
for (const file of files) {
  const id = file.replace('.nitrodeck-pack.json', '');
  if (!ID.test(id)) { fail(id, 'id must match ^[a-z0-9][a-z0-9-]{0,47}$'); continue; }
  const bytes = readFileSync(resolve(dir, file));
  const items = validatePack(id, bytes);
  const metaPath = resolve(dir, `${id}.meta.json`);
  if (!existsSync(metaPath)) { fail(id, 'missing packs/<id>.meta.json'); continue; }
  const m = JSON.parse(readFileSync(metaPath, 'utf8'));
  if (!CATEGORIES.includes(m.category)) fail(id, `category must be one of: ${CATEGORIES.join(', ')}`);
  if (typeof m.name !== 'string' || !m.name || m.name.length > 60) fail(id, 'meta.name required (max 60)');
  if (typeof m.description !== 'string' || m.description.length > 200) fail(id, 'meta.description required (max 200)');
  if (!/^#[0-9A-Fa-f]{6}$/.test(m.color ?? '')) fail(id, 'meta.color must be #RRGGBB');
  if (!Array.isArray(m.platforms) || !m.platforms.length || !m.platforms.every((p) => ['windows', 'mac'].includes(p))) fail(id, 'meta.platforms must be a non-empty list of windows/mac');
  if (typeof m.author !== 'string' || !m.author) fail(id, 'meta.author required');
  packs.push({
    id, name: m.name, category: m.category, description: m.description, color: m.color, icon: m.icon ?? 'app', platforms: m.platforms,
    match: m.match ?? [], author: m.author, official: m.official === true, items: items ?? 0,
    file: `packs/${file}`, sha256: createHash('sha256').update(bytes).digest('hex'),
  });
}
if (errors.length) { console.error(`Catalog invalid:\n- ${errors.join('\n- ')}`); process.exit(1); }

const next = JSON.stringify({ version: 1, packs }, null, 2) + '\n';
const target = resolve(root, 'catalog.json');
if (check) {
  if (!existsSync(target) || readFileSync(target, 'utf8') !== next) { console.error('catalog.json is out of date. Run: node tools/build-catalog.mjs'); process.exit(1); }
  console.log(`catalog.json is up to date (${packs.length} packs).`);
} else {
  writeFileSync(target, next);
  console.log(`Wrote catalog.json with ${packs.length} packs.`);
}
