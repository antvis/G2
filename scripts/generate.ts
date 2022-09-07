import * as fs from 'fs';
import * as tests from '../__tests__/integration/charts';
import { renderSVG } from '../__tests__/integration/svg';
import { renderCanvas } from '../__tests__/integration/canvas';

/**
 * Generate expected images for snapshot tests.
 */
async function generateGoldenImages() {
  for (const [name, generateOptions] of Object.entries(tests)) {
    const options = await generateOptions();

    // Canvas
    const targetCanvasPath = `${__dirname}/../__tests__/integration/snapshots/${name}.png`;
    const canvasCanvas = await renderCanvas(options, targetCanvasPath);
    canvasCanvas.destroy();

    // SVG
    const targetSVGPath = `${__dirname}/../__tests__/integration/snapshots/${name}.svg`;
    const [svgCanvas, svg] = await renderSVG(options);
    fs.writeFileSync(targetSVGPath, svg);
    svgCanvas.destroy();
  }
}

generateGoldenImages();
