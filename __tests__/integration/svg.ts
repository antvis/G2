import xmlserializer from 'xmlserializer';
import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-svg';
import { createCanvas } from 'canvas';
import { G2Spec, render } from '../../src';
import { JSDOM } from './jsdom';

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
  await sleep(100);
  const svg = xmlserializer.serializeToString(
    //@ts-ignore
    dom.window.document.getElementById('container').children[0],
  );
  return [canvas, svg] as const;
}

function createGCanvas(width: number, height: number) {
  const dom = new JSDOM(`
  <div id="container">
  </div>
  `);
  // @ts-ignore
  global.window = dom.window;
  // @ts-ignore
  global.document = dom.window.document;

  // A standalone offscreen canvas for text metrics
  const offscreenNodeCanvas = createCanvas(1, 1);

  // Create a renderer, unregister plugin relative to DOM.
  const renderer = new Renderer();
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);

  return [
    new Canvas({
      container: 'container',
      width,
      height,
      renderer,
      // @ts-ignore
      document: dom.window.document,
      offscreenCanvas: offscreenNodeCanvas as any,
      requestAnimationFrame: dom.window.requestAnimationFrame,
      cancelAnimationFrame: dom.window.cancelAnimationFrame,
    }),
    dom,
  ] as const;
}

export function sleep(n: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, n);
  });
}
