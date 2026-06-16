import { Before, After, ITestCaseHookParameter, Status, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(30_000);
import { PlaywrightWorld } from '../world/PlaywrightWorld';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { SearchPage } from '../pages/SearchPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import path from 'path';
import fs from 'fs';

// Odpowiednik Hooks.java — Before/After zamiast @Before/@After z JUnit
Before(async function(this: PlaywrightWorld) {
  await this.init();
  // Inicjalizacja page objects na World — odpowiednik PicoContainer injection w Javie
  this.loginPage    = new LoginPage(this.page);
  this.inventoryPage = new InventoryPage(this.page);
  this.cartPage     = new CartPage(this.page);
  this.searchPage   = new SearchPage(this.page);
  this.checkoutPage = new CheckoutPage(this.page);
});

After(async function(this: PlaywrightWorld, scenario: ITestCaseHookParameter) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot();
    await this.attach(screenshot, 'image/png');

    const screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
    fs.mkdirSync(screenshotDir, { recursive: true });
    const fileName = `${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.png`;
    fs.writeFileSync(path.join(screenshotDir, fileName), screenshot);
  }
  await this.dispose();
});