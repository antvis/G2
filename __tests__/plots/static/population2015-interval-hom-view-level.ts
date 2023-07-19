import { deepMix } from '@antv/util';
import { G2Spec } from '../../../src';

export function Pie(options) {
  const { encode = {}, ...rest } = options;
  const { value, ...restEncode } = encode;
  return deepMix(rest, {
    type: 'interval',
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta' },
    encode: {
      ...restEncode,
      y: value,
    },
  });
}

export function population2015IntervalHOMViewLevel(): G2Spec {
  return {
    type: 'view',
    children: [
      {
        type: Pie,
        data: {
          type: 'fetch',
          value: 'data/population2015.csv',
        },
        scale: { color: { palette: 'spectral', offset: (t) => t * 0.8 + 0.1 } },
        legend: false,
        // @ts-ignore
        encode: { value: 'value', color: 'name' },
        style: { stroke: 'white' },
      },
    ],
  };
}
