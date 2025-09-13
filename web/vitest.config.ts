import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    // ✅ Rode APENAS testes de unidade/integração do projeto (src/)
    include: [
      "src/**/__tests__/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "src/**/*.{test,spec}.?(c|m)[jt]s?(x)"
    ],
    // 🚫 Ignore E2E e qualquer arquivo *.e2e.*
    exclude: [
      "tests/**",
      "e2e/**",
      "**/*.e2e.*",
      "node_modules",
      "dist",
      ".next",
      "playwright-report",
      "test-results"
    ],
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: true,
    restoreMocks: true,
  },
});
