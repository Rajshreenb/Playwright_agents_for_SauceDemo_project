import { expect, type Page } from '@playwright/test';

export async function loginAsStandardUser(page: Page): Promise<void> {
  await page.goto('https://www.saucedemo.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
  await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/\/inventory\.html$/);
}

export async function addProductsToCart(page: Page, productNames: string[]): Promise<void> {
  for (const productName of productNames) {
    const product = page.locator('.inventory_item').filter({ hasText: productName });
    await product.getByRole('button', { name: 'Add to cart' }).click();
  }
}

export async function openCart(page: Page): Promise<void> {
  await page.getByRole('button', { name: /^Cart/ }).click();
  await expect(page).toHaveURL(/\/cart\.html$/);
}

export async function fillCheckoutInformation(page: Page): Promise<void> {
  await page.getByRole('textbox', { name: 'First Name' }).fill('Pat');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Tester');
  await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
}
