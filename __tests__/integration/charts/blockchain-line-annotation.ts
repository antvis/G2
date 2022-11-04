import { G2Spec } from '../../../src';

export function blockChainLineAnnotation(): G2Spec {
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
        axis: { x: { labelAutoHide: 'greedy' } },
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
          x: (d) => new Date(d.date),
          y: 'value',
          text: (d) =>
            `${d.date}, 受比特币影响，blockchain 搜索热度达到峰值：${d.value}`,
        },
        style: {
          wordWrap: true,
          wordWrapWidth: 164,
          dx: -174,
          dy: 30,
          fill: '#2C3542',
          fillOpacity: 0.65,
          fontSize: 10,
          background: true,
          backgroundRadius: 2,
          connector: true,
          startMarker: true,
          startMarkerFill: '#2C3542',
          startMarkerFillOpacity: 0.65,
        },
      },
    ],
  };
}
