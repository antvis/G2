import { DisplayObject, CanvasEvent } from '@antv/g';
import { Coordinate } from '@antv/coord';
import {
  Shape,
  CoordinateTransform,
  Primitive,
  G2Theme,
} from '../../../src/runtime';
import { Light } from '../../../src/theme';
import { Cartesian } from '../../../src/coordinate';
import { Vector2 } from '../../../src/utils/vector';
import { Canvas } from '../../utils/canvas';

type Options = {
  shape: Shape;
  vectors: Vector2[];
  container: HTMLElement;
  value?: Record<string, Primitive>;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  transform?: CoordinateTransform[];
  theme?: G2Theme;
};

export function draw({
  shape: shapeFunction,
  container,
  vectors,
  value = {},
  x = 0,
  y = 0,
  width = 600,
  height = 400,
  transform = [],
  theme = Light({}),
}: Options): Promise<DisplayObject> {
  const coordinate = new Coordinate({
    x,
    y,
    width,
    height,
    transformations: [...transform.flat(), Cartesian()[0]],
  });

  const points = vectors.map((d) => coordinate.map(d)) as Vector2[];
  const shape = shapeFunction(points, value, coordinate, theme);

  const canvas = Canvas(width, height, container);
  return new Promise((resolve) => {
    canvas.addEventListener(CanvasEvent.READY, () => {
      canvas.appendChild(shape);
      resolve(shape);
    });
  });
}

export function style(
  shape: DisplayObject,
  attributes: string[],
): Record<string, Primitive> {
  return attributes.reduce(
    (obj, key) => ((obj[key] = shape.style[key]), obj),
    {},
  );
}
