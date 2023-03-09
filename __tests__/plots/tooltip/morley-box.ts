import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export function morleyBox(): G2Spec {
  const format = (d) => `${d / 1000}k`;
  return {
    type: 'view',
    children: [
      {
        type: 'boxplot',
        inset: 6,
        data: {
          type: 'fetch',
          value: 'data/morley.csv',
        },
        encode: {
          x: 'Expt',
          y: 'Speed',
        },
        style: {
          boxFill: '#aaa',
          pointStroke: '#000',
        },
        tooltip: {
          boxItems: [
            (d, i, D, V) => ({
              name: 'min',
              value: format(V.y.value[i as number]),
            }),
            (d, i, D, V) => ({
              name: 'q1',
              value: format(V.y1.value[i as number]),
            }),
            (d, i, D, V) => ({
              name: 'q2',
              value: format(V.y2.value[i as number]),
            }),
            (d, i, D, V) => ({
              name: 'q3',
              value: format(V.y3.value[i as number]),
            }),
            (d, i, D, V) => ({
              name: 'max',
              color: 'red',
              value: format(V.y4.value[i as number]),
            }),
          ],
        },
      },
    ],
  };
}

morleyBox.steps = tooltipSteps(0);
