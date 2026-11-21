import { expect, test } from '@playwright/test';
import { loginAsStandardUser, openCart } from '../cart-checkout-helpers';

test.describe('Cart and Checkout', () => {
  test('Empty cart shows no products and retains checkout controls', async ({ page }) => {
    await loginAsStandardUser(page);
    await openCart(page);

    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.locator('.cart_item')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  });
});
