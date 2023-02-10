import { G2Spec } from '../../../src';

export function stateAgesPointDotPlot(): G2Spec {
  return {
    type: 'view',
    width: 800,
    height: 1200,
    coordinate: { transform: [{ type: 'transpose' }] },
    data: {
      type: 'fetch',
      value: 'data/stateage-percentage.csv',
    },
    scale: {
      color: { palette: 'spectral' },
    },
    axis: {
      y: { labelFormatter: '.0%' },
    },
    children: [
      {
        type: 'link',
        transform: [{ type: 'groupX', y: 'min', y1: 'max' }],
        encode: {
          x: 'state',
          y: 'population',
        },
        style: {
          stroke: '#000',
        },
      },
      {
        type: 'point',
        encode: {
          x: 'state',
          y: 'population',
          color: 'age',
          shape: 'point',
        },
      },
    ],
  };
}
