import { test, expect } from '../utils/fixtures';
import { LoginPage } from '../pages/LoginPage';
import { generateNewUser } from '../utils/testData';
import { maximizeWindow } from '../utils/helpers';

test.describe('API + UI Hybrid', () => {

  test('Create user via API, then login via UI @regression', async ({ page, request }) => {
    const newUser = generateNewUser();

    // Step 1: Create account via api
    const createResponse = await request.post('https://automationexercise.com/api/createAccount', {
      form: newUser,
    });
    expect(createResponse.ok()).toBeTruthy();

    const createBody = await createResponse.json();
    expect(createBody.responseCode).toBe(201);
    expect(createBody.message).toBe('User created!');

    // Step 2: Login via UI
    await maximizeWindow(page);
    const loginPage = new LoginPage(page);
    await loginPage.goto('/login');
    await loginPage.login(newUser.email, newUser.password);
    await loginPage.verifySuccessfulLogin();

    // Step 3: Cleanup - Delete account via api
    const deleteResponse = await request.delete('https://automationexercise.com/api/deleteAccount', {
      form: { email: newUser.email, password: newUser.password },
    });
    expect(deleteResponse.ok()).toBeTruthy();
  });
});