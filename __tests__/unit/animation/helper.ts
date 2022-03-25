import { DisplayObject, Rect, Animation as GAnimation } from '@antv/g';
import { Coordinate } from '@antv/coord';
import { Animation, CoordinateTransform, G2Theme } from '../../../src/runtime';
import { Canvas } from '../../../src/renderer';
import { Cartesian } from '../../../src/coordinate';

type Options = {
  animate: Animation;
  container: string | HTMLElement;
  shape?: DisplayObject;
  transform?: CoordinateTransform[];
  x?: number;
  y?: number;
  height?: number;
  width?: number;
  style?: Record<string, any>;
  theme?: G2Theme;
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
  style = {},
  theme = {},
}: Options): Promise<[DisplayObject, GAnimation]> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      const coordinate = new Coordinate({
        x,
        y,
        width,
        height,
        transformations: [...transform.flat(), Cartesian()[0]],
      });
      const canvas = Canvas({ width, height, container });
      canvas.appendChild(shape);
      const animation = animate(shape, style, coordinate, theme);
      resolve([shape, animation]);
    });
  });
}

export function style(shape: DisplayObject, key: string): any {
  return shape.style[key];
}

export function timing(animation: GAnimation, key: string): any {
  return animation.effect.timing[key];
}

export function keyframes(animate: GAnimation, key: string): any {
  return animate.effect.normalizedKeyframes.map((d) => d[key]);
}
