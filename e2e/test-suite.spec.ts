import { test, expect } from '@playwright/test';

test.describe('E2E Test Suite', () => {
  test('passing test - homepage loads successfully', async ({ page }) => {
    // Navigate to the local app
    await page.goto('http://localhost:3000');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that the page has loaded (should have some content)
    const body = await page.locator('body');
    await expect(body).toBeVisible();

    // Verify the page title or a basic element exists
    await expect(page).toHaveTitle(/.*/); // Any title is fine
  });
});
