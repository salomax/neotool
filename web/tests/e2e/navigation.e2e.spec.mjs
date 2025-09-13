/* eslint-env vitest */
/// <reference types="vitest" />
import { test, expect } from "@playwright/test";

test("guard redirects unauthenticated to /sign-in", async ({ page }) => {
  await page.context().clearCookies();
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/sign-in$/);
});

test("fake login sets cookie and returns to home", async ({ page }) => {
  await page.goto("/sign-in");
  await page.getByTestId("sign-in-continue").click();
  await expect(page).toHaveURL("/");
});