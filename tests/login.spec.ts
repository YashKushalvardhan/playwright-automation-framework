import { test, expect } from '../utils/fixtures';
import { LoginPage } from '../pages/LoginPage';
import { generateInvalidCredentials } from '../utils/testData';
import { handleConsentPopup } from '../utils/helpers';
import { maximizeWindow } from '../utils/helpers';

test.describe('Login Module', () => {

  test('Successful Login - Existing User @smoke @regression', async ({ page }) => {
    await maximizeWindow(page);
    // await handleConsentPopup(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto('/login');

    await loginPage.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await loginPage.verifySuccessfulLogin();
  });

  const invalidCreds = generateInvalidCredentials(3);

  invalidCreds.forEach((cred, index) => {
    test(`Negative Login - Random Invalid Credentials #${index + 1} @regression`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto('/login');
      await loginPage.login(cred.email, cred.password);
      await loginPage.verifyLoginError();
    });
  });
});