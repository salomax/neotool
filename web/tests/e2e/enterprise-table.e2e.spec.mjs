import { test, expect } from "@playwright/test";

test("enterprise table basic interactions and CSV export", async ({ page }) => {
  await page.goto("/sign-in");
  await page.getByTestId("sign-in-continue").click();

  await page.goto("/examples/table/enterprise");
  await expect(page.getByTestId("enterprise-title")).toBeVisible();

  await page.getByTestId("enterprise-quick-filter-input").fill("Beta");
  await expect(page.getByText("Beta")).toBeVisible();

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByTestId("enterprise-export").click(),
  ]);
  const path = await download.path();
  expect(path).toBeTruthy();
});
