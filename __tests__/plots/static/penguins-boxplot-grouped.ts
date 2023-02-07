import { G2Spec } from '../../../src';

export function penguinsBoxPlotGrouped(): G2Spec {
  return {
    type: 'boxplot',
    inset: 6,
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      x: 'species',
      color: 'sex',
      series: 'sex',
      y: 'flipper_length_mm',
    },
  };
}
