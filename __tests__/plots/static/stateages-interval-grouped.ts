import { G2Spec } from '../../../src';

export function stateAgesIntervalGrouped(): G2Spec {
  return {
    type: 'interval',
    title: {
      title: 'Population by age and state',
      subtitle: 'It shows the population of U.S. by age and state.',
    },
    data: {
      type: 'fetch',
      value: 'data/stateages.csv',
    },
    transform: [
      { type: 'sortX', by: 'y', reverse: true, reducer: 'sum', slice: 6 },
      { type: 'dodgeX' },
    ],
    scale: { y: { nice: true } },
    axis: { y: { labelFormatter: '~s' } },
    encode: {
      x: 'state',
      y: 'population',
      color: 'age',
    },
    viewStyle: { viewFill: '#ccc', mainFill: '#eee' },
  };
}
