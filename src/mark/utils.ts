import { Band } from '@antv/scale';
import { Primitive } from 'd3-array';
import { Scale } from '../runtime/types/component';
import { Channel } from '../runtime';

export type ChannelOptions = {
  shapes?: string[];
};

export function baseChannels(options: ChannelOptions = {}): Channel[] {
  const { shapes } = options;
  return [
    { name: 'color' },
    { name: 'opacity' },
    { name: 'shape', range: shapes },
    { name: 'enterType' },
    { name: 'enterDelay', scaleName: 'enter' },
    { name: 'enterDuration', scaleName: 'enter' },
    { name: 'enterEasing' },
    { name: 'key', scale: 'identity' },
    { name: 'groupKey', scale: 'identity' },
    { name: 'label', scale: 'identity' },
  ];
}

export function baseGeometryChannels(options: ChannelOptions = {}): Channel[] {
  return [
    ...baseChannels(options),
    { name: 'title', scale: 'identity' },
    { name: 'tooltip', scale: 'identity', independent: true },
  ];
}

export function baseAnnotationChannels(
  options: ChannelOptions = {},
): Channel[] {
  return baseChannels(options);
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
  const { x: X, y: Y, series: S } = value;
  const { x, y, series } = scale;
  const {
    style: {
      bandOffset = series ? 0 : 0.5,
      bandOffsetX = bandOffset,
      bandOffsetY = bandOffset,
    } = {},
  } = options;
  const isBandX = !!x?.getBandWidth;
  const isBandY = !!y?.getBandWidth;
  const isSeries = !!series?.getBandWidth;
  if (!isBandX && !isBandY) return (d) => d;
  return (d, i) => {
    const widthX = isBandX ? bandWidth(x as Band, X[i]) : 0;
    const widthY = isBandY ? bandWidth(y as Band, Y[i]) : 0;
    const f = () => (bandWidth(series as Band, S[i]) / 2 + +S[i]) * widthX;
    const offset = isSeries && S ? f() : 0;
    const [x0, y0] = d;
    return [x0 + bandOffsetX * widthX + offset, y0 + bandOffsetY * widthY];
  };
}
