import { test, expect } from '@playwright/test';


test.only('Open Page', async ({page}) => {
  await page.goto('https://enotes.pointschool.ru/')
  await expect(page).toHaveTitle(/OK-Notes - Магазин блокнотов/);
  await page.getByRole('link', { name: 'Вход' }).click();
  //page.waitForTimeout(3000)

});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
