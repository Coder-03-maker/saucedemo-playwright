# SauceDemo Playwright Tests

![Playwright Tests](https://github.com/Coder-03-maker/saucedemo-playwright/actions/workflows/playwright.yml/badge.svg)

End-to-end UI tests for [SauceDemo](https://www.saucedemo.com), a practice e-commerce site, written with Playwright and JavaScript. Tests follow the Page Object Model and run automatically on GitHub Actions across Chromium, Firefox and WebKit.

## What is tested

**Login**
- Standard user can log in and log out
- Locked-out user sees an error message
- Wrong password shows an error message

**Cart**
- Adding and removing an item updates the cart badge
- An added item appears on the cart page

**Checkout**
- User can complete a purchase from cart to order confirmation

## Tech stack

- Playwright (`@playwright/test`)
- JavaScript (Node.js)
- GitHub Actions for CI

## Project structure

```
pages/
  LoginPage.js        # locators and actions for the login page
  InventoryPage.js    # locators and actions for the products page
  CartPage.js         # locators and actions for the cart page
  CheckoutPage.js     # locators and actions for the checkout pages
tests/
  login.spec.js
  cart.spec.js
  checkout.spec.js
playwright.config.js
.github/workflows/playwright.yml
```

## How to run

```bash
npm install
npx playwright install
npx playwright test
```

Run a single browser:

```bash
npx playwright test --project=chromium
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## Design notes

- **Page Object Model:** locators live in `pages/`, so a UI change is fixed in one place instead of in every test.
- **Locators:** uses SauceDemo's `data-test` attributes, which are more stable than CSS classes or XPath.
- **Shared setup:** cart tests log in through `test.beforeEach`.
- **Flaky test fix:** a cart assertion passed locally but failed in CI because it matched the product list while the page was still changing. Scoping the locator to the cart list fixed it.
- **CI:** every push runs the full suite and uploads the HTML report as an artifact.

## Planned

- `problem_user` tests to catch the site's intentional bugs