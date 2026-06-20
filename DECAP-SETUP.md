# SVA AUT — Decap CMS setup

This site now has a Git-based CMS (Decap) so you can edit **Events**, **Shop
products**, and **Site settings** from a friendly admin UI instead of editing
HTML. Content is saved as JSON in the `content/` folder, and the page renders
from that JSON on load.

```
admin/
  index.html        # loads the Decap admin UI
  config.yml        # what's editable + where it's saved
content/
  events.json       # { "events": [ ... ] }
  shop.json         # { "products": [ ... ] }
  settings.json     # hero text, stats, contact, social
js/main.js          # fetches the JSON above and renders the page
```

## What you need

- **Node.js** (you already have it) — used to run the local CMS proxy.
- A **local web server** to view the site over `http://` (the CMS, and the
  page's content loading, don't work from a `file://` double-click).

## Run it locally (no account, no internet needed)

From the project folder (`SVA New Website`), in order:

```bash
# 1. One-time: make this a git repo (Decap's local proxy needs one)
git init

# 2. Start the CMS proxy — leave this running
npx decap-server

# 3. In a SECOND terminal, serve the site — also leave running
npx serve            # or:  python3 -m http.server 8080
```

Then open the admin at the address your server prints, e.g.:

- `npx serve` → usually http://localhost:3000/admin/
- `python3 -m http.server 8080` → http://localhost:8080/admin/

Edit content, hit **Publish** → Decap writes the change straight into the
`content/*.json` files. Refresh the site (same server) to see it.

> `local_backend: true` in `admin/config.yml` is what points the CMS at the
> local proxy. There's no login in local mode — it's for your machine only.

## How content flows

1. You edit in `/admin` → Decap saves JSON to `content/`.
2. `js/main.js` fetches those JSON files and renders the Events grid, Shop
   grid, hero text, stats, footer contact, and social links.
3. The hard-coded cards still in `index.html` are a **fallback** so the page
   never looks empty — they're replaced as soon as the JSON loads over http.

Images you upload in the CMS are saved to `media/` and referenced as
`media/<file>` (set by `media_folder` / `public_folder` in the config).

The **Membership** section is intentionally still hard-coded in `index.html`
(you didn't pick it for the CMS) — say the word and I'll add it as a collection.

## Going live (when you're ready to host it)

See **PUBLISH.md** for the full step-by-step. In short: host the repo on
**GitHub**, deploy it on **Netlify**, and use **DecapBridge** for the live
`/admin` login.

> Note: the old "Netlify Identity + Git Gateway" approach was **deprecated by
> Netlify in Feb 2025**, which is why we use DecapBridge (a free, drop-in
> replacement) for authentication. You keep `local_backend: true` in the config
> — it only activates on localhost, so it doesn't affect the live site.

The collections and content layout stay exactly the same online as they are
locally.

## Sources / docs

- Local backend: https://decapcms.org/docs/working-with-a-local-git-repository/
- Install: https://decapcms.org/docs/install-decap-cms/
- Configuration options: https://decapcms.org/docs/configuration-options/


