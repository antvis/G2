import { Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';
import { RendererComponent as RC } from '../runtime';

export type CanvasOptions = {
  width?: number;
  height?: number;
  container?: string | HTMLElement;
};

export const Canvas: RC<CanvasOptions> = ({ width, height, container }) => {
  return new GCanvas({
    container,
    width,
    height,
    renderer: new CanvasRenderer(),
  });
};

Canvas.props = {};
