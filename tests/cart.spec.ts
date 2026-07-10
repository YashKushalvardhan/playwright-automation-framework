// import { test, expect } from '../utils/fixtures';
// import { LoginPage } from '../pages/LoginPage';
// import { ProductPage } from '../pages/ProductPage';
// import { CartPage } from '../pages/CartPage';
// import { handleConsentPopup } from '../utils/helpers';
// import { maximizeWindow } from '../utils/helpers';

// test.describe('Cart Module', () => {

//   test('Add Product to Cart and Remove@smoke @regression', async ({ page }) => {
//     await maximizeWindow(page);
//     await handleConsentPopup(page);
//     const loginPage = new LoginPage(page);
//     const productPage = new ProductPage(page);
//     const cartPage = new CartPage(page);

//     // Login
//     await loginPage.goto('/login');
//     await loginPage.login('cigek50755@doefy.com', 'Test@1234');

//     // Add to Cart
//     await productPage.addToCart('Blue Top');
//     await productPage.goToCart();

//     // Assertions
//     await cartPage.verifyProductInCart();

//     // Remove and verify empty
//     await cartPage.removeFirstProduct();
//     await cartPage.verifyCartEmpty();
//   });
// });
// tests/cart.spec.ts
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

      await loginPage.login('cigek50755@doefy.com', 'Test@1234');

      await productPage.addToCart(productName);
      await productPage.goToCart();

      await cartPage.verifyProductInCart();
      await cartPage.removeFirstProduct();
      await cartPage.verifyCartEmpty();
    });
  }
});