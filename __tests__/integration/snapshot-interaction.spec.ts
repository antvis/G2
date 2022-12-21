import * as fs from 'fs';
import { G2Spec, render } from '../../src';
import * as tests from './interactions';
import { fetch } from './fetch';
import { createGCanvas, writePNG, sleep, diff } from './canvas';

// @ts-ignore
global.fetch = fetch;

function closeAnimation(options): G2Spec {
  const { children } = options;
  if (!children) return { ...options, animate: false };
  const newChildren = children.map((d) => ({ ...d, animate: false }));
  return {
    ...options,
    children: newChildren,
  };
}

describe('Interactions', () => {
  // Filter tests with only.
  const onlyTests = Object.entries(tests).filter(
    // @ts-ignore
    ([, { only = false }]) => only,
  );
  const finalTests =
    onlyTests.length === 0 ? tests : Object.fromEntries(onlyTests);

  for (const [n, generateOptions] of Object.entries(finalTests)) {
    const name = n.replace(/[A-Z]/g, (d) => '-' + d.toLowerCase());

    // @ts-ignore
    if (!generateOptions.skip) {
      it(`[Interaction]: ${name}`, async () => {
        let canvas;
        let nodeCanvas;
        try {
          // Render chart.
          const raw = await generateOptions();

          // Close the animation duration test for interaction,
          // make than there is no need to wait for the animation finished
          // before take snapshots.
          // @ts-ignore
          const options = generateOptions.animate ? raw : closeAnimation(raw);
          const { width = 640, height = 480 } = options;
          [canvas, nodeCanvas] = createGCanvas(width, height);
          await new Promise<void>((resolve) => {
            render(options, { canvas }, resolve);
          });
          await sleep(20);

          // Get steps.
          // @ts-ignore
          if (!generateOptions.steps) {
            throw new Error(`Missing steps for ${n}`);
          }
          // @ts-ignore
          const steps = generateOptions.steps({ canvas });

          // Mark sure has expected snapshot dir.
          const dir = `${__dirname}/snapshots/${name}`;
          if (!fs.existsSync(dir)) fs.mkdirSync(dir);

          for (let i = 0; i < steps.length; i++) {
            // Dispatch event and wait for the next tick and rerender.
            // @ts-ignore
            const { changeState, skip } = steps[i];
            await changeState();
            await sleep(100);

            // If do not skip this state, asset it after dispatch the event.
            if (!skip) {
              const actualPath = `${dir}/step${i}-actual.png`;
              const expectedPath = `${dir}/step${i}.png`;
              const diffPath = `${dir}/step${i}-diff.png`;
              if (!fs.existsSync(expectedPath)) {
                console.warn(`! generate ${name}-${i}`);
                await writePNG(nodeCanvas, expectedPath);
              } else {
                await writePNG(nodeCanvas, actualPath);
                //@ts-ignore
                const maxError = generateOptions.maxError || 0;
                expect(
                  diff(actualPath, expectedPath, diffPath, maxError),
                ).toBeLessThanOrEqual(maxError);
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
