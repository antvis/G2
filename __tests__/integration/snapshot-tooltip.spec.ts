import * as fs from 'fs';
import throat from 'throat';
import xmlserializer from 'xmlserializer';
import { format } from 'prettier';
import { render } from '../../src';
import * as tests from './tooltips';
import { sleep, createGCanvas } from './svg';
import { fetch } from './fetch';

// @ts-ignore
global.fetch = fetch;
const lock = throat(4);

describe('Tooltips', () => {
  // Filter tests with only.
  const onlyTests = Object.entries(tests).filter(
    // @ts-ignore
    ([, { only = false }]) => only,
  );
  const finalTests =
    onlyTests.length === 0 ? tests : Object.fromEntries(onlyTests);

  for (const [n, generateOptions] of Object.entries(finalTests)) {
    const name = `tooltip-${n}`;
    // @ts-ignore
    if (!generateOptions.skip) {
      // Skip SVG snapshot tests as the DOM structure is not stable now.
      // Run Canvas snapshot tests to make render plot as expected.
      it(`[Tooltip]: ${name}`, async () => {
        const options = await generateOptions();
        const { width = 640, height = 480 } = options;
        // @ts-ignore
        const [canvas, container] = lock(
          async () => await createGCanvas(width, height),
        );
        // setContainer(options, container);
        await new Promise<void>((resolve) => {
          render(options, { canvas }, resolve);
        });
        await sleep(20);

        // Get steps.
        // @ts-ignore
        if (!generateOptions.steps) {
          throw new Error(`Missing steps for ${name}`);
        }
        // @ts-ignore
        const steps = generateOptions.steps({ canvas });

        // Mark sure has expected snapshot dir.
        const dir = `${__dirname}/snapshots/${name}`;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        for (let i = 0; i < steps.length; i++) {
          let actual;
          try {
            // Dispatch event and wait for the next tick and rerender.
            // @ts-ignore
            const { changeState, skip } = steps[i];
            await changeState();
            await sleep(100);

            // If do not skip this state, asset it after dispatch the event.
            const tooltip = container.getElementsByClassName('tooltip')[0];
            if (!skip && tooltip) {
              const expectedPath = `${dir}/step${i}.html`;
              actual = format(xmlserializer.serializeToString(tooltip), {
                parser: 'babel',
              });
              if (!fs.existsSync(expectedPath)) {
                console.warn(`! generate ${name}-${i}`);
                await fs.writeFileSync(expectedPath, actual);
              } else {
                const expected = fs.readFileSync(expectedPath, {
                  encoding: 'utf8',
                  flag: 'r',
                });
                expect(actual).toBe(expected);
              }
            }
          } catch (error) {
            // Generate error svg to compare.
            console.warn(`! generate ${name}`);
            const actualPath = `${dir}/step${i}-actual.html`;
            if (actual) fs.writeFileSync(actualPath, actual);
            throw error;
          }
        }
      });
    }
  }

  afterAll(() => {
    // @ts-ignore
    delete global.fetch;
  });
});
