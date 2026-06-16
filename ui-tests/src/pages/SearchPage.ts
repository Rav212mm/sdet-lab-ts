import { Page } from 'playwright';
import { BasePage } from './BasePage';

// Odpowiednik SearchPage.java
export class SearchPage extends BasePage {
  private readonly inventoryItems = this.page.locator('.inventory_item');

  constructor(page: Page) {
    super(page);
  }

  async isProductVisible(productName: string): Promise<boolean> {
    await this.inventoryItems.first().waitFor();
    const count = await this.inventoryItems.count();
    for (let i = 0; i < count; i++) {
      const name = await this.inventoryItems.nth(i).locator('.inventory_item_name').innerText();
      if (name === productName) return true;
    }
    return false;
  }
}