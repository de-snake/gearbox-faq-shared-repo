# Gearbox FAQ — reusable React repo

Live URL: https://gearbox-faq-shared-repo.vercel.app

This repo is now a self-contained React FAQ starter, not just a dumped static HTML artifact.

Why it was not React before:
- the first handoff optimized for the fastest possible shareable artifact
- static HTML let the page go live immediately with zero app scaffolding
- that was fine for handoff speed, but weak for reuse

This version fixes that.

## What collaborators can do

### 1. Content editors
If someone only wants to update FAQ copy:

```bash
npm install
npm run dev
```

Then edit:

- `docs/faq.md`

The page updates through the React app.

### 2. Developers
If someone wants to rebrand or reuse the FAQ shell:

- edit brand config in `src/site/gearbox-brand.ts`
- reuse the parser and components from:
  - `src/lib/`
  - `src/components/`

The app is intentionally split into:
- markdown source parsing
- reusable FAQ page components
- site-specific Gearbox branding

### 3. Deployment owners
To ship changes:

```bash
npm run build
vercel --prod
```

## Repo structure

- `docs/faq.md` — source of truth for content
- `src/lib/faq-parser.ts` — parses the markdown FAQ structure
- `src/lib/filter-faq-document.ts` — search filtering
- `src/components/` — reusable FAQ UI components
- `src/site/gearbox-brand.ts` — site-specific links and branding
- `src/App.tsx` — example assembly for the Gearbox page
- `src/lib/faq-parser.test.ts` — parser + filtering tests
- `vercel.json` — deploy config

## Markdown format expected

The parser expects:

- one `#` page title
- optional intro paragraphs before the first section
- `##` section headings
- `###` question headings
- paragraphs and `-` bullet lists inside answers

That keeps content editing simple for non-developers.

## Commands

```bash
npm install
npm run dev
npm run test
npm run build
npm run preview
```

## Reuse pattern

If a teammate wants the same FAQ shell for another project:

1. copy this repo or fork it
2. replace `docs/faq.md`
3. update `src/site/gearbox-brand.ts`
4. keep the component and parser layers unchanged unless the UI model needs to change

## What makes this better than the first version

- React-based instead of one-off generated HTML
- markdown remains the source of truth
- searchable and linkable FAQ items
- reusable component structure for future FAQ pages
- typed parsing logic
- tests for the parser/filtering layer
- still deploys as a static Vercel site

## Current live deployment

- site: https://gearbox-faq-shared-repo.vercel.app
- repo: https://github.com/de-snake/gearbox-faq-shared-repo
