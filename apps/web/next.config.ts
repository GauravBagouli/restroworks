import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "www.restroworks.com"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  
};

export default nextConfig;
