import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  async placeOrder() {
    await this.page.locator('//a[text()="Place Order"]').click();
  }

  async fillCardDetails(name: string = 'testuser', cardNo: string = '123', cvc: string = '123', month: string = '12', year: string = '27') {
    await this.page.locator("//input[@data-qa='name-on-card']").fill(name);
    await this.page.locator("//input[@data-qa='card-number']").fill(cardNo);
    await this.page.locator("//input[@data-qa='cvc']").fill(cvc);
    await this.page.locator("//input[@data-qa='expiry-month']").fill(month);
    await this.page.locator("//input[@data-qa='expiry-year']").fill(year);
  }

  async confirmOrder() {
    await this.page.locator('//button[text()="Pay and Confirm Order"]').click();
  }

  async verifyOrderSuccess() {
    await expect(this.page.locator('//p[text()="Congratulations! Your order has been confirmed!"]')).toBeVisible();
  }
}