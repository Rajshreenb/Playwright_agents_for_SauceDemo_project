import { expect, test } from '@playwright/test';
import { addProductsToCart, loginAsStandardUser, openCart } from '../cart-checkout-helpers';

test.describe('Cart and Checkout', () => {
  test('Checkout can be cancelled', async ({ page }) => {
    await loginAsStandardUser(page);
    await addProductsToCart(page, ['Sauce Labs Backpack']);
    await openCart(page);
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
    await expect(page.getByRole('button', { name: /View details for Sauce Labs Backpack/ })).toBeVisible();
  });
});
