require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "gironaplants",
      script: "app/server.ts",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      interpreter: "node_modules/.bin/ts-node",
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 3040,
        HOST: "localhost",
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "logs/error.log",
      out_file: "logs/out.log",
    },
  ],
};
