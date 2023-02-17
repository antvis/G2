import { G2Spec } from '../../../src';
import { Pie } from './population2015-interval-hom-view-level';

export function population2015IntervalHOMMarkLevel(): G2Spec {
  return {
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
  };
}
