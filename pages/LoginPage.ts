import { expect } from '@playwright/test';
import { BasePage } from './BasePage';



export class LoginPage extends BasePage {
  readonly loginEmail = this.page.locator('input[data-qa="login-email"]');
  readonly loginPassword = this.page.locator('//input[@data-qa="login-password"]');
  readonly loginButton = this.page.locator('button[data-qa="login-button"]');
  readonly logoutLink = this.page.locator("//a[normalize-space()='Logout']");
  readonly errorMessage = this.page.locator("//p[normalize-space()='Your email or password is incorrect!']");

  async login(email: string, password: string) {
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await expect.soft(this.logoutLink).toBeVisible();
    await expect.soft(this.page.getByText('Logged in as')).toBeVisible();
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }
}