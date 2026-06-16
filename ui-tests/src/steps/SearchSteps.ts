import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../world/PlaywrightWorld';

// Odpowiednik SearchSteps.java
Then('the product {string} should be visible in the inventory', async function(
  this: PlaywrightWorld, productName: string
) {
  const visible = await this.searchPage.isProductVisible(productName);
  expect(visible, `Product '${productName}' was not found in the inventory`).toBe(true);
});