import { chromium, devices } from 'playwright';
import { chartRender as render } from '../plots/api/chart-render';
import './utils/useSnapshotMatchers';

describe('chart.render', () => {
  it('chart.render() should render expected chart', async () => {
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
    const buffer = await page.locator('canvas').screenshot();

    const dir = `${__dirname}/snapshots/api`;
    await expect(buffer).toMatchCanvasSnapshot(dir, render.name, {
      // @ts-ignore
      maxError: render.maxError || 0,
    });

    await context.close();
    await browser.close();
  });
});
