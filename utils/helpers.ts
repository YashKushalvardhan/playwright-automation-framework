import { Page } from '@playwright/test';

export async function handleConsentPopup(page: Page) {
  try {
    console.log('🔍 Checking for consent popup...');

    // Exact selectors from the DOM
    const consentButton = page.locator("//button[@class='fc-button fc-cta-consent fc-primary-button']//p[text()='Consent']");
    
    // Alternative selectors (backup)
    const alternatives = [
      page.getByRole('button', { name: 'Consent' }),
      page.locator('button[aria-label="Consent"]'),
      page.locator("//div[@class='fc-footer-buttons']//p[text()='Consent']"),
      page.locator("//p[text()='Consent']")
    ];

 
    if (await consentButton.isVisible({ timeout: 8000 })) {
      await consentButton.click();
      console.log('✅ Consent popup handled successfully (Primary selector)');
      await page.waitForTimeout(1500);
      return true;
    }

    // Backup selectors
    for (const locator of alternatives) {
      if (await locator.isVisible({ timeout: 3000 })) {
        await locator.click();
        console.log('✅ Consent popup handled with alternative selector');
        await page.waitForTimeout(1500);
        return true;
      }
    }

    console.log('ℹ️ No consent popup found or already dismissed.');
    return false;

  } catch (error) {
    console.log('⚠️ Error handling consent popup:', error.message);
    return false;
  }
}

// utils/helpers.ts mein add karo
export async function maximizeWindow(page: Page) {
  await page.setViewportSize({ width: 1920, height: 1080 });
  
  await page.evaluate(() => {
    window.moveTo(0, 0);
    window.resizeTo(screen.availWidth, screen.availHeight);
    
    // Try fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  });
  
  console.log('✅ Browser window maximized');
}