import { G2Spec } from '../../../src';

export function flareElementPointMovePie(): G2Spec {
  return {
    type: 'interval',
    width: 600,
    height: 400,
    data: [
      { item: '事例一', count: 40, percent: 0.4 },
      { item: '事例二', count: 21, percent: 0.21 },
      { item: '事例三', count: 17, percent: 0.17 },
      { item: '事例四', count: 13, percent: 0.13 },
      { item: '事例五', count: 9, percent: 0.09 },
    ],
    encode: { y: 'count', color: 'item', key: 'item' },
    transform: [{ type: 'stackY' }],
    coordinate: { type: 'theta', outerRadius: 0.8 },
    tooltip: {
      items: [
        (data) => ({
          name: data.item,
          value: `${data.percent * 100}%`,
        }),
      ],
    },
    interaction: {
      legendFilter: false,
      elementPointMove: {
        selection: [2],
        pathLineDash: [2, 4],
        pathStroke: '#fff',
        pathLineWidth: 2,
      },
    },
  };
}
