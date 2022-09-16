import { DisplayObject, Rect, IAnimation as GAnimation } from '@antv/g';
import { Coordinate } from '@antv/coord';
import { Animation, CoordinateTransform, G2Theme } from '../../../src/runtime';
import { Cartesian } from '../../../src/coordinate';
import { Canvas } from '../../utils/canvas';

type Options = {
  animate: Animation;
  container: HTMLElement;
  shape?: DisplayObject;
  transform?: CoordinateTransform[];
  x?: number;
  y?: number;
  height?: number;
  width?: number;
  value?: Record<string, any>;
  coordinate?: Coordinate;
  defaults?: G2Theme['enter' | 'exit' | 'enter'];
};

export function applyAnimation({
  animate,
  container,
  x = 0,
  y = 0,
  width = 600,
  height = 300,
  shape = new Rect({
    style: { x: 0, y: 0, width: 50, height: 200, fill: 'red' },
  }),
  transform = [],
  value = {},
  defaults = {},
}: Options): Promise<[DisplayObject, GAnimation | GAnimation[]]> {
  return new Promise((resolve) => {
    requestAnimationFrame(async () => {
      const coordinate = new Coordinate({
        x,
        y,
        width,
        height,
        transformations: [...transform.flat(), Cartesian()[0]],
      });
      const canvas = Canvas(width, height, container);
      await canvas.ready;

      canvas.appendChild(shape);
      resolve([shape, animate([shape], [], value, coordinate, defaults)]);
    });
  });
}

export function style(shape: DisplayObject, key: string): any {
  return shape.style[key];
}

export function timing(animation: GAnimation | GAnimation[], key: string): any {
  const a = Array.isArray(animation) ? animation[0] : animation;
  return a.effect.timing[key];
}

export function keyframes(
  animation: GAnimation | GAnimation[],
  key: string,
): any {
  const a = Array.isArray(animation) ? animation[0] : animation;
  return a.effect.normalizedKeyframes.map((d) => d[key]);
}
