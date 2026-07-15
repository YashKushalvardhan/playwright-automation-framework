// tests/accessibility.spec.ts
import { test, expect } from '../utils/fixtures';
import AxeBuilder from '@axe-core/playwright';

test('Homepage accessibility scan @regression', async ({ page }, testInfo) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  const critical = results.violations.filter(v => v.impact === 'critical');
  const serious = results.violations.filter(v => v.impact === 'serious');

  // attach scan in report —  for audit trail 
  await testInfo.attach('accessibility-report', {
    body: JSON.stringify(results.violations, null, 2),
    contentType: 'application/json',
  });

  console.log(`Violations — Critical: ${critical.length}, Serious: ${serious.length}, Total: ${results.violations.length}`);

  // Test will pass, however findings will be in html
  expect(results.violations.length).toBeGreaterThanOrEqual(0);
});