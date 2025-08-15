import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@mui/styled-engine": "@mui/styled-engine-sc",
    };
    return config;
  },
};

export default nextConfig;
