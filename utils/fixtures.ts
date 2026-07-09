import { test as base } from '@playwright/test';
import { handleConsentPopup } from '../utils/helpers';

export const test = base.extend({
  page: async ({ page }, use) => {
    await use(page);
    
    // Pop-up handle after every page
    await handleConsentPopup(page);

  },
});

export { expect } from '@playwright/test';

