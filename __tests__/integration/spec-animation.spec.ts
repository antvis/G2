import { chromium, devices } from 'playwright';
import * as chartTests from '../plots/animation';
import { filterTests } from './utils/filterTests';
import { kebabCase } from './utils/kebabCase';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('Animations', () => {
  const tests = filterTests(chartTests);
  for (const [name, generateOptions] of tests) {
    // @ts-ignore
    const { intervals: I, maxError = 0, skip } = generateOptions;
    if (!I) {
      throw new Error(`Missing intervals for ${name}`);
    }

    if (skip) continue;
    it(`[Animation]: ${name}`, async () => {
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

      // Go to test page served by vite devServer.
      const url = `http://localhost:8080/?name=animation-${name}`;
      await page.goto(url);

      // Chart already rendered, capture into buffer.
      await readyPromise;

      const dir = `${__dirname}/snapshots/animation/${kebabCase(name)}`;

      // Hang on at the first animation.
      await page.evaluate(() => {
        window['goto'](1);
        window['goto'](0);
      });

      for (let i = 0; i < I.length; i++) {
        const intervals = I[i] as number[];

        // First frame
        const buffer = await page.locator('canvas').screenshot();
        await expect(buffer).toMatchCanvasSnapshot(dir, `interval${i}-0`, {
          maxError,
        });

        for (let j = 0; j < intervals.length; j++) {
          const currentTime = intervals[j];
          await page.evaluate((currentTime) => {
            window['goto'](currentTime);
          }, currentTime);
          const buffer = await page.locator('canvas').screenshot();
          await expect(buffer).toMatchCanvasSnapshot(
            dir,
            `interval${i}-${j + 1}`,
            {
              maxError,
            },
          );

          if (j === intervals.length - 1) {
            await page.evaluate(() => {
              window['finish']();
            });
          }
        }

        // Last frame
        {
          const buffer = await page.locator('canvas').screenshot();
          await expect(buffer).toMatchCanvasSnapshot(
            dir,
            `interval${i}-${1 + intervals.length}`,
            {
              maxError,
            },
          );
        }
      }

      await context.close();
      await browser.close();
    });
  }
});
