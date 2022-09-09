import { Canvas as GCanvas } from '@antv/g';
import { Renderer as CanvasRenderer } from '@antv/g-canvas';

export function Canvas(
  width: number,
  height: number,
  container: HTMLElement,
): GCanvas {
  return new GCanvas({
    width,
    height,
    container,
    renderer: new CanvasRenderer(),
  });
}
