import { G2Spec } from '../../../src';

export function indicesLineChartScaleRelations(): G2Spec {
  return {
    type: 'line',
    data: {
      type: 'fetch',
      value: 'data/indices.csv',
    },
    transforms: [
      {
        type: 'normalizeY',
        basis: 'first',
        groupBy: 'color',
      },
    ],
    encode: {
      x: (d) => new Date(d.Date),
      y: 'Close',
      color: 'Symbol',
    },
    scale: {
      y: { type: 'log' },
      color: {
        relations: [['AMZN', '#ff0000']],
      },
    },
    axis: {
      y: { title: '↑ Change in price (%)' },
    },
    label: {
      text: 'Symbol',
      selector: 'last',
      fontSize: 10,
    },
  };
}

indicesLineChartScaleRelations.maxError = 100;
