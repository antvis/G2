import { chromium, devices } from 'playwright';
import { chartTooltipMultiChart as render } from '../plots/api/chart-tooltip-multi-chart';
import { sleep } from './utils/sleep';
import './utils/useSnapshotMatchers';

describe('chart.interaction.tooltip', () => {
  it('tooltip should not be shared if mount to body.', async () => {
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
    const url = `http://localhost:8080/?name=api-${render.name}`;
    await page.goto(url);

    // Chart already rendered, capture into buffer.
    await readyPromise;
    await sleep(1000);

    for (let i = 0; i < 2; i++) {
      // 2 Canvases.
      const buffer = await page.locator('canvas').nth(i).screenshot();

      const dir = `${__dirname}/snapshots/api`;
      await expect(buffer).toMatchCanvasSnapshot(dir, render.name + i, {
        // @ts-ignore
        maxError: render.maxError || 0,
      });
    }

    await context.close();
    await browser.close();

    // const { finished0, finished1 } = render({
    //   canvas1,
    //   canvas2,
    //   container: document.createElement('div'),
    // });
    // await Promise.all([finished0, finished1]);

    // dispatchFirstElementEvent(canvas1, 'pointerover');
    // dispatchFirstElementEvent(canvas2, 'pointerover');
    // expect(
    //   Array.from(document.body.getElementsByClassName('g2-tooltip')).length,
    // ).toBe(2);
  });
});
