import { chromium, devices } from 'playwright';
import * as chartTests from '../plots/static';
import { filterTests } from './utils/filterTests';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('Charts', () => {
  const tests = filterTests(chartTests);
  for (const [name, generateOptions] of tests) {
    // @ts-ignore
    const { maxError = 0, skip } = generateOptions;
    if (skip) continue;
    it(`[Canvas]: ${name}`, async () => {
      // Setup
      const browser = await chromium.launch({
        args: ['--headless', '--no-sandbox', '--use-angle=gl'],
      });
      const context = await browser.newContext(devices['Desktop Chrome']);
      const page = await context.newPage();

      // Ready to screenshot.
      let resolveReadyPromise: () => void;
      const readyPromise = new Promise((resolve) => {
        resolveReadyPromise = () => {
          resolve(this);
        };
      });
      await context.exposeFunction('screenshot', () => {
        resolveReadyPromise();
      });

      // Disable all animations.
      await page.addInitScript(() => {
        window['DISABLE_ANIMATIONS'] = 1;
      });

      // Go to test page served by vite devServer.
      const url = `http://localhost:9090/?name=static-${name}`;
      await page.goto(url);

      // Chart already rendered, capture into buffer.
      await readyPromise;
      const buffer = await page.locator('canvas').screenshot();

      const dir = `${__dirname}/snapshots/static`;
      await expect(buffer).toMatchCanvasSnapshot(dir, name, { maxError });

      await context.close();
      await browser.close();
    });
  }
});
