import { expect, test } from '@playwright/test';
import { addProductsToCart, loginAsStandardUser, openCart } from '../cart-checkout-helpers';

test.describe('Cart and Checkout', () => {
  test('Cart shows added products and supports removal', async ({ page }) => {
    await loginAsStandardUser(page);
    await addProductsToCart(page, ['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await expect(page.getByRole('button', { name: 'Cart, 2 items' })).toBeVisible();

    await openCart(page);
    const bikeLight = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Bike Light' });
    await bikeLight.getByRole('button', { name: 'Remove' }).click();

    await expect(page.locator('.cart_item')).toHaveCount(1);
    await expect(page.getByRole('button', { name: /View details for Sauce Labs Backpack/ })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
  });
});
