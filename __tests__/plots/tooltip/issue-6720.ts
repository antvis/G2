import { G2Spec } from '../../../src';
import { seriesTooltipSteps } from './utils';

export function issue6720(): G2Spec {
  return {
    width: 1000,
    height: 400,
    type: 'view',
    children: [
      {
        data: {
          type: 'fetch',
          value: 'data/gdp.csv',
        },
        transform: [
          {
            type: 'flexX',
            field: 'gdp',
          },
        ],
        encode: {
          x: 'country',
          y: 'value',
          color: 'country',
        },
        axis: {
          y: {
            labelFormatter: '~s',
          },
        },
        tooltip: {
          items: ['value', 'gdp'],
        },
        type: 'interval',
      },
    ],
  };
}

issue6720.steps = seriesTooltipSteps([250, 200], [350, 200], [450, 200]);
