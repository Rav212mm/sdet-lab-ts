import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../world/PlaywrightWorld';

// Odpowiednik ShoppingSteps.java
When('the user logs in with username {string} and password {string}', async function(
  this: PlaywrightWorld, username: string, password: string
) {
  await this.loginPage.enterUsername(username);
  await this.loginPage.enterPassword(password);
  await this.loginPage.clickLoginButton();
});

When('the user adds following products to cart:', async function(
  this: PlaywrightWorld, products: DataTable
) {
  const rows = products.hashes() as Array<{ product_name: string }>;
  for (const row of rows) {
    await this.inventoryPage.addProductToCart(row.product_name);
  }
});

Then('the cart should contain {int} items', async function(
  this: PlaywrightWorld, expectedCount: number
) {
  const actual = await this.inventoryPage.getCartItemCount();
  expect(actual).toBe(expectedCount);
});

Then('the total price of items in cart should be {string}', async function(
  this: PlaywrightWorld, expectedTotalPrice: string
) {
  await this.inventoryPage.goToCart();
  const actual = await this.inventoryPage.getTotalPrice();
  expect(actual).toBeCloseTo(parseFloat(expectedTotalPrice), 2);
});

Then('the product {string} should be visible in the cart', async function(
  this: PlaywrightWorld, productName: string
) {
  await this.inventoryPage.goToCart();
  const items = await this.inventoryPage.getCartItems();
  const count = await items.count();
  let found = false;
  for (let i = 0; i < count; i++) {
    const name = await items.nth(i).locator('.inventory_item_name').innerText();
    if (name === productName) { found = true; break; }
  }
  expect(found, `Product '${productName}' was not found in the cart`).toBe(true);
});