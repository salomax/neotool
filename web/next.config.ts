import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // App Router por padrão quando existe /app
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;
