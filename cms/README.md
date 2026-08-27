# Seeding localized site content (home + about-us)

Production Strapi has no published entries for the `home` and `about-us`
single types (the API returns 404 for every locale), so the site currently
lives off the frontend fallbacks in `data/homeContent.ts` and
`data/aboutUsContent.ts`. `cms/scripts/seed-site-content.js` fills the CMS
with that same copy for all four locales (es, ca, en, fr) and publishes it,
so editors can then manage everything from the admin panel.

From the repo root (after pushing to `main`, since the runner syncs the
server checkout from GitHub):

```bash
bash cms/seed-content-to-vps.sh              # fill empty fields only
SEED_FORCE=1 bash cms/seed-content-to-vps.sh # overwrite existing CMS copy
```

The seed script only writes attributes that exist in the deployed schema
(string/text/richtext/json) and reports anything it skipped. It never touches
media, relations or components, and by default it never overwrites content
that editors typed in the admin panel.

`hero_badge`, `hero_secondary_button` and `trust_items` (JSON) were added to
the `home` single type on 2026-08-27, so the whole hero is now editable from
the admin panel. If the schema needs another field, add it to
`cms/app/src/api/<type>/content-types/<type>/schema.json` in this repo, push,
then on the VPS:

```bash
ssh root@46.202.135.74
cd /opt/gironaplants
cp data/data.db backups/data.db.bak-$(date +%Y%m%d-%H%M%S)
cd frontend && git fetch --depth 1 origin main && git checkout -f -B main origin/main && cd ..
cp frontend/cms/app/src/api/home/content-types/home/schema.json \
   strapi/src/api/home/content-types/home/schema.json
docker compose build strapi && docker compose up -d strapi   # tables are created on boot
```

then re-run the seed from your machine. `cms/app/` is the source of truth for
the Strapi project, but nothing syncs it to `/opt/gironaplants/strapi/`
automatically — that copy step is manual.

# CMS migration: catalogues as an array

The `catalogue` single type currently hardcodes exactly three catalogues as
flat fields (`catalogue1_title`, `catalogue1`, `catalogue1_img`, …2, …3).
This folder contains everything needed to replace that with a **repeatable
component** — a true array with no upper limit — on the Strapi side.

The frontend in this repo is already migrated and **works with both shapes**
(`lib/catalogues.ts` normalizes either), so frontend and CMS can be deployed
in any order. Until the CMS is migrated the site keeps working exactly as
before.

## What changes in Strapi

1. **New component** `catalogue.catalogue-item` with fields:
   `title`, `subtitle`, `button`, `file` (PDF/media), `image` (cover).
2. **New attribute on the `catalogue` single type**: `catalogues`, a
   *repeatable* `catalogue.catalogue-item`, localized.
3. **Data migration** copying `catalogue1..3` values into the array for every
   locale (idempotent, safe to re-run — including after the legacy fields
   have been removed).
4. Later (optional cleanup): remove the legacy `catalogueN_*` attributes.

## Server layout (Hostinger VPS 46.202.135.74)

Everything runs under Docker Compose in `/opt/gironaplants`:

- `strapi/` — Strapi source (image `gironaplants-strapi`, container `gp-strapi`,
  bound to `127.0.0.1:1337`)
- `frontend/` — Next.js app (container `gp-frontend`)
- `data/` — SQLite database (bind-mounted into the container)
- `uploads/` — Strapi media (bind-mounted)
- `backups/` — existing backup directory
- `docker-compose.yml`, `Caddyfile`

## Step-by-step (on the VPS)

### 1. Back up

```bash
cp /opt/gironaplants/data/data.db /opt/gironaplants/backups/data.db.bak-$(date +%Y%m%d-%H%M)
```

### 2. Add the component

Copy `cms/src/components/catalogue/catalogue-item.json` from this repo to
`/opt/gironaplants/strapi/src/components/catalogue/catalogue-item.json`.

### 3. Add the `catalogues` attribute to the single type

Edit `/opt/gironaplants/strapi/src/api/catalogue/content-types/catalogue/schema.json`
and add inside `"attributes"` (keep the existing legacy fields for now — they
are removed in step 7):

```json
"catalogues": {
  "type": "component",
  "repeatable": true,
  "component": "catalogue.catalogue-item",
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  }
}
```

> If the existing attributes carry `pluginOptions.i18n.localized: true`, keep
> the same convention here (shown above). If the content type is not
> localized, drop the `pluginOptions` block.

### 4. Rebuild the image and restart

```bash
cd /opt/gironaplants
docker compose build strapi
docker compose up -d strapi
docker logs -f gp-strapi   # wait until it's up; schema tables are created on boot
```

### 5. Run the data migration

Copy `cms/scripts/migrate-catalogues.js` to
`/opt/gironaplants/strapi/scripts/migrate-catalogues.js`, then run it inside
the container (it needs the Strapi runtime and the DB):

```bash
docker compose exec strapi node scripts/migrate-catalogues.js
```

> If the script isn't in the image, either rebuild after copying it into
> `strapi/`, or mount/copy it in:
> `docker cp strapi/scripts/migrate-catalogues.js gp-strapi:/srv/app/scripts/`

Notes:
- **Publishing publishes the whole draft.** Make sure no half-finished draft
  edits exist on the Catalogue single type before running.
- Locales in `CATALOGUE_MIGRATION_EMPTY_LOCALES` (default `en,fr`) are
  skipped entirely — their `catalogues` array stays empty, which hides the
  section on the site (matching the old hardcoded behavior). Override with
  `CATALOGUE_MIGRATION_EMPTY_LOCALES="" docker compose exec ...` to migrate
  them too.

### 6. Verify

```bash
curl "http://127.0.0.1:1337/api/catalogue?locale=es&populate[catalogues][populate]=*" \
  -H "Authorization: Bearer $STRAPI_TOKEN"
```

`data.catalogues` should be an array with the migrated items, each with
populated `file` and `image`. The website needs no redeploy — it picks the
new shape automatically (allow up to 1 h of cache, or restart `gp-frontend`
to see it immediately).

Editors can now add/remove/reorder any number of catalogues per locale in
the admin panel (Content Manager → Catalogue → `catalogues`).

### 7. Cleanup (later, once verified in production)

Remove the legacy attributes from
`strapi/src/api/catalogue/content-types/catalogue/schema.json`:
`catalogue1_title`, `catalogue1_subtitle`, `catalogue1_button`, `catalogue1`,
`catalogue1_img` (and the same for 2 and 3), then rebuild + restart (step 4).
The frontend does not reference them once `catalogues` is served.

## Notes

- The Content-Type Builder is disabled in production on purpose; that is why
  the change is made by editing schema files + rebuild, exactly what the
  builder would generate.
- If you develop Strapi locally and deploy via git, apply steps 2–3 locally
  through the Content-Type Builder UI instead (create component
  `catalogue-item` in category `catalogue`, add repeatable `catalogues` field
  to the Catalogue single type) — it produces the same JSON — then commit,
  deploy, and run step 5 on the server.
