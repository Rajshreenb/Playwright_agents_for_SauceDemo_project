import { expect, test } from '@playwright/test';
import {
  addProductsToCart,
  fillCheckoutInformation,
  loginAsStandardUser,
  openCart,
} from '../cart-checkout-helpers';

test.describe('Cart and Checkout', () => {
  test('Order overview calculates totals for multiple products', async ({ page }) => {
    await loginAsStandardUser(page);
    await addProductsToCart(page, ['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await openCart(page);
    await page.getByRole('button', { name: 'Checkout' }).click();
    await fillCheckoutInformation(page);

    await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
    await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
    await expect(page.getByText('Item total: $39.98')).toBeVisible();
    await expect(page.getByText('Tax: $3.20')).toBeVisible();
    await expect(page.getByText('Total: $43.18')).toBeVisible();
  });
});
