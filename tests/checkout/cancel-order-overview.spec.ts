import { expect, test } from '@playwright/test';
import {
  addProductsToCart,
  fillCheckoutInformation,
  loginAsStandardUser,
  openCart,
} from '../cart-checkout-helpers';

test.describe('Cart and Checkout', () => {
  test('Cancelling the order overview preserves the cart', async ({ page }) => {
    await loginAsStandardUser(page);
    await addProductsToCart(page, ['Sauce Labs Backpack']);
    await openCart(page);
    await page.getByRole('button', { name: 'Checkout' }).click();
    await fillCheckoutInformation(page);
    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
    const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();
  });
});
