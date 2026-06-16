import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { PlaywrightWorld } from '../world/PlaywrightWorld';
import { TestDataFactory } from '../utils/TestDataFactory';

// Odpowiednik LoginSteps.java — this: PlaywrightWorld zamiast PicoContainer injection
When('the user logs in as {string} role', async function(this: PlaywrightWorld, role: string) {
  const user = TestDataFactory.userForRole(role);
  await this.loginPage.enterUsername(user.username);
  await this.loginPage.enterPassword(user.password);
  await this.loginPage.clickLoginButton();
});

When('the user enters valid username {string} and password {string}', async function(
  this: PlaywrightWorld, username: string, password: string
) {
  await this.loginPage.enterUsername(username);
  await this.loginPage.enterPassword(password);
  await this.loginPage.clickLoginButton();
});

When('the user enters username {string} and password {string}', async function(
  this: PlaywrightWorld, username: string, password: string
) {
  await this.loginPage.enterUsername(username);
  await this.loginPage.enterPassword(password);
  await this.loginPage.clickLoginButton();
});

Then('the user should be redirected to the inventory page', async function(this: PlaywrightWorld) {
  // Web-first assertion z retry — odporna na końcowy slash w BASE_URL
  await expect(this.page).toHaveURL(/\/inventory\.html$/, { timeout: 10_000 });
});

Then('the user should see error message {string}', async function(
  this: PlaywrightWorld, errorMessage: string
) {
  const actual = await this.loginPage.getErrorMessage();
  expect(actual).toBe(errorMessage);
});