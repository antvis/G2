import { Canvas as GCanvas, RendererPlugin } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { Plugin as DragAndDropPlugin } from '@antv/g-plugin-dragndrop';
import { RendererComponent as RC } from '../runtime';

export type CanvasOptions = {
  width?: number;
  height?: number;
  container?: string | HTMLElement;
  renderer?: CanvasRenderer;
  plugins?: RendererPlugin[];
};

/**
 * Returns a canvas renderer.
 */
export const Canvas: RC<CanvasOptions> = ({
  width,
  height,
  container,
  renderer = new CanvasRenderer(),
  plugins = [new DragAndDropPlugin()],
}) => {
  plugins.forEach((plugin) => {
    renderer.registerPlugin(plugin);
  });

  return new GCanvas({
    container,
    width,
    height,
    renderer,
  });
};

Canvas.props = {};
