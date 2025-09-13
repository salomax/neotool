import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [tsconfigPaths({ projects: ["./tsconfig.vitest.json"] })],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  test: {
    include: [
      "src/**/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "src/**/*.{test,spec}.?(c|m)[jt]s?(x)",
    ],
    exclude: [
      "tests/**",
      "e2e/**",
      "**/*.e2e.*",
      "node_modules",
      "dist",
      ".next",
      "playwright-report",
      "test-results",
    ],
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: true,
    restoreMocks: true,
  },
});
