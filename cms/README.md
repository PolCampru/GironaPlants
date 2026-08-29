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

## Quote request (2026-08-29)

Coleccion nueva, `quote-request`: cada envio del formulario de la web queda
guardado ahi. Antes solo existia como email, que no es un registro — no se
puede buscar, ni agregar, ni sobrevive al buzon. El email sigue enviandose
igual; esto es el archivo.

La escribe `app/api/contact/route.ts` via `lib/quoteRequests.ts`, **antes** de
mandar el correo: si el SMTP falla (las credenciales de PIMEC siguen sin rotar)
la solicitud no se pierde. La escritura nunca lanza y corta a los 5s, asi que
tampoco puede tumbar un envio.

Campos: `kind` (quote/contact), `name`, `company`, `email`, `phone`,
`customer_type`, `comment`, `page_locale`, `species_count`, `unit_count`,
`items` (json con genero/descripcion/medida/cantidad de cada linea) y
`submitted_at`. Sin draft & publish: las entradas salen directas en la lista.

### Estado: desplegado el 2026-08-29

El esquema esta en produccion (`bash cms/deploy-schema-to-vps.sh`) y el token
de escritura creado y en `/opt/gironaplants/frontend/.env` como
`STRAPI_WRITE_TOKEN`.

El token se creo con la consola de Strapi y no por el panel, porque el panel
solo es accesible desde la IP de la allowlist:

```bash
echo 'strapi.service("admin::api-token").create({name:"Frontend quote-request writer",type:"custom",lifespan:null,permissions:["api::quote-request.quote-request.create"]}).then(t=>{console.log(t.accessKey);process.exit(0)})' > /tmp/t.js
docker cp /tmp/t.js gp-strapi:/tmp/t.js
docker exec -i -e PORT=1338 gp-strapi sh -c "cd /srv/app && node_modules/.bin/strapi console < /tmp/t.js"
```

`PORT=1338` es imprescindible: la consola arranca la app entera y choca con el
1337 del contenedor en marcha.

Comprobado tras crearlo:

| Peticion | Respuesta | Que demuestra |
|---|---|---|
| `POST /api/quote-requests` con el token, sin datos | 400 ValidationError | el token autentica y tiene `create` |
| `POST` con datos validos | 201 | la escritura real funciona |
| `GET` con el token | 403 | es solo de escritura |
| `GET` sin token | 403 | el rol Public no expone los datos |

Esa ultima fila importa: son datos personales de clientes y no pueden quedar
en la API abierta. El `STRAPI_TOKEN` de siempre sigue siendo de solo lectura a
proposito — lo usa el proxy publico `/api/strapi/[resource]` — y no debe
ampliarse.

Sin `STRAPI_WRITE_TOKEN` la escritura responde 403, queda en los logs del
frontend y el email sale igual: el fallo es silencioso para el visitante, a
proposito.

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
