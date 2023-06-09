import { deepMix } from '@antv/util';
import { G2Spec } from '../../../src';
import { Pie } from './population2015-interval-hom-view-level';

export function SpectralPie(options) {
  return deepMix(options, {
    scale: { color: { palette: 'spectral', offset: (t) => t * 0.8 + 0.1 } },
    type: Pie,
  });
}

export function population2015IntervalHOMNested(): G2Spec {
  return {
    type: SpectralPie,
    data: {
      type: 'fetch',
      value: 'data/population2015.csv',
    },
    legend: false,
    // @ts-ignore
    encode: { value: 'value', color: 'name' },
    style: { stroke: 'white' },
  };
}
