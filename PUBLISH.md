# Publishing SVA AUT (live site + online CMS)

This gets the website live on the internet **and** keeps the `/admin` CMS
working online so you (and invited collaborators) can edit from anywhere.

It uses three free services. Each needs **your** login — I can't create accounts
or sign in for you, so those steps are marked **(you)**. Everything in the repo
is already prepared.

```
GitHub      stores the site code + content   (free)
Netlify     hosts it, re-deploys on every change   (free)
DecapBridge powers the /admin login   (free: 3 sites, 10 collaborators)
```

Why DecapBridge? Netlify deprecated its Identity/Git Gateway login in Feb 2025,
so it's no longer the way to log into Decap. DecapBridge is the free, purpose-
built replacement — your editors sign in with Google, Microsoft, or a password,
**without needing a GitHub account**.

---

## Phase 1 — Put the project on GitHub  (you)

1. Create a free account at https://github.com (if you don't have one).
2. Create a new **empty** repository, e.g. `sva-new-website` (no README/.gitignore
   — the project already has them). Keep it **private** if you prefer; all three
   services work with private repos.
3. In Terminal, from the project folder, push it up:

   ```bash
   cd "/Users/HaoyuPersonal/Claude/Projects/SVA New Website"
   git init                     # safe to re-run
   git add .
   git commit -m "SVA AUT site + Decap CMS"
   git branch -M main
   git remote add origin https://github.com/<your-username>/sva-new-website.git
   git push -u origin main
   ```

   GitHub will ask you to authenticate (browser or a Personal Access Token).

> Tip: prefer no command line? Install **GitHub Desktop**
> (https://desktop.github.com), choose *Add Local Repository* → this folder →
> *Publish repository*.

---

## Phase 2 — Deploy on Netlify  (you)

1. Create a free account at https://netlify.com (you can sign up *with GitHub*,
   which makes the next step one click).
2. **Add new site → Import an existing project → GitHub →** pick your
   `sva-new-website` repo.
3. Build settings: leave **Build command empty** and **Publish directory** as `.`
   (the included `netlify.toml` already sets this). Click **Deploy**.
4. After ~30 seconds you'll get a live URL like
   `https://random-name-123.netlify.app`. You can rename it under
   **Site configuration → Change site name**, or add a custom domain later.

Your website is now **live**. Because Netlify is linked to GitHub, every future
change (including edits saved in the CMS) auto-redeploys.

---

## Phase 3 — Turn on the online CMS login (DecapBridge)  (you)

1. Sign up free at https://decapbridge.com/auth/signup.
2. **Add a site** and fill in:
   - **Git provider:** GitHub
   - **Git repository:** `<your-username>/sva-new-website`
   - **Git access token:** create one at https://github.com/settings/tokens — a
     **fine-grained token** scoped to *only this repo* with **Read & write** on
     *Contents* (and *Pull requests* if you ever enable editorial workflow).
     Paste it in.
   - **Decap CMS login URL:** `https://<your-site>.netlify.app/admin/index.html`
   - **Auth type:** choose **PKCE** to allow Google/Microsoft login (or
     **Classic** for password-only).
3. Click **Create site**. DecapBridge shows a generated **`config.yml`** block.
4. Open `admin/config.yml` in this project and **replace the `backend:` block**
   (the local-dev one) with the block DecapBridge generated. Leave
   `local_backend: true` at the top — it only affects localhost.
5. Save, then push the change:

   ```bash
   git add admin/config.yml
   git commit -m "Use DecapBridge auth"
   git push
   ```

   Netlify redeploys automatically.

6. Go to `https://<your-site>.netlify.app/admin/` and log in. 🎉
7. In the DecapBridge dashboard, **Manage collaborators → invite by email** to
   give other SVA people editing access.

---

## After it's live

- **Editing content:** go to `https://<your-site>.netlify.app/admin/`, make
  changes, hit Publish. DecapBridge commits to GitHub → Netlify redeploys →
  the change appears on the site in under a minute.
- **Local editing still works** exactly as before (`npx decap-server` + a local
  server) — see DECAP-SETUP.md.
- **Images** uploaded in the CMS are committed to `media/` and served from there.

## What I can do once it's deployed

Tell me the live URL and I can help with: a custom domain, adding the Membership
section to the CMS, SEO/meta tags, or a favicon/social preview image. If you
connect the Netlify connector, I can also check deploy status and logs for you.

