import { DisplayObject } from '@antv/g';

// TODO: Add more attributes need to be transform.
// TODO: Opacity transform unexpectedly.
export function attributeOf(shape: DisplayObject, keys: string[]) {
  const attribute = {};
  for (const key of keys) {
    const value = shape.style[key];
    if (value) {
      attribute[key] = value;
    }
  }
  return attribute;
}

export const attributeKeys = [
  'fill',
  'stroke',
  'fillOpacity',
  'strokeOpacity',
  'opacity',
  'lineWidth',
];
