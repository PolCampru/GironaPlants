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
 && chown -R node:node /srv/app
USER node
EXPOSE 3000
CMD ["npm","run","start"]
