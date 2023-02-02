import { createCanvas } from 'canvas';
import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';

export function createNodeGCanvas(width: number, height: number): Canvas {
  // Create a node-canvas instead of HTMLCanvasElement
  const nodeCanvas = createCanvas(width, height);
  // A standalone offscreen canvas for text metrics
  const offscreenNodeCanvas = createCanvas(1, 1);

  // Create a renderer, unregister plugin relative to DOM.
  const renderer = new Renderer();
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);
  renderer.registerPlugin(
    new DragAndDropPlugin({ dragstartDistanceThreshold: 10 }),
  );
  return new Canvas({
    width,
    height,
    canvas: nodeCanvas as any,
    renderer,
    offscreenCanvas: offscreenNodeCanvas as any,
  });
}
