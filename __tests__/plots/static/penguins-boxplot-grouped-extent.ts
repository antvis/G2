import { G2Spec } from '../../../src';

export function penguinsBoxPlotGroupedExtent(): G2Spec {
  return {
    type: 'boxplot',
    data: {
      type: 'fetch',
      value: 'data/penguins.csv',
    },
    encode: {
      x: 'species',
      y: 'culmen_length_mm',
      series: 'sex',
    },
    style: {
      point: false,
    },
  };
}
