# AI Lab: demo registry & infrastructure

`/ai/lab` is a data-driven registry of interactive demos that reproduce arguments from
the thesis. This folder holds the shared infrastructure every demo builds on.

## Pieces

- **`src/data/labDemos.ts`** — the registry. One typed entry per demo: `id`, `title`,
  `claim` (one sentence), `status` (`'live' | 'building' | 'planned'`), `thesisRef`,
  `repoUrl`, `tags`, and `path` (only present once the demo's route exists).
  `src/pages/ai/Lab.tsx` renders cards straight from this array — planned demos show
  greyed with a lock icon and no link, live/building demos link to `path`.
- **`DemoShell.tsx`** — the consistent frame every demo page renders inside: back-to-Lab
  link, eyebrow (demo id + status badge), title, claim, the interactive area
  (`children`), and a footer strip with a fieldnote, a GitHub link, and a collapsible
  "Methods & data" disclosure.
- **`statusStyles.ts`** / **`status.tsx`** — shared status → style/label mapping and the
  `StatusBadge` component built on it, used by both the Lab index cards and
  `DemoShell`, so they can't drift apart.
- **`useDemoData.ts`** — a hook that `fetch`es a static JSON file from `/public/data/*`
  and returns `{ status: 'loading' | 'error' | 'success', ... }`. All demo data is
  static JSON, fetched client-side — no APIs, no backends.
- **`DemoDataBoundary.tsx`** — renders the three states from `useDemoData`: a skeleton
  while loading (respecting `prefers-reduced-motion` via Tailwind's `motion-safe:`
  variant), a clear repo-linked error message on failure, or your real content via a
  render-prop `children(data)`. Never a blank panel.

## Adding a new demo

1. Add an entry to `labDemos.ts`. Start with `status: 'planned'` if you're just staking
   out the idea — it'll show up greyed on `/ai/lab` immediately.
2. When you start building: add the route in `App.tsx` as a `React.lazy` import (follow
   the existing `preference-collapse-explorer` / `feedback-clustering-playground`
   pattern — one `<Route>` per demo, each wrapped in its own `<Suspense>`), flip the
   registry entry to `status: 'building'`, and add the `path`.
3. Create the page under `src/pages/ai/lab/<DemoName>.tsx`. It should:
   - Render its own `SeoHead` (title/description/path).
   - Keep `AINav` above the fold, same as every other `/ai` page.
   - Wrap its content in `DemoShell`, passing `demoId`/`status`/`title`/`claim` straight
     from the registry entry, a `fieldnote` naming the specific thesis section(s) it
     reproduces, and `methodsAndData` explaining what's precomputed vs. computed live in
     the browser, and what was anonymized.
   - If it loads data: call `useDemoData<YourShape>('/data/your-file.json')` and render
     the interactive area through `<DemoDataBoundary state={...} repoUrl={...}>` so
     loading/error states come for free.
4. Ship the data file under `public/data/`. If it's derived from the thesis repo's raw
   format, write a small offline `scripts/prepare-*.ts` (run via `npx tsx`, dev-only)
   rather than hand-editing JSON — see `scripts/prepare-preference-data.ts` and
   `scripts/prepare-clustering-data.ts` for the pattern.
5. Flip `status` to `'live'` once the interactive build actually works end to end.

## Data policy: synthetic tier only

Public demo data (`public/data/*`) ships **only items from the thesis dataset's
synthetic tier** (the 448 generated entries) — never the 64 human-participant
instances. The human feedback came from 7 participants in a small academic network,
so verbatim display risks re-identification; human-study findings are *cited as
statistics* in the UI, but no human vignette, response, or feedback comment ever
ships. Concretely:

- Every item carries `"tier": "synthetic"` and `"scoring": "author"` (per-dimension
  scores are author-assigned during curation — illustrative, not study data).
- Preprocessing scripts enforce the policy fail-closed:
  `scripts/prepare-preference-data.ts` excludes any record whose provenance is not
  explicitly synthetic, and its `--anonymize-check` pass flags names/emails/URLs
  for manual review (synthetic text can echo seed content).
- Every demo's "Methods & data" disclosure states, in order: (a) what is displayed
  and why, (b) what is cited, (c) who scored what, (d) live vs. precomputed,
  (e) links to the thesis repo and the generation pipeline.

The same policy applies to future demos, including the Clustering Playground:
synthetic-tier points displayed, human-inclusive findings cited.

## Constraints that apply to every demo

- Fully client-side: static JSON only, no API keys, no network calls at runtime.
- Lazy-loaded: every demo route is `React.lazy` + `Suspense`, scoped to that route only.
- Respect `prefers-reduced-motion`.
- Numbers/claims about the thesis must match the real figures — see the project brief
  for the canonical list (64 instances / 7 participants, 46.9% Ambiguous, 512-entry
  master dataset, 72.5% reward-model accuracy, the five dimension percentages, k=3
  clusters). Don't invent others.
