import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  async verifyProductInCart() {
    await expect(this.page.locator("//tr[@class='cart_menu']")).toBeVisible();
  }

  async removeFirstProduct() {
    await this.page.locator("//td[@class='cart_delete']//a[@class='cart_quantity_delete']").first().click();
  }

  async verifyCartEmpty() {
    await expect(this.page.getByText('Cart is empty!')).toBeVisible();
  }

  async proceedToCheckout() {
    await this.page.locator('//a[text()="Proceed To Checkout"]').click();
  }
}