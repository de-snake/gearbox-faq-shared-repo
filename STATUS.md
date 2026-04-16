# STATUS

## Current state

This repo is now a reusable React FAQ starter built around a markdown source file.

### Done
- converted the static handoff into a React + Vite app
- kept `docs/faq.md` as the content source of truth
- split UI into reusable FAQ components
- added search, deep links, and expand/collapse controls
- added parser + filtering tests
- kept the repo static-host friendly for Vercel

### Main commands

```bash
npm install
npm run dev
npm run test
npm run build
vercel --prod
```

### Reuse model

- editors update `docs/faq.md`
- developers adjust `src/site/gearbox-brand.ts`
- teams can reuse `src/components/` + `src/lib/` for other FAQ pages
