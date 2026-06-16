import { Page, Locator } from 'playwright';

// Odpowiednik BasePage.java — w Playwright auto-wait jest wbudowany,
// więc BasePage jest dużo prostsze niż z WebDriverWait
export class BasePage {
  constructor(protected page: Page) {}

  protected async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  protected async fill(locator: Locator, text: string): Promise<void> {
    await locator.clear();
    await locator.fill(text);
  }

  protected async getText(locator: Locator): Promise<string> {
    return await locator.innerText();
  }

  protected async isVisible(locator: Locator): Promise<boolean> {
    return await locator.isVisible();
  }
}