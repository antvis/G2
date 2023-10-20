import { test, expect } from '@playwright/test';
import * as chartTests from '../plots/static';
import { filterTests } from '../integration/utils/filterTests';

test.beforeEach(async ({ page }, testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 160000);
});

test.describe('Charts', () => {
  const tests = filterTests(chartTests, true);
  for (const [name, generateOptions] of tests) {
    const url = `/?name=static-${name}`;
    // @ts-ignore
    const { maxError = 1000 } = generateOptions;

    test(`[Canvas]: ${name}`, async ({ page, context }) => {
      let resolveReadyPromise: () => void;
      const readyPromise = new Promise((resolve) => {
        resolveReadyPromise = () => {
          resolve(this);
        };
      });

      await context.exposeFunction('screenshot', async () => {
        resolveReadyPromise();
      });

      await page.goto(url);
      await readyPromise;

      await expect(page.locator('canvas')).toHaveScreenshot(`${name}.png`, {
        // maxDiffPixels: maxError,
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
