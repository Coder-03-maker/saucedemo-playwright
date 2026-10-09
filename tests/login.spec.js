import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('standard user can log in and log out', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('[data-test="title"]')).toHaveText('Products');

  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});

test('locked out user sees error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await expect(loginPage.error).toContainText('locked out');
});

test('wrong password shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong_password');
  await expect(loginPage.error).toBeVisible();
});