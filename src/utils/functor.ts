import { DisplayObject } from '@antv/g';

export function attr<T extends DisplayObject>(
  key: string,
  value: any,
): (shape: T) => T {
  return (shape) => {
    if (value === undefined) return shape;
    shape.style[key] = value;
    return shape;
  };
}
