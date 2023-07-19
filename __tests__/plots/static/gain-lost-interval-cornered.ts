import { G2Spec } from '../../../src';

export function gainLostIntervalCornered(): G2Spec {
  return {
    type: 'view',
    data: {
      type: 'fetch',
      value: 'data/gain-lost.json',
      transform: [
        {
          type: 'fold',
          fields: [
            'lost > 100$',
            'lost <= 100$',
            'gained <= 100$',
            'gained > 100$',
          ],
        },
      ],
    },
    children: [
      {
        type: 'interval',
        transform: [{ type: 'stackY' }],
        encode: {
          x: 'user',
          y: 'value',
          color: 'key',
        },
        scale: {
          x: { padding: 0.2 },
          y: { domainMin: -100, domainMax: 100 },
          color: {
            domain: [
              'lost > 100$',
              'lost <= 100$',
              'gained <= 100$',
              'gained > 100$',
            ],
            range: ['#e25c3b', '#f47560', '#97e3d5', '#61cdbb'],
          },
        },
        legend: {
          color: { title: false },
        },
        axis: {
          y: {
            position: 'right',
            title: false,
            labelFormatter: (v) => `${v}%`,
          },
        },
        labels: [
          {
            text: 'value',
            position: 'inside',
            formatter: (v) => (v ? `${v}%` : ''),
            transform: [{ type: 'overlapDodgeY' }],
            fill: '#000',
            fontSize: 10,
          },
        ],
        style: {
          radius: 10,
        },
      },
      {
        type: 'lineY',
        data: [0],
        style: {
          lineWidth: 2,
          stroke: '#e25c3d',
          strokeOpacity: 1,
        },
      },
      {
        type: 'text',
        style: {
          x: 0,
          y: '20%',
          text: 'gain',
          fontWeight: 'bold',
          dy: -10,
          transform: 'rotate(-90)',
          fill: '#61cdbb',
        },
      },
      {
        type: 'text',
        style: {
          x: 0,
          y: '70%',
          text: 'lost',
          fontWeight: 'bold',
          dy: -10,
          transform: 'rotate(-90)',
          fill: '#e25c3b',
        },
      },
    ],
  };
}
