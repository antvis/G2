import { Band } from '@antv/scale';
import { Primitive } from 'd3-array';
import { Scale } from '../runtime/types/component';
import { Channel } from '../runtime';

export function baseChannels(): Channel[] {
  return [
    { name: 'color' },
    { name: 'shape' },
    { name: 'enterType' },
    { name: 'enterDelay', scaleName: 'enter' },
    { name: 'enterDuration', scaleName: 'enter' },
    { name: 'enterEasing' },
    { name: 'key', scale: 'identity' },
    { name: 'groupKey', scale: 'identity' },
    { name: 'label', scale: 'identity' },
  ];
}

export function baseGeometryChannels(): Channel[] {
  return [
    ...baseChannels(),
    { name: 'title', scale: 'identity' },
    { name: 'tooltip', scale: 'identity', independent: true },
  ];
}

export function baseAnnotationChannels(): Channel[] {
  return baseChannels();
}

export function basePreInference() {
  return [];
}

export function basePostInference() {
  return [{ type: 'maybeKey' }];
}

export function bandWidth(scale: Band, x: any): number {
  return scale.getBandWidth(scale.invert(x));
}

export function createBandOffset(
  scale: Record<string, Scale>,
  value: Record<string, Primitive[]>,
  options: Record<string, any> = {},
): (d: [number, number], i?: number) => [number, number] {
  const { x: X, y: Y } = value;
  const { x, y } = scale;
  const {
    style: {
      bandOffset = 0.5,
      bandOffsetX = bandOffset,
      bandOffsetY = bandOffset,
    } = {},
  } = options;
  const isBandX = !!x?.getBandWidth;
  const isBandY = !!y?.getBandWidth;
  if (!isBandX && !isBandY) return (d) => d;
  return (d, i) => {
    const widthX = isBandX ? bandWidth(x as Band, X[i]) : 0;
    const widthY = isBandY ? bandWidth(y as Band, Y[i]) : 0;
    const [x0, y0] = d;
    return [x0 + bandOffsetX * widthX, y0 + bandOffsetY * widthY];
  };
}
