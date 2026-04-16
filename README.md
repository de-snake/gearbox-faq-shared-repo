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

Then open the local Vite URL and edit:
- `docs/faq.md` for content
- `src/site/gearbox-brand.ts` for links and branding

## Common commands

```bash
npm run dev
npm run test
npm run build
npm run preview
vercel --prod
```

## Who should touch what

### Content editors
If you only want to update copy, edit:
- `docs/faq.md`

You do not need to touch React components for normal FAQ updates.

### Developers
If you want to reuse the FAQ shell for another project:
- replace `docs/faq.md`
- update `src/site/gearbox-brand.ts`
- keep `src/components/` and `src/lib/` unless the UI model needs to change

### Deployment owners
To ship changes:

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

## Markdown shape expected

The parser expects:
- one `#` page title
- optional intro paragraphs before the first section
- `##` section headings
- `###` question headings
- paragraphs and `-` bullet lists inside answers

That keeps editing simple for non-developers.

## What this starter gives you

- markdown-driven FAQ content
- searchable questions and answers
- direct links to individual questions
- section navigation chips
- reusable parser + component split
- static-host friendly build output

## Reuse pattern

If a teammate wants the same setup for another project:
1. fork or copy this repo
2. replace `docs/faq.md`
3. update `src/site/gearbox-brand.ts`
4. keep the parser and component layers unless requirements actually change

## Notes

- This is a repo starter, not an npm package.
- `dist/` is build output only.
- `.vercel/` stays ignored so the repo remains push-friendly.
