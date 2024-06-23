import { DisplayObject, Shape } from '@antv/g';

const DEFAULT_ATTRIBUTE_VALUE = {
  opacity: 1,
  strokeOpacity: 1,
  fillOpacity: 1,
  lineWidth: 0,
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  r: 0,
  rx: 0,
  ry: 0,
  width: 0,
  height: 0,
};

export const GEOMETRY_ATTRIBUTES = {
  [Shape.CIRCLE]: ['cx', 'cy', 'r'],
  [Shape.ELLIPSE]: ['cx', 'cy', 'rx', 'ry'],
  [Shape.RECT]: ['x', 'y', 'width', 'height'],
  [Shape.IMAGE]: ['x', 'y', 'width', 'height'],
  [Shape.LINE]: ['x1', 'y1', 'x2', 'y2'],
  [Shape.POLYLINE]: ['points'],
  [Shape.POLYGON]: ['points'],
};

export function attributeOf(
  shape: DisplayObject,
  keys: string[],
  useDefaultValue = false,
) {
  const attribute = {};
  for (const key of keys) {
    const value = shape.style[key];
    if (value) {
      attribute[key] = value;
    } else if (useDefaultValue) {
      attribute[key] = DEFAULT_ATTRIBUTE_VALUE[key];
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
