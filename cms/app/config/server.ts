import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Caddy terminates TLS in front of Strapi. Without this, Koa ignores
  // X-Forwarded-Proto and treats proxied requests as plain HTTP, which breaks
  // admin login over HTTPS and absolute URL generation.
  proxy: true,
  app: {
    keys: env.array('APP_KEYS'),
  },
});

export default config;
