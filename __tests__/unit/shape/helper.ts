import { DisplayObject } from '@antv/g';
import { Coordinate } from '@antv/coord';
import { Shape, CoordinateTransform, Primitive } from '../../../src/runtime';
import { Canvas } from '../../../src/renderer';
import { Cartesian } from '../../../src/coordinate';
import { Vector2 } from '../../../src/utils/vector';

type Options = {
  shape: Shape;
  vectors: Vector2[];
  container: string | HTMLElement;
  style?: Record<string, Primitive>;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  transform?: CoordinateTransform[];
};

export function draw({
  shape: shapeFunction,
  container,
  vectors,
  style = {},
  x = 0,
  y = 0,
  width = 600,
  height = 400,
  transform = [],
}: Options): DisplayObject {
  const coordinate = new Coordinate({
    x,
    y,
    width,
    height,
    transformations: [...transform.flat(), Cartesian()[0]],
  });

  const points = vectors.map((d) => coordinate.map(d)) as Vector2[];
  const shape = shapeFunction(points, style, coordinate);

  const canvas = Canvas({ width, height, container });
  canvas.appendChild(shape);

  return shape;
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
