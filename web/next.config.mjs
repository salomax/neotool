/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper workspace root detection
  outputFileTracingRoot: process.cwd(),
  // Disable strict mode for development to avoid double rendering issues
  reactStrictMode: false,
  // Enable SWC minification
  swcMinify: true,
  // Optimize bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Handle images
  images: {
    domains: ['localhost'],
  },
  // Webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Optimize for development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    
    return config
  },
}

export default nextConfig
