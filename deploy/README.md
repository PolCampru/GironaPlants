# Deploy — GironaPlants VPS

Infraestructura del servidor `46.202.135.74` (Hostinger, Ubuntu 24.04 + Docker).
Reinstalado desde cero el 2026-08-14 tras un compromiso del servidor anterior.

## Layout en el servidor

```
/opt/gironaplants/
├── docker-compose.yml     <- deploy/docker-compose.yml
├── Caddyfile              <- deploy/Caddyfile
├── .env                   <- SOLO en el servidor (STRAPI_TOKEN). chmod 600
├── frontend/              <- clon de este repo (origin/main)
│   ├── Dockerfile         <- /Dockerfile (raiz del repo)
│   ├── .dockerignore      <- /.dockerignore
│   └── .env               <- SOLO en el servidor
├── umami-src/             <- clon de umami-software/umami v2.19.0 (solo VPS)
├── strapi/                <- app Strapi (fuente en cms/app/ de este repo)
│   ├── Dockerfile         <- deploy/strapi.Dockerfile
│   └── .env               <- SOLO en el servidor
├── data/data.db           <- SQLite (uid 1000, montado en el contenedor)
├── uploads/               <- media de Strapi (uid 1000)
└── backups/               <- copias diarias, 03:15, retencion 14 dias
```

Los ficheros de `deploy/` van copiados a `/opt/gironaplants/`; las rutas
relativas del compose (`./frontend`, `./strapi`, `./data`) dependen de ello.

## Servicios

