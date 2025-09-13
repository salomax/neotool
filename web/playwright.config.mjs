import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  testMatch: "**/*.e2e.spec.mjs",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
  webServer: {
    command: "NEXT_PUBLIC_MSW=1 NEXT_PUBLIC_E2E=1 next dev -p 3000",
    port: 3000,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
