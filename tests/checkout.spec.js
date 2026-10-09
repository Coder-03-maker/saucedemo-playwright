import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('user can complete a purchase', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventory.addToCart('sauce-labs-backpack');
  await inventory.openCart();
  await expect(cart.items).toHaveText('Sauce Labs Backpack');

  await cart.checkout();
  await checkout.fillInfo('Test', 'User', '400001');
  await expect(page).toHaveURL(/checkout-step-two/);

  await checkout.finish();
  await expect(checkout.confirmation).toHaveText('Thank you for your order!');
});