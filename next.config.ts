import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['http://192.168.1.28:3000', 'http://localhost:3000']
    }
  }
};

export default nextConfig;
