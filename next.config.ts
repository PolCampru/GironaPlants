import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: "ca",
    locales: ["ca", "es", "en", "fr"],
  },
};

export default nextConfig;
