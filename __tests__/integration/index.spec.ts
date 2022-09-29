import * as fs from 'fs';
import * as tests from './charts';
import { renderCanvas, diff } from './canvas';
import { renderSVG } from './svg';
import { fetch } from './fetch';

// @ts-ignore
global.fetch = fetch;

describe('integration', () => {
  for (const [name, generateOptions] of Object.entries(tests)) {
    // @ts-ignore
    if (!generateOptions.skip) {
      it(`[Canvas]: ${name}`, async () => {
        let canvas;
        try {
          const actualPath = `${__dirname}/snapshots/${name}-diff.png`;
          const expectedPath = `${__dirname}/snapshots/${name}.png`;
          const options = await generateOptions();

          // Generate golden png if not exists.
          if (!fs.existsSync(expectedPath)) {
            console.warn(`! generate ${name}`);
            canvas = await renderCanvas(options, expectedPath);
          } else {
            canvas = await renderCanvas(options, actualPath);
            expect(diff(actualPath, expectedPath)).toBe(0);

            // Persevere the diff image if do not pass the test.
            fs.unlinkSync(actualPath);
          }
        } finally {
          if (canvas) canvas.destroy();
        }
      });
    }
  }

  for (const [name, generateOptions] of Object.entries(tests)) {
    // @ts-ignore
    if (!generateOptions.skip) {
      it(`[SVG]: ${name}`, async () => {
        let canvas;
        let actual;
        try {
          const expectedPath = `${__dirname}/snapshots/${name}.svg`;
          const options = await generateOptions();
          [canvas, actual] = await renderSVG(options);

          // Generate golden svg if not exists.
          if (!fs.existsSync(expectedPath)) {
            console.warn(`! generate ${name}`);
            fs.writeFileSync(expectedPath, actual);
          } else {
            const expected = fs.readFileSync(expectedPath, {
              encoding: 'utf8',
              flag: 'r',
            });
            expect(expected).toBe(actual);
          }
        } catch (error) {
          // Generate error svg to compare.
          console.warn(`! generate ${name}`);
          const diffPath = `${__dirname}/snapshots/${name}-diff.svg`;
          fs.writeFileSync(diffPath, actual);
          throw error;
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
