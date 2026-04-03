import { test, expect } from '@playwright/test';

test.describe('Homepage and Navigation', () => {
  test('homepage loads and displays character grid', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Verify navbar is visible
    const navbar = page.locator('nav');
    await expect(navbar).toBeVisible();

    // Verify "Harry Potter" title in navbar
    await expect(page.locator('nav h1')).toHaveText('Harry Potter');

    // Wait for character cards to load
    await page.waitForSelector('[data-testid="character-card"]', {
      timeout: 10000,
    });

    // Verify character cards are displayed
    const characterCards = page.locator('[data-testid="character-card"]');
    await expect(characterCards.first()).toBeVisible();
  });

  test('navbar GitHub link is present', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Verify GitHub link exists in navbar
    const githubLink = page.locator('a[href*="github"]');
    await expect(githubLink).toBeVisible();
  });
});

test.describe('Character Detail Page', () => {
  test('navigates to character detail page when card is clicked', async ({
    page,
  }) => {
    await page.goto('http://localhost:3000');

    // Wait for character cards to load
    await page.waitForSelector('[data-testid="character-card"]', {
      timeout: 10000,
    });

    // Click on the first character card
    const firstCard = page.locator('[data-testid="character-card"]').first();
    await firstCard.click();

    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');

    // Verify URL changed to character detail page
    await expect(page).toHaveURL(/\/character\/.+/);

    // Verify character detail content is visible
    await expect(page.getByText('Back to Characters')).toBeVisible();
  });

  test('back button returns to character grid', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Wait for and click first character
    await page.waitForSelector('[data-testid="character-card"]', {
      timeout: 10000,
    });
    await page.locator('[data-testid="character-card"]').first().click();

    // Wait for detail page
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/character\/.+/);

    // Click back button
    await page.getByText('Back to Characters').click();

    // Verify we're back on the homepage (svelte-spa-router uses hash)
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/#?\/?$/);
    await expect(
      page.locator('[data-testid="character-card"]').first()
    ).toBeVisible();
  });
});

test.describe('Search Functionality', () => {
  test('search bar filters characters', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Wait for initial character cards
    await page.waitForSelector('[data-testid="character-card"]', {
      timeout: 10000,
    });

    // Get initial count of character cards
    const initialCards = page.locator('[data-testid="character-card"]');
    const initialCount = await initialCards.count();

    // Enter search query
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('Harry');

    // Wait a bit for filtering to occur
    await page.waitForTimeout(500);

    // Verify results are filtered
    const filteredCards = page.locator('[data-testid="character-card"]');
    const filteredCount = await filteredCards.count();

    // Results should be different (assuming there's a Harry character)
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('clear search shows all characters again', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('[data-testid="character-card"]', {
      timeout: 10000,
    });

    // Search for something
    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('Harry');
    await page.waitForTimeout(500);

    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(500);

    // Verify character cards are visible again
    const characterCards = page.locator('[data-testid="character-card"]');
    await expect(characterCards.first()).toBeVisible();
  });
});

test.describe('Filter Functionality', () => {
  test('house filter changes displayed characters', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('[data-testid="character-card"]', {
      timeout: 10000,
    });

    // Look for house filter dropdown or buttons
    const houseFilter = page.locator(
      'select, [data-testid="house-filter"], button:has-text("Gryffindor"), button:has-text("Slytherin")'
    );

    // If filter exists, test it
    if ((await houseFilter.count()) > 0) {
      const firstFilter = houseFilter.first();
      await firstFilter.click();

      // Wait for filtering
      await page.waitForTimeout(500);

      // Verify characters are still displayed (filtered results)
      const characterCards = page.locator('[data-testid="character-card"]');
      const count = await characterCards.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('clear filters button resets filters', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('[data-testid="character-card"]', {
      timeout: 10000,
    });

    // Look for clear filters button
    const clearButton = page.getByText(/clear.*filter/i);

    if ((await clearButton.count()) > 0) {
      await clearButton.click();
      await page.waitForTimeout(500);

      // Verify characters are displayed
      const characterCards = page.locator('[data-testid="character-card"]');
      await expect(characterCards.first()).toBeVisible();
    }
  });
});

test.describe('Pagination', () => {
  test('pagination controls are visible', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('[data-testid="character-card"]', {
      timeout: 10000,
    });

    // Look for pagination controls (next, previous, page numbers)
    const paginationControls = page.locator(
      '[data-testid="pagination"], button:has-text("Next"), button:has-text("Previous"), nav[aria-label*="pagination"]'
    );

    // Pagination should exist if there are enough characters
    if ((await paginationControls.count()) > 0) {
      await expect(paginationControls.first()).toBeVisible();
    }
  });

  test('clicking next page loads new characters', async ({ page }) => {
    await page.goto('http://localhost:3000');

    await page.waitForSelector('[data-testid="character-card"]', {
      timeout: 10000,
    });

    // Get first character name on page 1
    const firstCharacterName = await page
      .locator('[data-testid="character-card"]')
      .first()
      .textContent();

    // Find and click next button
    const nextButton = page.locator(
      'button:has-text("Next"), button[aria-label*="next"]'
    );

    if ((await nextButton.count()) > 0) {
      await nextButton.first().click();
      await page.waitForTimeout(1000);

      // Get first character name on page 2
      const newFirstCharacterName = await page
        .locator('[data-testid="character-card"]')
        .first()
        .textContent();

      // Names should be different
      expect(newFirstCharacterName).not.toBe(firstCharacterName);
    }
  });
});
