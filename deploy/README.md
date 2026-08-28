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

- `/opt/gironaplants/.env` — `STRAPI_TOKEN` (lo consume el build del frontend)
- `/opt/gironaplants/frontend/.env` — `STRAPI_BASE_URL`, `STRAPI_TOKEN`, `SECRET_TOKEN`, `EMAIL_*`
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