| Contenedor | Puerto | Notas |
|---|---|---|
| `gp-caddy` | 80, 443 | HTTPS automatico (Let's Encrypt) para gironaplants.com y www |
| `gp-frontend` | 3000 (interno) | Next.js, solo accesible via Caddy |
| `gp-strapi` | 1337 (via Caddy) | Publico en `srv656147.hstgr.cloud`. `/api` y `/uploads` abiertos; `/admin` restringido por IP |
| `gp-umami` | 3000 (interno) | Analitica, servida en `gironaplants.com/stats` |
| `gp-umami-db` | 5432 (interno) | Postgres de Umami, volumen `umami_db` |

Los tres corren como usuario `node` sin privilegios y con `restart: unless-stopped`.

## Desplegar

```bash
bash cms/deploy-to-vps.sh          # despliegue completo (repo + CMS + rebuild)
```

O manualmente:

```bash
ssh root@46.202.135.74
cd /opt/gironaplants/frontend && git fetch && git checkout -f -B main origin/main
cd /opt/gironaplants && docker compose build frontend && docker compose up -d frontend
```

## Analitica (Umami)

En produccion desde el 2026-08-29, en **https://gironaplants.com/stats**.
Cookieless y sin datos personales: no necesita el consentimiento del banner
(la politica de cookies ya lo explica en los cuatro idiomas).

Va bajo `/stats` del dominio principal, no en un subdominio, por dos razones:
no depende de un registro DNS nuevo en PIMEC — que es justo lo que lleva meses
bloqueando a `api.gironaplants.com` — y un script en primera parte no cae en
las listas de bloqueo, que filtran por hostname de analitica.

### Se construye desde fuente, y no es opcional

`BASE_PATH` es un **ARG de build**: Next.js compila `basePath` dentro del
bundle. Ninguna imagen publicada de Umami puede servirse bajo un prefijo — se
probo con `postgresql-latest` (ya es v3) y con `postgresql-v2.19.0`, y las dos
devuelven 404 en todo `/stats`, incluido su propio `script.js`. De ahi que el
compose use `build:` contra un clon del repo de Umami que vive solo en el VPS,
igual que `./frontend` y `./strapi`.

El clon lleva un parche de una linea. El Dockerfile de v2.19.0 hace
`npm install -g pnpm`, que hoy instala pnpm 10, y pnpm 10 aborta con
`ERR_PNPM_IGNORED_BUILDS` en el `pnpm add` del stage runner. Se fija a la 9.

Reconstruir el clon desde cero (solo si se pierde o se sube de version):

```bash
ssh root@46.202.135.74
rm -rf /opt/gironaplants/umami-src
git clone --depth 1 --branch v2.19.0 https://github.com/umami-software/umami.git /opt/gironaplants/umami-src
sed -i 's/^RUN npm install -g pnpm$/RUN npm install -g pnpm@9/' /opt/gironaplants/umami-src/Dockerfile
cd /opt/gironaplants && docker compose build umami && docker compose up -d umami
```

La build tarda unos 6 min en las 2 CPU del VPS.

### Estado actual

- Panel: https://gironaplants.com/stats — usuario `admin`. La contrasena por
  defecto (`umami`) **esta cambiada**; la actual esta en el gestor de
  contrasenas. Verificado: el login con la de por defecto responde 401.
- Website ID: `260cce63-f401-4ba1-9dcf-7d6a207f6052`, en `UMAMI_WEBSITE_ID`
  de `/opt/gironaplants/.env`.
- El panel es publico: la contrasena es lo unico que lo protege. Si algun dia
  molesta, se le puede aplicar el mismo `remote_ip` que al `/admin` de Strapi,
  dejando fuera `/stats/script.js` y `/stats/api/send`, que tienen que seguir
  abiertos.

`UMAMI_WEBSITE_ID` es `NEXT_PUBLIC_*`: se incrusta en el build del frontend,
no se lee en runtime. Cambiarlo obliga a `docker compose build frontend`. Si
esta vacio, el frontend no renderiza ningun script y la web funciona igual,
solo que no mide.

### Eventos que envia la web

`lib/analytics.ts` define la lista cerrada; nunca se envia nada que haya
escrito el visitante.

| Evento | Donde | Datos |
|---|---|---|
| `quote_started` | primera linea anadida al presupuesto | `source`, `locale` |
| `quote_item_added` | cada linea anadida | `source` (catalogue/offer/custom), `genus`, `locale` |
| `quote_submitted` | envio desde `/budget` (solo si el POST fue bien) | `species`, `units` |
| `contact_submitted` | envio desde `/contact` | `species`, `units` |
| `catalogue_download` | descarga de PDF | `catalogue`, `locale` |
| `language_switch` | selector de idioma | `from`, `to` |

Si el script se bloquea o no carga, `track()` es un no-op: la analitica no
puede romper un presupuesto.

### Copias de seguridad

`/usr/local/bin/gp-backup.sh` (cron diario, 03:15) incluye desde hoy un
`pg_dump` de Umami en `backups/umami-*.sql.gz`, con la misma retencion de 14
dias que el resto. Va con `|| true` a proposito: un fallo de la analitica no
puede abortar el backup del CMS.

## Panel de Strapi

Expuesto a internet desde 2026-08-27 (antes solo por tunel SSH).

- **https://srv656147.hstgr.cloud/admin** — activo, cert Let's Encrypt.
- **https://api.gironaplants.com/admin** — configurado en el `Caddyfile` pero
  aun sin certificado: falta el registro A `api.gironaplants.com` -> `46.202.135.74`
  en el panel de PIMEC (`dns01/dns02.pimec.net`; la zona NO esta en Hostinger, la
  API de Hostinger no puede crearla). Caddy reintenta cada 60s y emitira el cert
  solo, sin redeploy, cuando el registro propague.

Superficie publica (default-deny en el `Caddyfile`): solo `/api/*` y `/uploads/*`.
Todo lo demas — `/admin`, la API de admin, rutas de plugins y cualquier ruta
futura — responde 403 salvo desde las IPs de la allowlist.

IP permitida actualmente: `83.45.86.215`. **Es una IP residencial dinamica**: si
cambia de ISP o se trabaja desde otra red, el panel devuelve 403. Se arregla
editando `remote_ip` en el snippet `(strapi_site)` del `Caddyfile` y recargando:

```bash
scp deploy/Caddyfile root@46.202.135.74:/opt/gironaplants/Caddyfile
ssh root@46.202.135.74 'docker exec gp-caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile'
```

El tunel SSH sigue funcionando como via de acceso de emergencia:

```bash
ssh -L 1337:127.0.0.1:1337 root@46.202.135.74   # -> http://localhost:1337/admin
```

Nota: `config/server.ts` lleva `proxy: true` porque Caddy termina el TLS; sin eso
Koa ignora `X-Forwarded-Proto` y el login del admin sobre HTTPS falla. Cambiar ese
fichero exige `docker compose build strapi` (la fuente va dentro de la imagen).

## Variables de entorno (NO versionadas)

- `/opt/gironaplants/.env` — `STRAPI_TOKEN` (lo consume el build del frontend),
  `UMAMI_DB_PASSWORD`, `UMAMI_APP_SECRET`, `UMAMI_WEBSITE_ID`
- `/opt/gironaplants/frontend/.env` — `STRAPI_BASE_URL`, `STRAPI_TOKEN`, `STRAPI_WRITE_TOKEN`, `SECRET_TOKEN`, `EMAIL_*`
- `/opt/gironaplants/strapi/.env` — `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`,
  `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY`, `JWT_SECRET`, `DATABASE_FILENAME`

Nota: `config/database.ts` hace `path.join(appRoot, DATABASE_FILENAME)`, asi que
una ruta absoluta se concatena en vez de respetarse. Por eso `data/` se monta en
`/srv/app/data` dentro del contenedor y `DATABASE_FILENAME=/data/data.db` resuelve
correctamente.

## Pendiente

- `EMAIL_PASS` sigue siendo la credencial SMTP anterior al compromiso: rotar en PIMEC.
- `offers` esta vacio en la BBDD (la pagina /offers muestra su estado vacio).
  `homes`, `about_us_pages` y `catalogues` estan poblados y publicados en los
  cuatro idiomas desde 2026-08-28 — ver `cms/README.md`.
- Faltan por subir los PDF de catalogo (`main_catalogue` y el componente
  repetible `catalogues`) desde el panel de Strapi.
