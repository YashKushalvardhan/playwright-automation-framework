import { test, expect } from '../utils/fixtures';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Module', () => {

  test('Add Product to Cart and Remove', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Login
    await loginPage.goto('/login');
    await loginPage.login('cigek50755@doefy.com', 'Test@1234');

    // Add to Cart
    await productPage.addToCart('Blue Top');
    await productPage.goToCart();

    // Assertions
    await cartPage.verifyProductInCart();

    // Remove and verify empty
    await cartPage.removeFirstProduct();
    await cartPage.verifyCartEmpty();
  });
});