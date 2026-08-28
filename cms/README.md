# Strapi content types and seeding

Production Strapi runs at `https://api.gironaplants.com` (container `gp-strapi`
on the Hostinger VPS `46.202.135.74`, under `/opt/gironaplants`). It serves the
`home`, `about-us` and `catalogue` single types plus the `plant` and `offer`
collections, in four locales: es, ca, en, fr.

**CMS values win over the frontend fallbacks** in `data/homeContent.ts`,
`data/aboutUsContent.ts` and `data/cataloguesContent.ts`, so editing those
files alone does not change the live site — re-run the seed, or edit in the
admin panel. The fallbacks still cover fields the CMS leaves empty, and the
whole page if Strapi is unreachable.

## Where the copy lives

There is one source of truth. The per-locale copy is authored in `data/*.ts`
and compiled to `cms/scripts/site-content.json`, which the seed script reads:

```bash
npm run seed:build     # data/*Content.ts -> cms/scripts/site-content.json
```

Commit the generated JSON — the Strapi container has no TypeScript toolchain.
(Before this, the seed script carried a second hand-maintained copy of every
string and the two drifted.)

## Deploying a schema change and seeding

`cms/deploy-schema-to-vps.sh` uploads the schemas from this working tree,
rebuilds the Strapi image, waits for it to come up and runs the seed:

```bash
bash cms/deploy-schema-to-vps.sh              # fill empty fields only
SEED_FORCE=1 bash cms/deploy-schema-to-vps.sh # overwrite existing CMS copy
```

It backs up `data/data.db` first. It does **not** go through GitHub, so it
works before the change is pushed — but push afterwards: the server also keeps
a git checkout in `frontend/`, and `cms/seed-content-to-vps.sh` copies
`frontend/` over `strapi/`, which would revert an unpushed schema.

`cms/seed-content-to-vps.sh` is the git-based variant: it syncs the server's
checkout from `origin/main` and re-runs only the seed.

The seed only writes attributes that exist in the deployed schema
(string/text/richtext/json) and reports anything it skipped. It never touches
media, relations or components, and by default never overwrites content typed
in the admin panel.

> Publishing publishes the whole draft. Make sure no half-finished draft edits
> exist on these single types before running.

## Schema state (2026-08-28)

`cms/app/` is the source of truth for the Strapi project; the deploy script
copies the schema files to `/opt/gironaplants/strapi/`.

**Added** — `home`: `hero_tag`, `search_placeholder`, `search_button`,
`search_suggestions` (json), `stats` (json), `plants_headline`, `how_title`,
`how_steps` (json), `catalogues_headline`. `about-us`: `label`,
`hero_secondary_button`, `stats` (json), `catalogues_headline`. `catalogue`:
`main_cover` (image).

**Removed** — `home`: `hero_button`, `trust_items` (replaced by `stats`, which
carries a value/label pair instead of a bare string). `catalogue`: the fifteen
legacy `catalogue1_*` / `catalogue2_*` / `catalogue3_*` attributes, now that
every locale uses the `catalogues` repeatable component. `offer`:
`valid_until`, which nothing ever read.

Removing an attribute stops Strapi serving it; the SQLite column stays until
you drop it, so the data is still in the backups under `/opt/gironaplants/backups`.

## Still to do by hand

The `catalogue` single type exists and is published in all four locales (it
never existed before, which is why `/catalogues` was a hard 404 in production
while the navbar linked to it). Two things need the admin panel, because they
are files rather than copy:

1. **Upload the catalogue PDFs.** `main_catalogue` (the general catalogue) and
   the `catalogues` repeatable component (one entry per specific catalogue:
   title, subtitle, button, `file`, `image`). Until then `/catalogues` shows
   the hero and links to the live product catalogue instead of a download, and
   the home and About Us pages show the catalogues section heading with no
   cards.
2. **Optionally upload `main_cover`** and `hero_images`; the frontend falls
   back to the photographs in `public/images/`.
