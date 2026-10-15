FROM node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /srv/app
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
ARG NEXT_PUBLIC_BASE_URL
ARG STRAPI_BASE_URL
ARG STRAPI_TOKEN
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV STRAPI_BASE_URL=$STRAPI_BASE_URL
ENV STRAPI_TOKEN=$STRAPI_TOKEN
ENV NEXT_PUBLIC_UMAMI_WEBSITE_ID=$NEXT_PUBLIC_UMAMI_WEBSITE_ID
ENV NODE_ENV=production
# The image cache is built here, not left for the first visitor: `next build`
# does not encode any variant, so a fresh container would make whoever lands
# first wait on an AVIF encode per photograph. Same layer as the build so the
# chown below covers the cache and the runtime user can keep writing to it.
RUN npm run build \
 && npm run warm:images \
 && mkdir .next/cache-seed \
 && for d in images fetch-cache; do \
      if [ -d .next/cache/$d ]; then mv .next/cache/$d .next/cache-seed/; fi; \
    done \
 && rm -rf .next/cache && mkdir .next/cache \
 && chown -R node:node /srv/app
USER node
EXPOSE 3000
# The container runs with a read-only root filesystem (see
# deploy/docker-compose.yml) so a dropped binary has nowhere to live: the only
# writable paths are noexec tmpfs mounts. .next/cache is one of them, so the
# warmed image and fetch caches are baked in as cache-seed and copied in at
# start. next is started directly because npm wants to write logs under $HOME.
CMD ["sh","-c","cp -a .next/cache-seed/. .next/cache/ && exec node_modules/.bin/next start"]
