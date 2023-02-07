import { Rect } from '@antv/g';
import { G2Spec } from '../../../src';

export function athletesRectBinItemMarker(): G2Spec {
  return {
    type: 'rect',
    data: {
      type: 'fetch',
      value: 'data/athletes.csv',
    },
    transform: [{ type: 'bin', opacity: 'count' }],
    encode: {
      x: 'weight',
      y: 'height',
      color: 'sex',
    },
    legend: {
      color: {
        itemMarker: 'square',
      },
    },
    style: {
      inset: 0.5,
    },
  };
}
