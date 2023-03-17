import { G2Spec } from '../../../src';
import { tooltipStepsByMarkType } from './utils';

export function morleyBoxChannel(): G2Spec {
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
          boxTitle: { channel: 'y4' },
          boxItems: [
            { name: 'min', channel: 'y' },
            { name: 'q1', channel: 'y1' },
            { name: 'q2', channel: 'y2' },
            { name: 'q3', channel: 'y3' },
            { name: 'max', color: 'red', channel: 'y4' },
          ],
          pointTitle: { channel: 'y' },
          pointItems: [{ channel: 'x' }],
        },
      },
    ],
  };
}

morleyBoxChannel.steps = ({ canvas }) => {
  const box = tooltipStepsByMarkType('box', 0);
  const point = tooltipStepsByMarkType('point', 0);
  return [...box({ canvas }), ...point({ canvas })];
};
