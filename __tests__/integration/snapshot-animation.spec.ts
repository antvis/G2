import * as fs from 'fs';
import { G2Context, render } from '../../src';
import * as tests from './animations';
import { fetch } from './fetch';
import { createGCanvas, writePNG, sleep, diff } from './canvas';

// @ts-ignore
global.fetch = fetch;

describe('integration', () => {
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
      it(`[Animation]: ${name}`, async () => {
        let canvas;
        let nodeCanvas;
        try {
          // Get intervals.
          if (!generateOptions.intervals) {
            throw new Error(`Missing intervals for ${n}`);
          }

          // Mark sure has expected snapshot dir.
          const dir = `${__dirname}/snapshots/${name}`;
          if (!fs.existsSync(dir)) fs.mkdirSync(dir);

          // Asset interval
          const asset = async (i) => {
            const actualPath = `${dir}/interval${i}-diff.png`;
            const expectedPath = `${dir}/interval${i}.png`;
            if (!fs.existsSync(expectedPath)) {
              console.warn(`! generate ${name}-${i}`);
              await writePNG(nodeCanvas, expectedPath);
            } else {
              await writePNG(nodeCanvas, actualPath);

              //@ts-ignore
              const maxError = generateOptions.maxError || 0;
              diff(actualPath, expectedPath);
              expect(diff(actualPath, expectedPath)).toBeLessThanOrEqual(
                maxError,
              );

              // Persevere the diff image if do not pass the test.
              fs.unlinkSync(actualPath);
            }
          };

          const options = await generateOptions();
          const { width = 640, height = 480 } = options;
          [canvas, nodeCanvas] = createGCanvas(width, height);
          const context: G2Context = { canvas };

          let frameCount = 0;
          const { intervals: I } = generateOptions;

          // This callback will be called for every child of keyframe.
          const onframe = async () => {
            // Skip intervals, useful for the first frame of keyframe node.
            const intervals = I[frameCount] as number[];
            if (!intervals) {
              frameCount++;
              return;
            }

            // Asset the fist state of this keyframe.
            // @ts-ignore
            for (const animation of context.animations) animation.pause();
            await sleep(20);
            await asset(`${frameCount}-0`);

            // Asset the state of specified time of keyframe.
            for (let i = 0; i < intervals.length; i++) {
              // Wait this interval finishing.
              const interval = intervals[i];
              // @ts-ignore
              for (const animation of context.animations) {
                animation.currentTime = interval;
                await sleep(20);
              }
              await asset(`${frameCount}-${i + 1}`);
            }

            // Update frame count.
            frameCount++;
            // @ts-ignore
            for (const animation of context.animations) {
              animation.finish();
              await sleep(20);
            }
          };

          // Render chart and listen afterpaint event for every node.
          // eslint-disable-next-line no-async-promise-executor
          await new Promise<void>(async (resolve) => {
            const on = { afterpaint: [onframe] };
            // @ts-ignore
            const { children, ...rest } = options;
            const listenedOptions = {
              ...rest,
              ...(children && {
                children: children.map((d) => ({ ...d, on })),
              }),
              on,
            };
            render(listenedOptions, context, resolve);
          });

          // Asset the last state of this animation.
          frameCount--;
          const last = I[frameCount] as number[];
          if (last) {
            await sleep(20);
            await asset(`${frameCount}-${last.length + 1}`);
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
