import { G2Spec } from '../../../src';

export function indicesLineChartScaleRelationsAutoPaddingRound(): G2Spec {
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
        fontSize: 10,
      },
    ],
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
