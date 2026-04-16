# Gearbox FAQ — shared repo folder

Live URL: https://gearbox-faq-shared-repo.vercel.app

This folder is the preferred share artifact when someone wants to push the page into a shared Git repository.

It contains both:
- source files (`docs/faq.md`, `scripts/render_faq_preview.py`)
- deployable static output (`index.html`)

## Contents

- `docs/faq.md` — source of truth
- `scripts/render_faq_preview.py` — renderer
- `scripts/build.py` — rebuilds the HTML and refreshes `index.html`
- `faq-preview.html` — local preview artifact
- `index.html` — static entrypoint for Vercel or any static host
- `vercel.json` — minimal static config

`.vercel/` metadata stays ignored so the folder remains push-friendly in Git.

## Rebuild after editing

```bash
python3 scripts/build.py
```

## Redeploy to Vercel

```bash
vercel --prod
```

## Local preview

```bash
python3 -m http.server 8124
```

Then open:

`http://127.0.0.1:8124`

## Push into a shared repo

Copy the contents of this folder into the target repository root, then commit and push as normal.
