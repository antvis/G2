import { G2Spec } from '../../../src';

/**
 * @see https://canisjs.github.io/canis-editor/index.html?exmp=purchases_1
 */
export function doughnutPurchasesLinePathIn(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/doughnut-purchases.json',
    },
    children: [
      {
        type: 'line',
        encode: {
          x: 'year',
          y: 'count',
          color: 'year',
          enterDuration: 3000,
        },
        scale: { y: { zero: true, nice: true } },
        axis: { y: { labelFormatter: '~s' } },
        style: {
          shape: 'smooth',
          gradient: 'x',
          gradientColor: 'start',
        },
        animate: {
          enter: {
            type: 'pathIn',
            duration: 3000,
          },
        },
      },
      {
        type: 'point',
        transform: [{ type: 'stackEnter' }],
        encode: {
          x: 'year',
          y: 'count',
          color: 'year',
          enterDuration: 300,
          shape: 'point',
        },
      },
      {
        type: 'text',
        transform: [{ type: 'stackEnter' }],
        encode: {
          x: 'year',
          y: 'count',
          text: 'year',
          enterDuration: 300,
        },
        style: {
          lineWidth: 5,
          stroke: '#fff',
          textAlign: 'center',
          dy: -12,
        },
      },
    ],
  };
}

doughnutPurchasesLinePathIn.intervals = [[1500]];
