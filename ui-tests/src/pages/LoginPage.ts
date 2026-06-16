import { Page } from 'playwright';
import { BasePage } from './BasePage';
import { config } from '../utils/config';

// Odpowiednik LoginPage.java — Playwright Locators zamiast By.id/By.css
export class LoginPage extends BasePage {
  private readonly usernameField = this.page.locator('#user-name');
  private readonly passwordField = this.page.locator('#password');
  private readonly loginButton   = this.page.locator('#login-button');
  private readonly errorMessage  = this.page.locator("h3[data-test='error']");

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto(config.baseUrl);
  }

  async enterUsername(username: string): Promise<void> {
    await this.fill(this.usernameField, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fill(this.passwordField, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameField, username);
    await this.fill(this.passwordField, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    try {
      await this.errorMessage.waitFor({ timeout: 3000 });
      return await this.getText(this.errorMessage);
    } catch {
      return '';
    }
  }
}