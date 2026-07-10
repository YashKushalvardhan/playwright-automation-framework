import { test, expect } from '../utils/fixtures';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { handleConsentPopup } from '../utils/helpers';
import { maximizeWindow } from '../utils/helpers';


test.describe('Checkout Module', () => {

  test('End-to-End: Add to Cart → Checkout @smoke @regression', async ({ page }) => {
    await maximizeWindow(page);
    // await handleConsentPopup(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Login
    await loginPage.goto('/login');
    await loginPage.login('cigek50755@doefy.com', 'Test@1234');

    // Add Product
    await productPage.addToCart('Blue Top');
    await productPage.goToCart();

    await cartPage.verifyProductInCart();
    await cartPage.proceedToCheckout();

    // Checkout Flow
    await checkoutPage.placeOrder();
    await checkoutPage.fillCardDetails();
    await checkoutPage.confirmOrder();
    await checkoutPage.verifyOrderSuccess();
  });
});