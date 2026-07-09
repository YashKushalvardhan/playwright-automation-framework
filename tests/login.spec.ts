import { test, expect } from '../utils/fixtures';
import { LoginPage } from '../pages/LoginPage';
import { handleConsentPopup } from '../utils/helpers';
import { maximizeWindow } from '../utils/helpers';

test.describe('Login Module', () => {

  test('Negative Login - Wrong Password, @regression', async ({ page }) => {
      await maximizeWindow(page);
      await handleConsentPopup(page);
    
    const loginPage = new LoginPage(page);
    
    await loginPage.goto('/login');
    
    await loginPage.login('testuser@example.com', 'WrongPass123');
    await loginPage.verifyLoginError();
  });

  test('Successful Login - Existing User @smoke @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
      await maximizeWindow(page);
      await handleConsentPopup(page);
    
    await loginPage.goto('/login');
    
    await loginPage.login('cigek50755@doefy.com', 'Test@1234');
    await loginPage.verifySuccessfulLogin();
  });
});