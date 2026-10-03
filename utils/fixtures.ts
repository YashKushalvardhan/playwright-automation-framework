// utils/fixtures.ts
import { test as base, expect } from '@playwright/test';
import { handleConsentPopup } from '../utils/helpers';

export const test = base.extend({
  page: async ({ page }, use) => {
    // On every page after load/navigation consent popup auto-handle
    page.on('load', async () => {
      await handleConsentPopup(page);
    });

    await use(page);
  },
});

export { expect };