import withBundleAnalyzer from '@next/bundle-analyzer';
const withBA = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
};

export default nextConfig;
