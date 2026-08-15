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
| `gp-strapi` | 127.0.0.1:1337 | **No expuesto a internet.** Admin via tunel SSH |

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

No es publico. Tunel:

```bash
ssh -L 1337:127.0.0.1:1337 root@46.202.135.74
# abrir http://localhost:1337/admin
```

Para exponerlo hace falta un registro A de `api.gironaplants.com` -> `46.202.135.74`
(el DNS esta en PIMEC, `dns01/dns02.pimec.net`, no en Hostinger) y anadir el host
al `Caddyfile`.

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
- `catalogues`, `homes`, `about_us_pages` y `offers` estan vacios en la BBDD.
