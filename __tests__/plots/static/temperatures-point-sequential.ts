import { G2Spec } from '../../../src';

export function temperaturesPointSequential(): G2Spec {
  return {
    type: 'view',
    width: 800,
    children: [
      {
        type: 'point',
        data: {
          type: 'fetch',
          value: 'data/temperatures.csv',
        },
        scale: {
          color: {
            palette: 'rdBu',
            offset: (t) => 1 - t,
          },
        },
        encode: {
          x: 'date',
          y: 'value',
          color: 'value',
          shape: 'point',
        },
        legend: { color: false },
        style: {
          stroke: '#000',
          strokeOpacity: 0.2,
        },
      },
      {
        type: 'lineY',
        data: [0],
        style: {
          stroke: '#000',
          strokeOpacity: 0.2,
        },
      },
    ],
  };
}
