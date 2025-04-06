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
      interpreter: "node",
      interpreter_args: "--require ts-node/register",
      env: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
      env_file: ".env",
    },
  ],
};
