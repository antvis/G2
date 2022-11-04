import * as fs from 'fs';
import * as tests from './interactions';
import { fetch } from './fetch';
import { createGCanvas, writePNG, sleep, diff } from './canvas';
import { render } from '@/runtime';

// @ts-ignore
global.fetch = fetch;

describe('integration', () => {
  for (const [n, generateOptions] of Object.entries(tests)) {
    const name = n.replace(/[A-Z]/g, (d) => '-' + d.toLowerCase());

    // @ts-ignore
    if (!generateOptions.skip) {
      it(`[Interaction]: ${name}`, async () => {
        let canvas;
        let nodeCanvas;
        try {
          // Render chart.
          const options = await generateOptions();
          const { width = 640, height = 480 } = options;
          [canvas, nodeCanvas] = createGCanvas(width, height);
          await new Promise<void>((resolve) => {
            render(options, { canvas }, resolve);
          });
          await sleep(20);

          // Get steps.
          if (!generateOptions.steps) {
            throw new Error(`Missing steps for ${n}`);
          }
          const steps = generateOptions.steps({ canvas });

          // Mark sure has expected snapshot dir.
          const dir = `${__dirname}/snapshots/${name}`;
          if (!fs.existsSync(dir)) fs.mkdirSync(dir);

          for (let i = 0; i < steps.length; i++) {
            // Dispatch event and wait for the next tick and rerender.
            const { changeState, skip } = steps[i];
            changeState();
            await sleep(100);

            // If do not skip this state, asset it after dispatch the event.
            if (!skip) {
              const actualPath = `${dir}/step${i}-diff.png`;
              const expectedPath = `${dir}/step${i}.png`;
              if (!fs.existsSync(expectedPath)) {
                console.warn(`! generate ${name}-${i}`);
                await writePNG(nodeCanvas, expectedPath);
              } else {
                await writePNG(nodeCanvas, actualPath);
                //@ts-ignore
                const maxError = generateOptions.maxError || 0;
                expect(diff(actualPath, expectedPath)).toBeLessThanOrEqual(
                  maxError,
                );
                // Persevere the diff image if do not pass the test.
                fs.unlinkSync(actualPath);
              }
            }
          }
        } finally {
          if (canvas) canvas.destroy();
        }
      });
    }
  }

  afterAll(() => {
    // @ts-ignore
    delete global.fetch;
  });
});
