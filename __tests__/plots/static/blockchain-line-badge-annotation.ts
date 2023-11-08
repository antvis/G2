import { G2Spec } from '../../../src';

export function blockChainLineBadgeAnnotation(): G2Spec {
  return {
    type: 'view',
    height: 300,
    width: 640,
    insetTop: 30,
    data: {
      type: 'fetch',
      value: 'data/blockchain.json',
      transform: [
        {
          type: 'fold',
          fields: ['blockchain', 'nlp'],
          key: 'type',
          value: 'value',
        },
      ],
    },
    children: [
      {
        type: 'line',
        axis: { x: { labelAutoHide: true } },
        encode: {
          x: (d) => new Date(d.date),
          y: 'value',
          color: 'type',
        },
      },
      {
        type: 'text',
        data: [new Date('2017-12-17'), 100],
        encode: {
          text: '100',
        },
        style: {
          dy: -1,
          shape: 'badge',
          markerSize: 24,
          markerFill: '#6395FA',
          markerFillOpacity: 0.55,
        },
      },
    ],
  };
}
