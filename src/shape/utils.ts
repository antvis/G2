import { DisplayObject } from '@antv/g';
import { Primitive } from '../runtime';

export function applyStyle<T extends DisplayObject>(
  shape: T,
  style: Record<string, Primitive>,
) {
  for (const [key, value] of Object.entries(style)) {
    attr(shape, key, value);
  }
  return shape;
}

export function attr<T extends DisplayObject>(
  shape: T,
  key: string,
  value: any,
): T {
  if (value === undefined) return shape;
  shape.style[key] = value;
  return shape;
}
