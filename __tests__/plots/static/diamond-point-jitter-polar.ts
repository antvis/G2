import * as d3 from '@antv/vendor/d3-random';
import { G2Spec } from '../../../src';

export function diamondPointJitterPolar(): G2Spec {
  const random = d3.randomUniform.source(d3.randomLcg(42))(0, 1);
  return {
    type: 'point',
    data: {
      type: 'fetch',
      value: 'data/diamond.csv',
    },
    coordinate: { type: 'polar' },
    transform: [{ type: 'jitter', random }],
    legend: { color: false },
    encode: {
      x: 'clarity',
      color: 'clarity',
      shape: 'point',
    },
    viewStyle: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
  };
}
