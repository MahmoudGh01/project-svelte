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
  test('failing test - searching for non-existent element', async ({
    page,
  }) => {
    // Navigate to the local app
    await page.goto('http://localhost:3000');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // This test will fail because we're looking for an element that doesn't exist
    const nonExistentButton = page.getByRole('button', {
      name: 'This Button Does Not Exist On The Page',
    });

    // This assertion will fail
    await expect(nonExistentButton).toBeVisible({ timeout: 5000 });
  });
});
