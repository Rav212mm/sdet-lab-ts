import { Page } from 'playwright';
import { BasePage } from './BasePage';
import type { CheckoutData } from '../model/CheckoutData';

// Odpowiednik CheckoutPage.java — checkout-step-one / checkout-step-two / checkout-complete
export class CheckoutPage extends BasePage {
  private readonly firstNameField = this.page.locator('#first-name');
  private readonly lastNameField  = this.page.locator('#last-name');
  private readonly postalCodeField = this.page.locator('#postal-code');
  private readonly continueButton = this.page.locator('#continue');
  private readonly finishButton   = this.page.locator('#finish');
  private readonly errorMessage   = this.page.locator("h3[data-test='error']");
  private readonly completeHeader = this.page.locator('.complete-header');

  constructor(page: Page) {
    super(page);
  }

  async fillCheckoutInfo(data: CheckoutData): Promise<void> {
    await this.fill(this.firstNameField, data.firstName);
    await this.fill(this.lastNameField, data.lastName);
    await this.fill(this.postalCodeField, data.postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.click(this.continueButton);
  }

  async clickFinish(): Promise<void> {
    await this.click(this.finishButton);
  }

  async getErrorMessage(): Promise<string> {
    try {
      await this.errorMessage.waitFor({ timeout: 3000 });
      return await this.getText(this.errorMessage);
    } catch {
      return '';
    }
  }

  async getCompleteMessage(): Promise<string> {
    await this.completeHeader.waitFor({ timeout: 5000 });
    return await this.getText(this.completeHeader);
  }
}