# Tried & Tooled: week-1 MVP

Tested AI stacks for vibe coders, creators and builders. Static Astro site with markdown content collections and Pagefind search.

## Run
Requires Node >= 22.22 (Astro 7). On the box: `export PATH=$HOME/.local/node22/bin:$PATH`.

    npm install
    npm run dev       # http://localhost:4321 (search index not available in dev)
    npm run build     # astro build + pagefind index -> dist/
    npm run preview   # serve dist/ locally

## Content
- `src/content/use-cases/*.md`: one file per job. The schema is in `src/content.config.ts` (top/budget pick, avoid, stack, pricing with sourceUrl + checked date, testStatus, lastTested, lastVerified, testNotes, affiliateUrl placeholder).
- `src/content/new/*.md`: "New this week" feed items (each needs a sourceUrl).
- Rules: never fabricate test results. Keep `testStatus: pending` and `lastTested: null` until a real test has been run and its artefacts saved.

## Open TODOs
- `TODO(forms)` in `src/pages/submit.astro`: Tally or a Cloudflare Worker that opens a GitHub issue.
- `TODO(contact)` in `src/pages/about.astro`: add a contact email.
- Affiliate links: fill `affiliateUrl` per pick once programs are approved.

## Deploy
GitHub Actions (`.github/workflows/deploy.yml`) builds on every push to `main` with Node 22 and deploys `dist/` to GitHub Pages.

Live site: https://archiemiller48.github.io/tried-and-tooled/

Pages must use **GitHub Actions** as the source (Settings → Pages → Build and deployment → Source). The workflow tries to enable that itself; the default Actions token often cannot create the Pages site, so the repo owner may need to switch the source once.
