import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// CLI se env batana hoga: ENV=dev ya ENV=stage
const environment = process.env.ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, `.env.${environment}`) });
console.log(`🌍 Running on ENV: ${process.env.ENV_NAME} | Base URL: ${process.env.BASE_URL}`);

export default defineConfig({
  testDir: './tests',
  timeout: process.env.CI ? 60 * 1000 : 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true, // Parallel tests
  retries: 2,         // For Flaky tests 
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['list']],  // HTML report + console
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
projects: [
  { name: 'Google Chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },  // Local only
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },                            //For Docker/CI
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
],
});