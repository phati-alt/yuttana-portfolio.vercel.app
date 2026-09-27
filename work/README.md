# Case studies

One folder per project. Everything that belongs to a case — its page, its
images, its EN/TH copy — lives inside that folder and nowhere else, so
adding or removing a project never means hunting through shared files.

```
work/
  government-project/     BESPOKE — edit index.html / data.js directly
    index.html
    data.js
    assets/
      cover.png           hero image, also used as the card on the homepage
  platform/               BESPOKE, plus its own case.css
  ev-charger/             BESPOKE
  custom-dashboard/       BESPOKE
  wordpress-website/      BESPOKE (the JST Group case; slug kept from before)
  more-projects/          hand-written list + modal, not a case study
    index.html
    data.js
    assets/
  _template/              the generated-page template — used by no case
                          right now, kept for adding a simple one later
```

URLs are the folder name: `work/platform/` → served as that folder's
`index.html`.

## Every case page is bespoke

All five cases are listed in `$customSlugs` in `tools/build-cases.ps1`, so
the build never writes their `index.html` or `data.js`. Edit both by hand.

They share one layout, the Insight Panel design language in
`css/insight-panels.css` (classes prefixed `ip-`). Only `platform` needed
rules of its own, in `work/platform/case.css`; the other four load
`insight-panels.css` alone. Keep one-off rules in a case's own `case.css`
rather than the shared stylesheets.

Each case's `data.js` keeps the same shape the build used to generate —
`window.CASE_DATA = { en: {...}, th: {...} }` — read by `js/i18n.js`
through `data-i18n-case="key"`.

### What the build still does

`content/cases.csv` still has rows for every case, and running the build
still regenerates **`js/cases-index.js`** from them: the category and title
on each homepage card, plus the temporary audit badge data (see below).
Retitle a case → edit its `category` / `title` rows in the CSV, then run:

```
powershell -ExecutionPolicy Bypass -File tools/build-cases.ps1
```

Everything else in the CSV for a bespoke case is not read by anything — the
live copy is in that case's `data.js`. Editing the CSV's story rows changes
nothing on the site.

### The "Next project" chain is hand-written

Each page's `cs-next__card` is written by hand and must follow the order of
the cards on the homepage (`#casesGrid` in `index.html`), wrapping from the
last back to the first:

```
government-project → platform → ev-charger → custom-dashboard → wordpress-website → (back to government-project)
```

Reorder the homepage cards → update the NEXT card (href, cover, title) on
each affected page by hand. The CSV's row order no longer decides this.

### Screenshots

Each page's gallery is grey `Screen N` placeholders until real images
exist, with captions already written in `data.js`. To add them:

1. Save them as `work/<slug>/assets/screen-1.png`, `screen-2.png` …
2. In that page's `index.html`, replace each placeholder `media-block`
   with `<img src="assets/screen-N.png" alt="">` — the comment above each
   gallery says where.
3. Run the build, so the screen count on the homepage audit badge matches
   the files now in `assets/` (it counts `screen-*.png|jpg|jpeg|webp`).

## Where copy lives

| Where | What | Referenced by |
|---|---|---|
| `js/i18n.js` | Site-wide copy — nav, footer, and the section labels every case page shares ("Screens", "Next project") | `data-i18n="key"` |
| `work/<slug>/data.js` | This project's own copy — title, story, stats, captions | `data-i18n-case="key"` |
| `content/cases.csv` | Only the homepage card's category + title (via the build) | `data-case-field` on the homepage cards |

Never put case-specific copy in `js/i18n.js`. That file is loaded by every
page on the site, so a key that only one case uses is dead weight
everywhere else.

`data.js` is loaded *before* `js/i18n.js` in each case page, because
i18n.js renders once on load and reads `window.CASE_DATA` at that moment.
Keep that order if you edit the script tags.

An element whose key is missing from `data.js` keeps whatever is hardcoded
in `index.html`, so a half-filled `data.js` degrades to the HTML fallback
instead of rendering blank.

## Add a case

The simplest path is to copy an existing bespoke case:

1. Copy a case folder (e.g. `work/wordpress-website/`) to `work/<slug>/` —
   the slug becomes the URL, so keep it lowercase-with-hyphens.
2. Rewrite its `index.html` (`<title>`, meta description, sections) and
   `data.js`, and put its `cover.png` in `assets/`.
3. Add `<slug>` to `$customSlugs` in `tools/build-cases.ps1`, and add its
   `category`, `title` and `dataStatus` rows to `content/cases.csv`.
4. Add the card to `#casesGrid` in `index.html` — copy an existing
   `<a class="case">`, point `href` at `work/<slug>/` and `src` at its
   `cover.png`.
5. Fix the NEXT cards: the case before it now points here, and this one
   points at whatever comes after it on the homepage.
6. Run the build.

A case that fits the older, simpler generated layout can instead be left
out of `$customSlugs` — the build then writes its `index.html` and
`data.js` from `work/_template/` and every row it has in the CSV (the
optional-sections list in `tools/build-cases.ps1` shows which row turns
each section on). No case uses that path today.

## Remove a case

1. Delete the folder.
2. Delete its rows from `content/cases.csv` and its slug from
   `$customSlugs`.
3. Delete its `<a class="case">` from `#casesGrid` in `index.html`.
4. Repoint the NEXT card of the case before it, so nothing links to the
   deleted folder.
5. Run the build.

## Temporary: audit badges

While content is still being replaced with the real thing, the homepage
cards and `work/more-projects/` show small badges for "real vs mockup" and
the screenshot count. They are driven by `$showDataStatus` in
`tools/build-cases.ps1` (plus `audit:` fields in
`work/more-projects/data.js`). Once every More Projects entry is real, set
`$showDataStatus = $false`, run the build, and the badges disappear
everywhere.

## Notes

- The homepage cards are plain HTML on purpose, not generated: they stay
  in the markup for search engines and for anyone with JS off, and the
  Cases section's horizontal-scroll animation measures the real cards on
  load (see `initCasesScroll` in `js/main.js`).
- `work/more-projects/` is hand-written and not touched by the build. Its
  entries live in its own `data.js`.
- None of `content/`, `tools/`, `work/_template/` or this README is
  deployed — see `.vercelignore`.
