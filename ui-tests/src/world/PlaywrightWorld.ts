import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import type { LoginPage } from '../pages/LoginPage';
import type { InventoryPage } from '../pages/InventoryPage';
import type { CartPage } from '../pages/CartPage';
import type { SearchPage } from '../pages/SearchPage';
import type { CheckoutPage } from '../pages/CheckoutPage';
import { config } from '../utils/config';

// Odpowiednik DriverManager.java + CommonSteps (shared state)
// W Cucumber.js World pełni rolę kontenera IoC — zastępuje PicoContainer z Javy
export class PlaywrightWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Page objects inicjalizowane przez Hooks.ts po utworzeniu page
  loginPage!: LoginPage;
  inventoryPage!: InventoryPage;
  cartPage!: CartPage;
  searchPage!: SearchPage;
  checkoutPage!: CheckoutPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: config.headless,
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
    });
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
    });
    this.page = await this.context.newPage();
  }

  async dispose(): Promise<void> {
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(PlaywrightWorld);