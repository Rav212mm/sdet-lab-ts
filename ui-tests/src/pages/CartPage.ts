import { Page } from 'playwright';
import { BasePage } from './BasePage';

// Odpowiednik CartPage.java
export class CartPage extends BasePage {
  private readonly cartItems        = this.page.locator('.cart_item');
  private readonly checkoutButton   = this.page.locator('#checkout');
  private readonly continueButton   = this.page.locator('#continue-shopping');
  private readonly cartBadge        = this.page.locator('.shopping_cart_badge');

  constructor(page: Page) {
    super(page);
  }

  async isCartEmpty(): Promise<boolean> {
    try {
      await this.cartItems.first().waitFor({ timeout: 2000 });
      return (await this.cartItems.count()) === 0;
    } catch {
      return true;
    }
  }

  async goToCheckout(): Promise<void> {
    await this.click(this.checkoutButton);
  }

  async continueShopping(): Promise<void> {
    await this.click(this.continueButton);
  }

  async getCartItemCount(): Promise<number> {
    try {
      await this.cartBadge.waitFor({ timeout: 2000 });
      return parseInt(await this.cartBadge.innerText(), 10);
    } catch {
      return 0;
    }
  }

  async getTotalPrice(): Promise<number> {
    await this.cartItems.first().waitFor();
    const prices = await this.page.locator('[data-test="inventory-item-price"]').allInnerTexts();
    return prices.reduce((sum, p) => sum + parseFloat(p.replace('$', '')), 0);
  }
}