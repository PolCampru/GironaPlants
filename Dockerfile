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
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV STRAPI_BASE_URL=$STRAPI_BASE_URL
ENV STRAPI_TOKEN=$STRAPI_TOKEN
ENV NODE_ENV=production
RUN npm run build && chown -R node:node /srv/app
USER node
EXPOSE 3000
CMD ["npm","run","start"]
