import { test, expect } from '../utils/fixtures';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { products } from '../utils/testData';
import { maximizeWindow } from '../utils/helpers';

test.describe('Cart Module', () => {

  for (const productName of products) {
    test(`Add "${productName}" to Cart and Remove @regression`, async ({ page }) => {
    await maximizeWindow(page);
      const loginPage = new LoginPage(page);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);
      //Login
      await loginPage.goto('/login');

      await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
      
      //Add to cart
      await productPage.addToCart(productName);
      await productPage.goToCart();
      
      //Assertions
      await cartPage.verifyProductInCart();
      
      // Remove and verify empty
      await cartPage.removeFirstProduct();
      await cartPage.verifyCartEmpty();
    });
  }
});