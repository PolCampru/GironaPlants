#!/usr/bin/env bash
# Deploys the Strapi content-type schemas and the seed script from THIS
# working tree straight to the VPS, rebuilds the Strapi image, and seeds the
# localized copy.
#
#   bash cms/deploy-schema-to-vps.sh              # fill empty fields only
#   SEED_FORCE=1 bash cms/deploy-schema-to-vps.sh # overwrite existing copy
#
# Unlike cms/seed-content-to-vps.sh this does NOT go through GitHub, so it
# works before the change is pushed. Push afterwards: the server also keeps a
# git checkout in frontend/, and the other script copies frontend/ over
# strapi/ — so an unpushed schema here would be reverted by the next run of
# that one.
#
# Removing an attribute from a schema stops Strapi serving it; the column
# stays in SQLite until you drop it, so the data is recoverable from the
# backup this script takes.
set -euo pipefail

HOST="root@46.202.135.74"
BASE="/opt/gironaplants"
STRAPI="$BASE/strapi"
FORCE="${SEED_FORCE:-0}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> 1/6 Backing up the database"
ssh "$HOST" "cp $BASE/data/data.db $BASE/backups/data.db.bak-\$(date +%Y%m%d-%H%M%S) && ls -1t $BASE/backups | head -1"

echo "==> 2/6 Uploading schemas and components"
for TYPE in home about-us catalogue offer plant; do
  scp -q "$ROOT/cms/app/src/api/$TYPE/content-types/$TYPE/schema.json" \
    "$HOST:$STRAPI/src/api/$TYPE/content-types/$TYPE/schema.json"
  echo "    $TYPE/schema.json"
done
# quote-request es una coleccion entera, no solo un esquema: el servidor no
# tiene el directorio, asi que van tambien el controller, la ruta y el
# servicio. Strapi no registra el tipo si falta cualquiera de los cuatro.
QR="src/api/quote-request"
ssh "$HOST" "mkdir -p $STRAPI/$QR/content-types/quote-request $STRAPI/$QR/controllers $STRAPI/$QR/routes $STRAPI/$QR/services"
scp -q "$ROOT/cms/app/$QR/content-types/quote-request/schema.json" \
  "$HOST:$STRAPI/$QR/content-types/quote-request/schema.json"
for PART in controllers routes services; do
  scp -q "$ROOT/cms/app/$QR/$PART/quote-request.ts" "$HOST:$STRAPI/$QR/$PART/quote-request.ts"
done
echo "    quote-request (schema + controller + route + service)"

ssh "$HOST" "mkdir -p $STRAPI/src/components/catalogue"
scp -q "$ROOT/cms/app/src/components/catalogue/catalogue-item.json" \
  "$HOST:$STRAPI/src/components/catalogue/catalogue-item.json"
echo "    components/catalogue/catalogue-item.json"

echo "==> 3/6 Uploading the seed script and its content"
ssh "$HOST" "mkdir -p $STRAPI/scripts"
scp -q "$ROOT/cms/scripts/seed-site-content.js" "$HOST:$STRAPI/scripts/seed-site-content.js"
scp -q "$ROOT/cms/scripts/site-content.json" "$HOST:$STRAPI/scripts/site-content.json"

echo "==> 4/6 Rebuilding and restarting Strapi (tables are created on boot)"
ssh "$HOST" "cd $BASE && docker compose build strapi >/dev/null && docker compose up -d strapi"

echo "==> 5/6 Waiting for Strapi to answer"
ssh "$HOST" "for i in \$(seq 1 60); do
  if curl -fsS -o /dev/null http://127.0.0.1:1337/_health 2>/dev/null \
     || curl -fsS -o /dev/null http://127.0.0.1:1337/admin 2>/dev/null; then
    echo '    up'; exit 0
  fi
  sleep 3
done
echo '    timed out waiting for Strapi'; exit 1"

echo "==> 6/6 Seeding localized content"
ssh "$HOST" "cd $BASE \
  && docker compose exec -T strapi mkdir -p scripts \
  && docker cp strapi/scripts/seed-site-content.js gp-strapi:/srv/app/scripts/ \
  && docker cp strapi/scripts/site-content.json gp-strapi:/srv/app/scripts/ \
  && docker compose exec -T -e SEED_FORCE=$FORCE strapi node scripts/seed-site-content.js"

echo
echo "Done. Restart the frontend to bypass its 1 h cache:"
echo "  ssh $HOST 'cd $BASE && docker compose restart frontend'"
