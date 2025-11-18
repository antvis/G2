import { G2Spec } from '../../../src';

export async function flarePartitionDefault(): Promise<G2Spec> {
  return {
    type: 'partition',
    width: 800,
    height: 600,
    data: {
      type: 'fetch',
      value: 'data/partition.json',
    },
    encode: {
      color: 'name',
      value: 'value',
    },
    scale: {
      color: {
        range: [
          'rgb(236, 160, 57)',
          'rgb(196, 68, 57)',
          'rgb(211, 180, 60)',
          'rgb(230, 67, 63)',
        ],
      },
    },
    labels: [
      {
        text: 'name',
        dx: 8,
        position: 'left',
        transform: [
          {
            type: 'overflowHide',
          },
        ],
      },
    ],
    style: {
      inset: 0.5,
    },
  };
}
