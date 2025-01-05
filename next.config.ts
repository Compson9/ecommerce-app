import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io"
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
