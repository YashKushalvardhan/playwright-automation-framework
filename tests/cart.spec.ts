import { test, expect } from '@playwright/test';
import { handleConsentPopup } from '../utils/helpers';
import { maximizeWindow } from '../utils/helpers';

//Test Case 1
test('Add Product to Cart and Remove', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');
  await maximizeWindow(page);
  await handleConsentPopup(page);

  // Input valid Data in 'Log in form',
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
  
  //Remove product
  await page.locator("//td[@class='cart_delete']//a[@class='cart_quantity_delete']").first().click();
  //Verify cart is empty
  await expect(page.getByText('Cart is empty!')).toBeVisible();
});