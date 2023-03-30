import { G2Spec } from '../../../src';

export function progressBarCustom(): G2Spec {
  const target = 400;
  return {
    type: 'progress',
    data: {
      value: {
        target,
        current: 300,
      },
    },
    height: 100,
    style: {
      arc: false,
      backFill: '#aaa',
    },
    scale: {
      color: {
        domain: [100, 250, 300],
        range: ['#F4664A', '#FAAD14', 'green'],
      },
    },

    labels: [
      {
        text: 'y',
        style: {
          fill: (d) => (d.y === target ? 'transparent' : 'white'),
        },
      },
    ],
  };
}
