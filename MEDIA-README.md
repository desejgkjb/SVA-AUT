# SVA AUT Website — How to Replace Images & Videos

Everything visual lives in the **`media/`** folder. To rebrand the site you only
need to drop in your own files (keep the same filenames) — no code changes required.

## 1. Swap a background IMAGE
Replace any of these files with your own (recommended size **1920×1080**, `.jpg`):

| File | Section |
|------|---------|
| `media/hero.jpg` | Hero |
| `media/events.jpg` | Events |
| `media/shop.jpg` | Shop |
| `media/membership.jpg` | Membership |

Just keep the same name and the site picks it up automatically.
(Want a different filename? Update the `src="media/..."` on the `<img class="bg-image">`
line inside that section in `index.html`.)

## 2. Swap a background VIDEO
Add a `.mp4` next to the image (e.g. `media/hero.mp4`, `media/events.mp4`, etc.),
**1920×1080**, short loop, compressed (~5–15 MB) for fast loading.
A demo `media/hero.mp4` is already included so you can see it working.

## 3. Switch a section between IMAGE and VIDEO  ← one-line change
Open `index.html`, find the section's opening tag, and toggle the class:

```html
<!-- IMAGE background (default) -->
<section id="home" class="section hero bg-mode-image">

<!-- VIDEO background — just change the class to this: -->
<section id="home" class="section hero bg-mode-video">
```

That's it. `bg-mode-image` shows the `<img>`; `bg-mode-video` shows the `<video>`.
The dark overlay that keeps text readable stays on automatically in both modes.

## 4. Product images
Replace these (square, **900×900**, `.jpg`):
`product-hoodie.jpg`, `product-tshirt.jpg`, `product-tote.jpg`, `product-stickers.jpg`

## 5. Logo & favicon
`media/logo.svg` (top-left logo) and `media/favicon.svg` (browser tab icon).
Edit the colors/text directly in those SVG files, or replace them.

## 6. Run / host it
- **Preview locally:** double-click `index.html`, or run `python3 -m http.server` in this folder.
- **Publish free:** drag this whole folder into Netlify Drop (app.netlify.com/drop),
  or push to GitHub Pages. No build step needed.

## Color palette used
`#FE5100` orange · `#211D51` indigo · `#E5EEEB` mint · `#DFC7D7` lilac
(defined once as CSS variables at the top of `css/styles.css`).
