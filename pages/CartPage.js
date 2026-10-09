export class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator('[data-test="cart-list"] [data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}