import { setMockMeasureTextWidth } from '@antv/component';
import { Canvas, resetEntityCounter } from '@antv/g';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { Renderer } from '@antv/g-svg';
import { OffscreenCanvasContext, measureText } from './offscreenCanvasContext';

export function createNodeGCanvas(width: number, height: number): Canvas {
  resetEntityCounter();
  setMockMeasureTextWidth(measureText);

  const dom = document.createElement('div');
  const offscreenNodeCanvas = {
    getContext: () => context,
  } as unknown as HTMLCanvasElement;
  const context = new OffscreenCanvasContext(offscreenNodeCanvas);

  // Create a renderer, unregister plugin relative to DOM.
  const renderer = new Renderer();
  // Remove html plugin to ssr.
  const htmlRendererPlugin = renderer.getPlugin('html-renderer');
  renderer.unregisterPlugin(htmlRendererPlugin);
  const domInteractionPlugin = renderer.getPlugin('dom-interaction');
  renderer.unregisterPlugin(domInteractionPlugin);
  renderer.registerPlugin(
    new DragAndDropPlugin({ dragstartDistanceThreshold: 10 }),
  );
  return new Canvas({
    container: dom,
    width,
    height,
    renderer,
    document: dom.ownerDocument,
    offscreenCanvas: offscreenNodeCanvas as any,
  });
}
