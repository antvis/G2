import xmlserializer from 'xmlserializer';
import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { createCanvas } from 'canvas';
import { G2Spec, render } from '../../src';

export async function renderSVG(
  options: G2Spec,
  defaultWidth = 640,
  defaultHeight = 480,
) {
  const { width = defaultWidth, height = defaultHeight } = options;
  const [canvas, dom] = createGCanvas(width, height);
  await new Promise<void>((resolve) => {
    render(options, { canvas }, resolve);
  });

  // Wait for the next tick.
  await sleep(20);

  const svg = xmlserializer.serializeToString(
    //@ts-ignore
    dom.window.document.getElementById('container').children[0],
  );

  // Remove id="app" to make sure the order of tests
  // do not affect test result.
  const pureSVG = svg.replace(/id="[^"]*"/g, '');
  return [canvas, pureSVG] as const;
}

export function createGCanvas(width: number, height: number) {
  // A standalone offscreen canvas for text metrics.
  const offscreenNodeCanvas = createCanvas(1, 1);

  // Create a renderer, unregister plugin relative to DOM.
  const renderer = new Renderer();
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);

  const container = document.createElement('div');

  return [
    new Canvas({
      container,
      width,
      height,
      renderer,
      offscreenCanvas: offscreenNodeCanvas as any,
    }),
    container,
  ] as const;
}

export function sleep(n: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, n);
  });
}
