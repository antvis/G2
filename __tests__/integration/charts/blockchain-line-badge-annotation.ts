import { G2Spec } from '../../../src';

export function blockChainLineBadgeAnnotation(): G2Spec {
  return {
    type: 'view',
    height: 300,
    width: 640,
    data: {
      type: 'fetch',
      value: 'data/blockchain.json',
      transform: [
        {
          type: 'fold',
          fields: ['blockchain', 'nlp'],
          as: ['type', 'value'],
        },
      ],
    },
    children: [
      {
        type: 'line',
        axis: { x: { label: { autoHide: 'greedy', showLast: false } } },
        encode: {
          x: (d) => new Date(d.date),
          y: 'value',
          color: 'type',
        },
      },
      {
        type: 'text',
        data: {
          transform: [
            {
              type: 'filterBy',
              fields: [
                ['date', (d) => d === '2017-12-17'],
                ['value', (d) => d == 100],
              ],
            },
          ],
        },
        encode: {
          x: (d) => new Date(d.date),
          y: 'value',
          text: (d) => `${d.value}`,
          shape: 'badge',
        },
        style: {
          dy: -1,
          markerSize: 24,
          markerFill: '#6395FA',
          markerFillOpacity: 0.55,
        },
      },
    ],
  };
}
