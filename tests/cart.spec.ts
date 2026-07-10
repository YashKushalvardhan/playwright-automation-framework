
import { test, expect } from '../utils/fixtures';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { products } from '../utils/testData';
// import { handleConsentPopup } from '../utils/helpers';
import { maximizeWindow } from '../utils/helpers';

test.describe('Cart Module', () => {

  for (const productName of products) {
    test(`Add "${productName}" to Cart and Remove @regression`, async ({ page }) => {
    await maximizeWindow(page);
    // await handleConsentPopup(page);
      const loginPage = new LoginPage(page);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);

      await loginPage.goto('/login');

      await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);

      await productPage.addToCart(productName);
      await productPage.goToCart();

      await cartPage.verifyProductInCart();
      await cartPage.removeFirstProduct();
      await cartPage.verifyCartEmpty();
    });
  }
});