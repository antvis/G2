import { chromium, devices } from 'playwright';
import * as chartTests from '../plots/tooltip';
import { kebabCase } from './utils/kebabCase';
import { filterTests } from './utils/filterTests';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';
import './utils/useCustomFetch';

describe('Tooltips', () => {
  const tests = filterTests(chartTests);
  for (const [name, generateOptions] of tests) {
    // @ts-ignore
    const { steps: S = [], className = 'g2-tooltip', skip } = generateOptions;
    if (skip) continue;
    it(`[Tooltip]: ${name}`, async () => {
      if (!S) {
        throw new Error(`Missing steps for ${name}`);
      }

      // Setup
      const browser = await chromium.launch({
        args: ['--headless', '--no-sandbox', '--use-angle=gl'],
      });
      const context = await browser.newContext(devices['Desktop Chrome']);
      const page = await context.newPage();

      // Disable all animations.
      await page.addInitScript(() => {
        window['DISABLE_ANIMATIONS'] = 1;
      });

      // Go to test page served by vite devServer.
      const url = `http://localhost:9090/?name=tooltip-${name}`;
      await page.goto(url);
      await sleep(300);

      const dir = `${__dirname}/snapshots/tooltip/${kebabCase(name)}`;

      const [func, ...steps] = S;
      for (let i = 0; i < steps.length; i++) {
        await page.evaluate(
          ([func, index]) => {
            // @ts-ignore
            window[func](index);
          },
          [func, steps[i]],
        );
        await sleep(300);

        const html = await page
          .locator(`.${className}`)
          .evaluate((el) => el.outerHTML);

        await expect(html).toMatchDOMSnapshot(dir, `step${i}`);
      }

      await context.close();
      await browser.close();
    });
  }
});
