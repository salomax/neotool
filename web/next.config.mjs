/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper workspace root detection
  outputFileTracingRoot: process.cwd(),
  // Disable strict mode for development to avoid double rendering issues
  reactStrictMode: false,
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
      
      // Configure source maps for development
      config.devtool = 'eval-source-map'
    }
    
    // Suppress webpack cache warnings
    config.infrastructureLogging = {
      level: 'error',
    };
    
    // Optimize bundle splitting
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: 'mui',
            chunks: 'all',
          },
          agGrid: {
            test: /[\\/]node_modules[\\/]ag-grid[\\/]/,
            name: 'ag-grid',
            chunks: 'all',
          },
          syntaxHighlighter: {
            test: /[\\/]node_modules[\\/]react-syntax-highlighter[\\/]/,
            name: 'syntax-highlighter',
            chunks: 'all',
          },
        },
      },
    };
    
    return config
  },
}

export default nextConfig
