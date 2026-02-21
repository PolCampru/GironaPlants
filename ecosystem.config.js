require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "gironaplants",
      script: "app/server.ts",
      instances: process.env.PM2_INSTANCES || "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      min_uptime: "10s",
      max_restarts: 5,
      restart_delay: 4000,
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: process.env.PORT || 3000,
        // Remove sensitive data from PM2 env display
        STRAPI_TOKEN: process.env.STRAPI_TOKEN,
        STRAPI_BASE_URL: process.env.STRAPI_BASE_URL,
        EMAIL_HOST: process.env.EMAIL_HOST,
        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,
        MAIL_DESTINATION: process.env.MAIL_DESTINATION,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        SECRET_TOKEN: process.env.SECRET_TOKEN,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3040,
        HOST: "localhost",
      },
      env_staging: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: 3001,
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "logs/error.log",
      out_file: "logs/out.log",
      pid_file: "logs/pid.log",
      time: true,
      // Monitoring
      monitoring: false, // Set to true if using PM2 Plus
      // Health check
      health_check_http: {
        url: `http://localhost:${process.env.PORT || 3000}/api/health`,
        interval: 30000, // 30 seconds
        timeout: 5000,   // 5 seconds
        max_fails: 3,
      },
      // Process lifecycle
      kill_timeout: 5000,
      listen_timeout: 8000,
      // Log rotation
      log_file: "logs/combined.log", 
      merge_logs: true,
      // Resource limits
      node_args: [
        "--max-old-space-size=2048",
        "--max-http-header-size=16384"
      ],
      // Environment-specific overrides
      ...(process.env.NODE_ENV === 'production' && {
        instances: process.env.PM2_INSTANCES || Math.min(4, require('os').cpus().length),
        max_memory_restart: "512M",
        cron_restart: "0 2 * * *", // Restart daily at 2 AM
      }),
    },
  ],
  deploy: {
    production: {
      user: "root",
      host: "46.202.135.74", 
      ref: "origin/main",
      repo: "https://github.com/your-repo/gironaplants.git", // Update with actual repo
      path: "/var/www/frontend",
      "post-deploy": "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      env: {
        NODE_ENV: "production"
      }
    }
  }
};
