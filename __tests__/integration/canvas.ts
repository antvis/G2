import * as fs from 'fs';
import { PNG } from 'pngjs';
import { createCanvas } from 'canvas';
import pixelmatch from 'pixelmatch';
import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { render, G2Spec } from '../../src';

export async function renderCanvas(
  options: G2Spec,
  filename: string,
  defaultWidth = 640,
  defaultHeight = 480,
) {
  const { width = defaultWidth, height = defaultHeight } = options;
  const [canvas, nodeCanvas] = createGCanvas(width, height);
  await new Promise<void>((resolve) => {
    render(options, { canvas }, resolve);
  });
  // Wait for the next tick.
  await sleep(20);
  await writePNG(nodeCanvas, filename);
  return canvas;
}

/**
 * diff between PNGs
 */
export function diff(src: string, target: string, showMismatchedPixels = true) {
  const img1 = PNG.sync.read(fs.readFileSync(src));
  const img2 = PNG.sync.read(fs.readFileSync(target));
  const { width, height } = img1;

  let diffPNG: PNG | null = null;
  let output: Buffer | null = null;
  if (showMismatchedPixels) {
    diffPNG = new PNG({ width, height });
    output = diffPNG.data;
  }

  // @see https://github.com/mapbox/pixelmatch#pixelmatchimg1-img2-output-width-height-options
  const mismatch = pixelmatch(img1.data, img2.data, output, width, height, {
    threshold: 0.1,
  });

  if (showMismatchedPixels && mismatch && diffPNG) {
    fs.writeFileSync(`${target}.diff.png`, PNG.sync.write(diffPNG));
  }

  return mismatch;
}

export function createGCanvas(width: number, height: number) {
  // Create a node-canvas instead of HTMLCanvasElement
  const nodeCanvas = createCanvas(width, height);
  // A standalone offscreen canvas for text metrics
  const offscreenNodeCanvas = createCanvas(1, 1);

  // Create a renderer, unregister plugin relative to DOM.
  const renderer = new Renderer();
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);

  return [
    new Canvas({
      width,
      height,
      canvas: nodeCanvas as any,
      renderer,
      offscreenCanvas: offscreenNodeCanvas as any,
    }),
    nodeCanvas,
  ] as const;
}

export function sleep(n: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, n);
  });
}

export function writePNG(nodeCanvas, path) {
  return new Promise<void>((resolve, reject) => {
    const out = fs.createWriteStream(path);
    const stream = nodeCanvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', resolve).on('error', reject);
  });
}
