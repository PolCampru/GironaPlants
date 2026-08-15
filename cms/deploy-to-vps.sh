#!/usr/bin/env bash
# Full deploy of the catalogues-array migration to the GironaPlants VPS:
# syncs the repo on the server, applies the Strapi schema + data migration,
# and rebuilds both containers.
#
# Run from anywhere:  bash cms/deploy-to-vps.sh
# Idempotent; safe to re-run.
set -euo pipefail

HOST="root@46.202.135.74"
BASE="/opt/gironaplants"
FRONTEND="$BASE/frontend"
STRAPI="$BASE/strapi"
SCHEMA="$STRAPI/src/api/catalogue/content-types/catalogue/schema.json"
REPO="https://github.com/PolCampru/GironaPlants.git"

echo "==> 1/8 Backing up database"
ssh "$HOST" "cp $BASE/data/data.db $BASE/backups/data.db.bak-\$(date +%Y%m%d-%H%M%S)"

echo "==> 2/8 Syncing repo on the server (git checkout of origin/main)"
# frontend/ was a plain copy, not a clone; turn it into one. checkout -f only
# touches tracked files, so server-only files (.env, Dockerfile) survive.
ssh "$HOST" "cd $FRONTEND \
  && { git rev-parse --git-dir >/dev/null 2>&1 || git init -q -b main; } \
  && { git remote add origin $REPO 2>/dev/null || git remote set-url origin $REPO; } \
  && git fetch -q --depth 1 origin main \
  && git checkout -q -f -B main origin/main \
  && echo \"    now at: \$(git log --oneline -1)\""

echo "==> 3/8 Installing CMS files into the Strapi project"
ssh "$HOST" "mkdir -p $STRAPI/src/components/catalogue $STRAPI/scripts \
  && cp $FRONTEND/cms/src/components/catalogue/catalogue-item.json $STRAPI/src/components/catalogue/catalogue-item.json \
  && cp $FRONTEND/cms/scripts/migrate-catalogues.js $STRAPI/scripts/migrate-catalogues.js \
  && echo '    component + migration script in place'"

echo "==> 4/8 Adding 'catalogues' attribute to the single type schema"
ssh "$HOST" "cp -n $SCHEMA $SCHEMA.bak-legacy 2>/dev/null || true; python3 - <<'PYEOF'
import json
path = \"$SCHEMA\"
with open(path) as f:
    schema = json.load(f)
if \"catalogues\" in schema[\"attributes\"]:
    print(\"    attribute already present - skipping\")
else:
    schema[\"attributes\"][\"catalogues\"] = {
        \"type\": \"component\",
        \"repeatable\": True,
        \"component\": \"catalogue.catalogue-item\",
        \"pluginOptions\": {\"i18n\": {\"localized\": True}},
    }
    with open(path, \"w\") as f:
        json.dump(schema, f, indent=2, ensure_ascii=False)
        f.write(\"\n\")
    print(\"    attribute added\")
PYEOF"

echo "==> 5/8 Rebuilding and restarting Strapi (takes a few minutes)"
ssh "$HOST" "cd $BASE && docker compose build strapi && docker compose up -d strapi"

echo "    Waiting for Strapi to come up..."
ssh "$HOST" 'for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:1337/_health || true)
  [ "$code" = "204" ] && echo "    Strapi is up" && exit 0
  sleep 5
done
echo "    Strapi did not come up in time; check: docker logs gp-strapi" && exit 1'

echo "==> 6/8 Running the data migration inside the container"
# The rebuild normally bakes scripts/ into the image; docker cp covers the
# case where the Dockerfile or .dockerignore excludes it.
ssh "$HOST" "cd $BASE \
  && (docker compose exec -T strapi test -f scripts/migrate-catalogues.js \
      || { docker compose exec -T strapi mkdir -p scripts; \
           docker cp strapi/scripts/migrate-catalogues.js gp-strapi:/srv/app/scripts/; }) \
  && docker compose exec -T strapi node scripts/migrate-catalogues.js"

echo "==> 7/8 Rebuilding and restarting the frontend"
ssh "$HOST" "cd $BASE && docker compose build frontend && docker compose up -d frontend"

echo "==> 8/8 Verifying the API"
# The token lives in $BASE/.env (chmod 600); docker-compose.yml only references
# it as ${STRAPI_TOKEN} so the compose file can be committed without secrets.
TOKEN=$(ssh "$HOST" "grep '^STRAPI_TOKEN=' $BASE/.env | cut -d= -f2-")
RESP=$(ssh "$HOST" "curl -s \"http://127.0.0.1:1337/api/catalogue?locale=es&populate[catalogues][populate]=*\" -H \"Authorization: Bearer $TOKEN\"")
echo "$RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)['data']
items = d.get('catalogues') or []
print(f'    catalogues: {len(items)} item(s)')
for i in items:
    print('      -', i.get('title'), '| file:', bool(i.get('file')), '| image:', bool(i.get('image')))
"

echo "Done. Check https://gironaplants.com/es/catalogues"
