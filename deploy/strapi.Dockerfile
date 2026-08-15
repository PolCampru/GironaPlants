FROM node:22-bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /srv/app
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
ENV NODE_ENV=production
RUN npm run build && mkdir -p /data /srv/app/public/uploads \
    && chown -R node:node /srv/app /data
USER node
EXPOSE 1337
CMD ["npm","run","start"]
