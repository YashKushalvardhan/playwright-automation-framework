import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,           // Parallel tests
  retries: 2,                    // For Flaky tests 
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']], // HTML report + console
  use: {
    baseURL: 'https://automationexercise.com/',  // Demo site
    trace: 'on-first-retry',       // Debugging
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'Google Chrome', use: { ...devices['Desktop Chrome'] , channel: 'chrome'} },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  ],
});

