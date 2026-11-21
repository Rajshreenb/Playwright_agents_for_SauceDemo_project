import { expect, test } from '@playwright/test';
import {
  addProductsToCart,
  fillCheckoutInformation,
  loginAsStandardUser,
  openCart,
} from '../cart-checkout-helpers';

test.describe('Cart and Checkout', () => {
  test('User can complete an order', async ({ page }) => {
    await loginAsStandardUser(page);
    await addProductsToCart(page, ['Sauce Labs Backpack']);
    await openCart(page);
    await page.getByRole('button', { name: 'Checkout' }).click();
    await fillCheckoutInformation(page);

    await expect(page.getByText('SauceCard #31337')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.getByText('Item total: $29.99')).toBeVisible();
    await expect(page.getByText('Tax: $2.40')).toBeVisible();
    await expect(page.getByText('Total: $32.39')).toBeVisible();

    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByText('Your order has been dispatched')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

    await page.getByRole('button', { name: 'Back Home' }).click();
    await expect(page).toHaveURL(/\/inventory\.html$/);
  });
});
