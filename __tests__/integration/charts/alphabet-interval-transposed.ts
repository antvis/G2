import { G2Spec } from '../../../src';

export function alphabetIntervalTransposed(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
    width: 800,
    height: 600,
    coordinate: [{ type: 'transpose' }],
    transform: [{ type: 'sortX', channel: 'y', reverse: true }],
    axis: { y: { tickFormatter: '.1%' } },
    encode: {
      x: 'letter',
      y: 'frequency',
      color: 'steelblue',
    },
    labels: [
      {
        text: 'frequency',
        textAnchor: (d) => (+d.frequency > 0.008 ? 'right' : 'start'),
        fill: (d) => (+d.frequency > 0.008 ? '#fff' : '#000'),
        dx: (d) => (+d.frequency > 0.008 ? '-5px' : '5px'),
        formatter: '.1%',
      },
    ],
  };
}
