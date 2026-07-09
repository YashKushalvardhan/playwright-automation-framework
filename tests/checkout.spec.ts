import { test, expect } from '@playwright/test';
import { handleConsentPopup } from '../utils/helpers';
import { maximizeWindow } from '../utils/helpers';

test('End-to-End: Add to Cart → Checkout', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');
  await maximizeWindow(page);
  await handleConsentPopup(page);

  //Input Details
  await page.locator("//input[@data-qa='login-email']").fill('cigek50755@doefy.com');
  await page.locator("//input[@placeholder='Password']").fill('Test@1234');
  await page.locator('//button[@data-qa="login-button"]').click();

  // Scroll, hover and select first product
  const product = page.locator('.product-image-wrapper')
    .filter({ has: page.locator('p', { hasText: /^Blue Top$/ }) })
    .first();

    await product.scrollIntoViewIfNeeded();
    await product.hover();

  const addToCartBtn = product.locator('.product-overlay a.btn.btn-default.add-to-cart');
    await addToCartBtn.waitFor({ state: 'visible' });
    await addToCartBtn.click();

  await page.locator("//u[normalize-space()='View Cart']").click();
  // Assertion - Product added
  await expect(page.locator("//tr[@class='cart_menu']")).toBeVisible();

  //Proceed to checkout
  await page.locator('//a[text()="Proceed To Checkout"]').click();
  
  //Click Place Order
  await page.locator('//a[text()="Place Order"]').click();

  //Input Name on card
  await page.locator("//input[@data-qa='name-on-card']").fill('testuser');

  //Input Card Number
  await page.locator("//input[@data-qa='card-number']").fill('123');

    //Input Name on card
  await page.locator("//input[@data-qa='cvc']").fill('123');
    //Input Expiry Month
  await page.locator("//input[@data-qa='expiry-month']").fill('12');
    //Input Expiry Year
  await page.locator("//input[@data-qa='expiry-year']").fill('27');

  //Click Pay and Confirm Order
  await page.locator('//button[text()="Pay and Confirm Order"]').click();
  //Assertion- Check successfull Text 
  await expect(page.locator('//p[text()="Congratulations! Your order has been confirmed!"]')).toBeVisible();
});