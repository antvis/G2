import { G2Spec } from '../../../src';

export function gdpIntervalFlexAutoPaddingRotate(): G2Spec {
  return {
    type: 'interval',
    width: 1000,
    data: {
      type: 'fetch',
      value: 'data/gdp.csv',
    },
    transform: [{ type: 'flexX', field: 'gdp' }],
    legend: { color: false },
    encode: {
      x: 'country',
      y: 'value',
      color: 'country',
    },
    axis: {
      x: {
        labelTransform: 'rotate(90)',
      },
    },
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
