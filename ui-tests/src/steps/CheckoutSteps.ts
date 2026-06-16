import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../world/PlaywrightWorld';

// Odpowiednik CheckoutSteps.java
When('the user proceeds to checkout', async function(this: PlaywrightWorld) {
  await this.inventoryPage.goToCart();
  await this.cartPage.goToCheckout();
});

When('the user fills checkout information with first name {string}, last name {string} and postal code {string}', async function(
  this: PlaywrightWorld, firstName: string, lastName: string, postalCode: string
) {
  await this.checkoutPage.fillCheckoutInfo({ firstName, lastName, postalCode });
});

When('the user continues to the next checkout step', async function(this: PlaywrightWorld) {
  await this.checkoutPage.clickContinue();
});

When('the user finishes the checkout', async function(this: PlaywrightWorld) {
  await this.checkoutPage.clickFinish();
});

Then('the user should see the order confirmation message {string}', async function(
  this: PlaywrightWorld, expectedMessage: string
) {
  const actual = await this.checkoutPage.getCompleteMessage();
  expect(actual).toBe(expectedMessage);
});

Then('the user should see checkout error message {string}', async function(
  this: PlaywrightWorld, expectedMessage: string
) {
  const actual = await this.checkoutPage.getErrorMessage();
  expect(actual).toBe(expectedMessage);
});