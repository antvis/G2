import { Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { RendererComponent as RC } from '../runtime';

export type CanvasOptions = {
  width?: number;
  height?: number;
  container?: string | HTMLElement;
};

/**
 * Returns a canvas renderer.
 */
export const Canvas: RC<CanvasOptions> = ({ width, height, container }) => {
  const renderer = new CanvasRenderer();
  renderer.registerPlugin(new DragAndDropPlugin());

  return new GCanvas({
    container,
    width,
    height,
    renderer,
  });
};

Canvas.props = {};
