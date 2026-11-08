# Submitting a pack

Packs live in `packs/`. Each pack is two files:

- `packs/<id>.nitrodeck-pack.json`: the pack itself.
- `packs/<id>.meta.json`: how it appears in the marketplace.

`<id>` is lowercase letters, digits and hyphens, up to 48 characters, for example `affinity-photo`.

## The pack file

```json
{
  "format": "nitrodeck-pack",
  "version": 1,
  "title": "Affinity Photo",
  "items": [
    { "type": "app", "label": "Affinity Photo", "appName": "Affinity Photo" },
    { "type": "shortcut", "label": "Undo", "keys": { "mods": ["primary"], "key": "z" } },
    { "type": "group", "label": "Layers", "items": [
      { "type": "shortcut", "label": "New layer", "keys": { "mods": ["primary", "shift"], "key": "n" } }
    ] }
  ]
}
```

Rules, all checked automatically:

- Allowed item types: `app`, `shortcut`, `group`, `obs`, `gaming`, `system`, `stats`, `metric`, `media`, `notes`.
- At most 200 controls, six levels of groups, and 1 MiB.
- Labels are at most 120 characters.
- Shortcut `mods` can be `primary` (Ctrl on Windows, Command on Mac), `alt` (Alt, or Option on Mac) and `shift`. Shortcuts that need the Windows key or the Mac Control key are not allowed.
- Shortcut `key` comes from a fixed list: `a`-`z`, `0`-`9`, `f1`-`f20`, `enter`, `escape`, `tab`, `space`, `backspace`, `delete`, the arrow keys, `home`, `end`, `pageup`, `pagedown`, `minus`, `equal`, `comma`, `period`, `slash`, `backslash`, `semicolon`, `quote`, `bracketleft`, `bracketright`, `grave`.
- No scripts, commands, paths, URLs, tokens or any field not listed above. Unknown fields fail validation.

## The meta file

```json
{
  "name": "Affinity Photo",
  "category": "Community",
  "description": "Layers, selections and view shortcuts for Affinity Photo.",
  "color": "#1B72BE",
  "icon": "palette",
  "platforms": ["windows", "mac"],
  "match": ["Affinity Photo"],
  "author": "your-github-name"
}
```

Use the `Community` category for new packs. `official` is reserved for NitroDeck packs and is ignored on community submissions.

## Easiest way: the pack generator

Open `generator.html` (linked from the Packs page), fill in the form, add your shortcuts and download the two files. Then use the GitHub upload button on that page to drop them into `packs/` and open a pull request. The generator checks every rule above as you type.

## By hand

Check your files, then open a pull request that adds both of them:

```bash
node tools/build-catalog.mjs --validate
```

You do not need to update `catalog.json`. A workflow rebuilds it after your pull request is merged. The "Validate packs" check runs the same validation on your pull request.

Reviewers look for: shortcuts that really exist in the app, clear labels, and no surprises. Please test the pack in NitroDeck on at least one platform first.
