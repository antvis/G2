import { G2Spec } from '../../../src';

export function irisPointShapesKeyframe(): G2Spec {
  const point = {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/iris.csv',
    },
    encode: {
      x: 'x',
      y: 'y',
      shape: 'category',
      color: 'category',
      size: 5,
    },
    scale: {
      shape: { range: ['point', 'plus', 'diamond'] },
    },
  };
  return {
    type: 'timingKeyframe',
    width: 800,
    children: [
      { ...point, width: 800 },
      { ...point, width: 600 },
    ],
  };
}

irisPointShapesKeyframe.intervals = [false, false, [333, 666]];
