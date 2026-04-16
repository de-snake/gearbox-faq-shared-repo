# Gearbox FAQ — reusable React starter

Live URL: https://gearbox-faq-shared-repo.vercel.app
Repo: https://github.com/de-snake/gearbox-faq-shared-repo
Runtime: Node.js 20+

This repo is a small React + Vite starter for FAQ pages with:
- markdown as the content source of truth
- reusable FAQ UI components
- search and per-question deep links
- static Vercel deployment

## Quick start

```bash
npm install
npm run dev
```

Then open the local Vite URL.

For normal FAQ updates:
- edit `docs/faq.md`

Only touch `src/site/gearbox-brand.ts` if you want to:
- change branding
- change outbound links
- reuse this starter for another project

## Common commands

```bash
npm run dev
npm run test
npm run build
npm run preview
vercel --prod
```

## Deploy prerequisites

Before using `vercel --prod`, make sure the collaborator has:
- Vercel CLI installed
- access to the target Vercel project
- an authenticated CLI session (`vercel whoami` should work)
- the repo linked to the correct Vercel project

Typical first-time setup:

```bash
npm install
vercel whoami
vercel link
npm run build
vercel --prod
```

## Who should touch what

### Content editors
Edit only:
- `docs/faq.md`

You do not need to touch React components for normal FAQ copy updates.

### Developers
For reuse or rebranding:
- replace `docs/faq.md`
- update `src/site/gearbox-brand.ts`
- keep `src/components/` and `src/lib/` unless the UI model actually needs to change

### Deployment owners
Ship changes with:

```bash
npm run test
npm run build
vercel --prod
```

## Project structure

- `docs/faq.md` — content source of truth
- `src/App.tsx` — current page assembly
- `src/site/gearbox-brand.ts` — site-specific branding and outbound links
- `src/components/` — reusable FAQ UI pieces
- `src/lib/faq-parser.ts` — markdown parser
- `src/lib/filter-faq-document.ts` — search filtering
- `src/lib/faq-parser.test.ts` — parser and filtering tests
- `src/styles.css` — page styling
- `vercel.json` — deploy config

## Supported markdown shape

The parser supports this narrow FAQ-oriented subset:
- one `#` page title
- optional intro paragraphs before the first section
- `##` section headings
- `###` question headings
- paragraphs
- `-` bullet lists
- inline links
- bold text
- inline code

It is not full Markdown. Do not assume support for tables, images, nested lists, blockquotes, or other advanced syntax unless the parser is extended.

## Reuse checklist

If a teammate wants the same setup for another project:
1. fork or copy this repo
2. replace `docs/faq.md`
3. update `src/site/gearbox-brand.ts`
4. keep the parser and component layers unless requirements actually change

## Notes

- This is a repo starter, not an npm package.
- `dist/` is build output only.
- `.vercel/` stays ignored so the repo remains push-friendly.
