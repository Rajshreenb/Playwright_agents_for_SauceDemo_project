import { expect, test } from '@playwright/test';
import { addProductsToCart, loginAsStandardUser, openCart } from '../cart-checkout-helpers';

test.describe('Cart and Checkout', () => {
  test('Checkout validates Last Name and Postal Code', async ({ page }) => {
    await loginAsStandardUser(page);
    await addProductsToCart(page, ['Sauce Labs Backpack']);
    await openCart(page);
    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Pat');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('alert')).toContainText('Last Name is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

    await page.getByRole('textbox', { name: 'Last Name' }).fill('Tester');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('alert')).toContainText('Postal Code is required');
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
  });
});
