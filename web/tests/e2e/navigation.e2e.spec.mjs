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

// ✅ Loading skeleton: dashboard shows skeleton when delayed
 => {
  // logged in
  await page.goto("/sign-in");
  await page.getByTestId("sign-in-continue").click();

  await page.goto("/dashboard?delay=600");
  await expect(page.getByTestId("loading-dashboard")).toBeVisible();
  await expect(page.getByTestId("loading-dashboard")).toBeHidden({ timeout: 5000 });
});
