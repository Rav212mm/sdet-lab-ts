import { Page } from 'playwright';
import { BasePage } from './BasePage';

// Odpowiednik InventoryPage.java
export class InventoryPage extends BasePage {
  private readonly cartBadge     = this.page.locator('.shopping_cart_badge');
  private readonly inventoryItems = this.page.locator('.inventory_item');
  private readonly cartLink      = this.page.locator('.shopping_cart_link');

  constructor(page: Page) {
    super(page);
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.inventoryItems.first().waitFor();

    const items = this.inventoryItems;
    const count = await items.count();

    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const name = await item.locator('.inventory_item_name').innerText();
      if (name === productName) {
        await item.locator('button').click();
        try {
          await item.locator('button:has-text("Remove")').waitFor({ timeout: 3000 });
        } catch {
          // known-bug: problem_user nie może dodać do koszyka
        }
        return;
      }
    }
    throw new Error(`Product not found: ${productName}`);
  }

  async getCartItemCount(): Promise<number> {
    try {
      await this.cartBadge.waitFor({ timeout: 3000 });
      return parseInt(await this.cartBadge.innerText(), 10);
    } catch {
      return 0;
    }
  }

  async goToCart(): Promise<void> {
    await this.click(this.cartLink);
  }

  async getTotalPrice(): Promise<number> {
    await this.page.locator('.cart_item').first().waitFor();
    const prices = await this.page.locator('[data-test="inventory-item-price"]').allInnerTexts();
    return prices.reduce((sum, p) => sum + parseFloat(p.replace('$', '')), 0);
  }

  async getCartItems() {
    await this.page.locator('.cart_item').first().waitFor();
    return this.page.locator('.cart_item');
  }
}