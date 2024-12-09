import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["ca", "es", "en", "fr"],
    defaultLocale: "ca",
  },
};

export default nextConfig;
