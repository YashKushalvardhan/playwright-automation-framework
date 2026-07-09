import { test, expect } from '../utils/fixtures';   // Custom fixture
import { handleConsentPopup } from '../utils/helpers';
import { maximizeWindow } from '../utils/helpers';

//Test Case 1
test('Negative Login - Wrong Password', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');
  await maximizeWindow(page);
  await handleConsentPopup(page);
  
  //Input invalid data
  await page.locator('//input[@data-qa="login-email"]').fill('testuser@example.com');
  await page.locator('//input[@data-qa="login-password"]').fill('WrongPass123');
  await page.locator('//button[@data-qa="login-button"]').click();
 // Assertion - After Invalid Logged in
  await expect(page.locator("//p[normalize-space()='Your email or password is incorrect!']")).toContainText('Your email or password is incorrect');  // Error message check
});

//Test Case 2
test('Successful Login - Existing User', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/login');   // Direct login page

  await handleConsentPopup(page);

  // Input valid Data in 'Log in form',
  await page.locator("//input[@data-qa='login-email']").fill('cigek50755@doefy.com');  // Valid email
  await page.locator("//input[@placeholder='Password']").fill('Test@1234');
  await page.locator('//button[@data-qa="login-button"]').click();

  // Assertion - After Logged in
  await expect(page.locator("//a[normalize-space()='Logout']")).toBeVisible();  // Logout link 
  await expect(page.getByText('Logged in as')).toBeVisible();
});

