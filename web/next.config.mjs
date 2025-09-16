import withBundleAnalyzer from '@next/bundle-analyzer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withBA = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { 
    typedRoutes: true 
  },
  // Transpile @tanstack packages to handle private methods
  transpilePackages: ['@tanstack/react-query', '@tanstack/query-core'],
  webpack: (config, { dev, isServer }) => {
    // Optimize webpack cache for better performance
    if (dev) {
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [join(__dirname, 'next.config.mjs')],
        },
        // Reduce cache size warnings by optimizing serialization
        compression: 'gzip',
        maxMemoryGenerations: 1,
        // Limit cache size to prevent large string warnings
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      };
    }

    // Optimize for tree-shaking and proper code splitting
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        chunks: 'all',
        minSize: 20000,
        maxSize: 200000,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // Separate Material-UI components for better tree-shaking
          muiComponents: {
            test: /[\\/]node_modules[\\/]@mui[\\/]material[\\/]/,
            name: 'mui-components',
            chunks: 'all',
            priority: 20,
            enforce: true,
            maxSize: 100000,
          },
          muiIcons: {
            test: /[\\/]node_modules[\\/]@mui[\\/]icons-material[\\/]/,
            name: 'mui-icons',
            chunks: 'all',
            priority: 19,
            enforce: true,
            maxSize: 50000,
          },
          muiX: {
            test: /[\\/]node_modules[\\/]@mui[\\/]x-/,
            name: 'mui-x',
            chunks: 'all',
            priority: 18,
            enforce: true,
            maxSize: 100000,
          },
          emotion: {
            test: /[\\/]node_modules[\\/]@emotion[\\/]/,
            name: 'emotion',
            chunks: 'all',
            priority: 15,
            enforce: true,
            maxSize: 50000,
          },
          agGrid: {
            test: /[\\/]node_modules[\\/]ag-grid/,
            name: 'ag-grid',
            chunks: 'all',
            priority: 12,
            enforce: true,
            maxSize: 200000,
          },
          // Exclude MUI from vendor bundle to prevent full library bundling
          vendor: {
            test: /[\\/]node_modules[\\/](?!@mui|@emotion)/,
            name: 'vendors',
            chunks: 'all',
            priority: 5,
            minChunks: 1,
            maxSize: 200000,
          },
        },
      },
    };

    // Add performance hints to help identify large bundles
    config.performance = {
      ...config.performance,
      hints: dev ? 'warning' : false, // Disable in production
      maxEntrypointSize: 1000000, // 1MB for entrypoint
      maxAssetSize: 500000, // 500KB for individual assets
    };

    // Ensure proper tree-shaking for Material-UI
    // The path imports in mui-imports.ts should handle tree-shaking

    // Add module concatenation for better tree-shaking
    config.optimization.concatenateModules = true;

    return config;
  },
};

export default withBA(nextConfig);
