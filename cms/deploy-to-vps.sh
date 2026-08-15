#!/usr/bin/env bash
# Deploys the catalogues-array migration to the GironaPlants VPS.
# Run from the repo root:  bash cms/deploy-to-vps.sh
#
# Steps: upload files -> patch schema.json -> rebuild+restart Strapi ->
# run data migration -> verify API. Idempotent; safe to re-run.
set -euo pipefail

HOST="root@46.202.135.74"
STRAPI_DIR="/opt/gironaplants/strapi"
SCHEMA="$STRAPI_DIR/src/api/catalogue/content-types/catalogue/schema.json"

echo "==> 1/6 Backing up database"
ssh "$HOST" 'cp /opt/gironaplants/data/data.db /opt/gironaplants/backups/data.db.bak-$(date +%Y%m%d-%H%M%S)'

echo "==> 2/6 Uploading component schema and migration script"
ssh "$HOST" "mkdir -p $STRAPI_DIR/src/components/catalogue $STRAPI_DIR/scripts"
scp -q cms/src/components/catalogue/catalogue-item.json "$HOST:$STRAPI_DIR/src/components/catalogue/catalogue-item.json"
scp -q cms/scripts/migrate-catalogues.js "$HOST:$STRAPI_DIR/scripts/migrate-catalogues.js"

echo "==> 3/6 Adding 'catalogues' attribute to the single type schema"
ssh "$HOST" "cp -n $SCHEMA $SCHEMA.bak-legacy || true; python3 - <<'PYEOF'
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

echo "==> 4/6 Rebuilding and restarting the Strapi container (takes a few minutes)"
ssh "$HOST" 'cd /opt/gironaplants && docker compose build strapi && docker compose up -d strapi'

echo "    Waiting for Strapi to come up..."
ssh "$HOST" 'for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:1337/_health || true)
  [ "$code" = "204" ] && echo "    Strapi is up" && exit 0
  sleep 5
done
echo "    Strapi did not come up in time; check: docker logs gp-strapi" && exit 1'

echo "==> 5/6 Running the data migration inside the container"
# The rebuild normally bakes scripts/ into the image; docker cp covers the
# case where the Dockerfile or .dockerignore excludes it.
ssh "$HOST" 'cd /opt/gironaplants \
  && (docker compose exec -T strapi test -f scripts/migrate-catalogues.js \
      || { docker compose exec -T strapi mkdir -p scripts; \
           docker cp strapi/scripts/migrate-catalogues.js gp-strapi:/srv/app/scripts/; }) \
  && docker compose exec -T strapi node scripts/migrate-catalogues.js'

echo "==> 6/6 Verifying the API"
TOKEN=$(grep '^STRAPI_TOKEN=' .env | cut -d= -f2)
RESP=$(ssh "$HOST" "curl -s \"http://127.0.0.1:1337/api/catalogue?locale=es&populate[catalogues][populate]=*\" -H \"Authorization: Bearer $TOKEN\"")
echo "$RESP" | python3 -c "
import json, sys
d = json.load(sys.stdin)['data']
items = d.get('catalogues') or []
print(f'    catalogues: {len(items)} item(s)')
for i in items:
    print('      -', i.get('title'), '| file:', bool(i.get('file')), '| image:', bool(i.get('image')))
"

echo "Done. The website picks up the new shape automatically (cache <= 1h)."
