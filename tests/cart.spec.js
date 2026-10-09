import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('cart', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('adding and removing an item updates the cart badge', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addToCart('sauce-labs-backpack');
    await expect(inventory.cartBadge).toHaveText('1');

    await inventory.removeFromCart('sauce-labs-backpack');
    await expect(inventory.cartBadge).toHaveCount(0);
  });

  test('added item appears on the cart page', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.addToCart('sauce-labs-backpack');
    await inventory.openCart();

    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  });
});