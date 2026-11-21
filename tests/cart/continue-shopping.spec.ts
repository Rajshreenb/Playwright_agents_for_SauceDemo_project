import { expect, test } from '@playwright/test';
import { addProductsToCart, loginAsStandardUser, openCart } from '../cart-checkout-helpers';

test.describe('Cart and Checkout', () => {
  test('Continue Shopping preserves cart contents', async ({ page }) => {
    await loginAsStandardUser(page);
    await addProductsToCart(page, ['Sauce Labs Backpack']);
    await openCart(page);

    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
    const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
  });
});
