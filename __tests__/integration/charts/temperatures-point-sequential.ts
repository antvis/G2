import { G2Spec } from '../../../src';

function temperaturesPointSequential(): G2Spec {
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
            type: 'sequential',
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

// @todo Remove skip
// This test always fails duration CI.
temperaturesPointSequential.skip = true;

export { temperaturesPointSequential };
