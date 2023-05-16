import { Renderer } from '@antv/g-svg';
import { createCanvas } from 'canvas';
import { Canvas } from '@antv/g';

export function createDOMGCanvas(width, height) {
  // A standalone offscreen canvas for text metrics.
  const offscreenNodeCanvas = createCanvas(1, 1);

  // Create a renderer, unregister plugin relative to DOM.
  const renderer = new Renderer();
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);
  const container = document.createElement('div');
  document.body.append(container);
  return new Canvas({
    container,
    width,
    height,
    renderer,
    offscreenCanvas: offscreenNodeCanvas as any,
  });
}
