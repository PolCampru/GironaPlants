module.exports = {
  apps: [
    {
      name: 'strapi-api',
      cwd: '/var/www/strapi',
      script: 'node_modules/.bin/strapi',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
    }
  ]
};
