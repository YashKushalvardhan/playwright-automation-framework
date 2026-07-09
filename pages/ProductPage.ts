import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  // Product selection
  getProductByName(name: string) {
    return this.page.locator('.product-image-wrapper')
      .filter({ has: this.page.locator('p', { hasText: name }) })
      .first();
  }

  async addToCart(productName: string = 'Blue Top') {
    const product = this.getProductByName(productName);
    
    await product.scrollIntoViewIfNeeded();
    await product.hover();

    const addToCartBtn = product.locator('.product-overlay a.btn.btn-default.add-to-cart');
    await addToCartBtn.waitFor({ state: 'visible', timeout: 10000 });
    await addToCartBtn.click();
  }

  async goToCart() {
    await this.page.locator("//u[normalize-space()='View Cart']").click();
  }
}