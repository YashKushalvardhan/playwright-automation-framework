// utils/fixtures.ts
import { test as base, expect } from '@playwright/test';
import { handleConsentPopup } from '../utils/helpers';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Har page load/navigation ke baad consent popup auto-handle
    page.on('load', async () => {
      await handleConsentPopup(page);
    });

    await use(page);
  },
});

export { expect };