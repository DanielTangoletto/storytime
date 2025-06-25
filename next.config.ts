import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@next/font"],
  },
  optimizeFonts: true,
};

export default nextConfig;
