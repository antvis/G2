import * as fs from 'fs';
import * as tests from './charts';
import { renderCanvas, diff } from './canvas';
import { renderSVG } from './svg';

describe('integration', () => {
  for (const [name, generateOptions] of Object.entries(tests)) {
    it(`[Canvas]: ${name}`, async () => {
      let canvas;
      try {
        const tempCanvasPath = `${__dirname}/snapshots/_${name}.png`;
        const targetCanvasPath = `${__dirname}/snapshots/${name}.png`;
        const options = await generateOptions();
        canvas = await renderCanvas(options, tempCanvasPath);
        expect(diff(tempCanvasPath, targetCanvasPath)).toBe(0);
        fs.rmSync(tempCanvasPath);
      } finally {
        canvas.destroy();
      }
    });
  }

  for (const [name, generateOptions] of Object.entries(tests)) {
    it(`[SVG]: ${name}`, async () => {
      let canvas;
      let svg;
      try {
        const targetSVGPath = `${__dirname}/snapshots/${name}.svg`;
        const options = await generateOptions();
        [canvas, svg] = await renderSVG(options);
        const target = fs.readFileSync(targetSVGPath, {
          encoding: 'utf8',
          flag: 'r',
        });
        expect(target).toBe(svg);
      } catch {
        // Generate error svg to compare.
        const temSVGGPath = `${__dirname}/snapshots/_${name}.svg`;
        fs.writeFileSync(temSVGGPath, svg);
      } finally {
        canvas.destroy();
      }
    });
  }
});
