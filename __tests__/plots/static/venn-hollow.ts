import { G2Spec } from '../../../src';

export function vennHollow(): G2Spec {
  return {
    type: 'view',
    width: 640,
    height: 480,
    children: [
      {
        type: 'path',
        data: {
          type: 'inline',
          value: [
            { sets: ['A'], value: 12, label: 'A' },
            { sets: ['B'], value: 12, label: 'B' },
            { sets: ['C'], value: 12, label: 'C' },
            { sets: ['A', 'B'], value: 2, label: 'A&B' },
            { sets: ['A', 'C'], value: 2, label: 'A&C' },
            { sets: ['B', 'C'], value: 2, label: 'B&C' },
            { sets: ['A', 'B', 'C'], value: 1 },
          ],
          transform: [
            {
              type: 'venn',
              size: 'value',
              padding: 10,
            },
          ],
        },
        encode: {
          d: 'path',
          color: 'key',
          shape: 'hollow',
        },
        style: {
          fillOpacity: 0.8,
          lineWidth: 6,
        },
        labels: [
          {
            text: 'key',
            position: 'inside',
            formatter: (_, datum) => `${datum.key}: ${datum.size}`,
            fill: '#000',
          },
        ],
      },
    ],
  };
}
