// @ts-ignore
import { regressionQuad } from '@antv/vendor/d3-regression';
import { G2Spec } from '../../../src';
import { points } from '../../data/points';
import { seriesTooltipSteps } from './utils';

const regression = regressionQuad()
  .x((d) => d.x)
  // @ts-ignore
  .y((d) => d.y)
  .domain([-4, 4]);

export function pointsPointRegressionQuad(): G2Spec {
  return {
    type: 'view',
    data: points,
    scale: { x: { domain: [-4, 4] }, y: { domain: [-2, 14] } },
    axis: { x: { title: false }, y: { title: false } },
    children: [
      {
        type: 'point',
        encode: { x: 'x', y: 'y', shape: 'point' },
      },
      {
        type: 'line',
        data: { transform: [{ type: 'custom', callback: regression }] },
        encode: {
          x: (d) => d[0],
          y: (d) => d[1],
        },
        style: {
          stroke: '#30BF78',
          lineWidth: 2,
        },
        tooltip: false,
      },
      { type: 'lineX', data: [0] },
      { type: 'lineY', data: [0] },
    ],
  };
}

pointsPointRegressionQuad.steps = seriesTooltipSteps([100, 300]);
