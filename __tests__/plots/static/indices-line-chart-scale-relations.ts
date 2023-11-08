import { G2Spec } from '../../../src';

export function indicesLineChartScaleRelations(): G2Spec {
  return {
    type: 'line',
    insetRight: 20,
    data: {
      type: 'fetch',
      value: 'data/indices.csv',
    },
    transform: [
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
    labels: [
      {
        text: 'Symbol',
        selector: 'last',
        style: {
          fontSize: 10,
        },
      },
    ],
  };
}
