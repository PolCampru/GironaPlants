#!/usr/bin/env bash
# Seeds the localized home + about-us content into the production Strapi on
# the GironaPlants VPS (all four locales: es, ca, en, fr).
#
# Run from anywhere:  bash cms/seed-content-to-vps.sh
# Overwrite existing CMS content instead of only filling empty fields:
#                     SEED_FORCE=1 bash cms/seed-content-to-vps.sh
# Idempotent; safe to re-run.
set -euo pipefail

HOST="root@46.202.135.74"
BASE="/opt/gironaplants"
FRONTEND="$BASE/frontend"
STRAPI="$BASE/strapi"
REPO="https://github.com/PolCampru/GironaPlants.git"
FORCE="${SEED_FORCE:-0}"

echo "==> 1/5 Backing up database"
ssh "$HOST" "cp $BASE/data/data.db $BASE/backups/data.db.bak-\$(date +%Y%m%d-%H%M%S)"

echo "==> 2/5 Syncing repo on the server (git checkout of origin/main)"
ssh "$HOST" "cd $FRONTEND \
  && { git rev-parse --git-dir >/dev/null 2>&1 || git init -q -b main; } \
  && { git remote add origin $REPO 2>/dev/null || git remote set-url origin $REPO; } \
  && git fetch -q --depth 1 origin main \
  && git checkout -q -f -B main origin/main \
  && echo \"    now at: \$(git log --oneline -1)\""

echo "==> 3/5 Installing the seed script into the Strapi project"
ssh "$HOST" "mkdir -p $STRAPI/scripts \
  && cp $FRONTEND/cms/scripts/seed-site-content.js $STRAPI/scripts/seed-site-content.js \
  && echo '    seed script in place'"

echo "==> 4/5 Running the seed inside the container"
# docker cp covers the case where scripts/ isn't baked into the image.
ssh "$HOST" "cd $BASE \
  && { docker compose exec -T strapi mkdir -p scripts || true; } \
  && docker cp strapi/scripts/seed-site-content.js gp-strapi:/srv/app/scripts/ \
  && docker compose exec -T -e SEED_FORCE=$FORCE strapi node scripts/seed-site-content.js"

echo "==> 5/5 Verifying the API"
TOKEN=$(ssh "$HOST" "grep '^STRAPI_TOKEN=' $BASE/.env | cut -d= -f2-")
for LOCALE in es ca en fr; do
  for RES in home about-us; do
    FIELD=$([ "$RES" = "home" ] && echo hero_title || echo title)
    RESP=$(ssh "$HOST" "curl -s \"http://127.0.0.1:1337/api/$RES?locale=$LOCALE\" -H \"Authorization: Bearer $TOKEN\"")
    echo "$RESP" | python3 -c "
import json, sys
try:
    d = json.load(sys.stdin).get('data') or {}
except Exception:
    d = {}
print(f'    $RES[$LOCALE]: ' + (d.get('$FIELD') or '(empty)'))
"
  done
done

echo "Done. The site picks up the content on its next fetch (the /api/strapi"
echo "proxy caches for up to 2 h; restart gp-frontend to see it immediately:"
echo "  ssh $HOST 'cd $BASE && docker compose restart frontend')"
