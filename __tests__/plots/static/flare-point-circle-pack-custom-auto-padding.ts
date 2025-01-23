import { interpolateHcl } from '@antv/vendor/d3-interpolate';
import { G2Spec } from '../../../src';

export async function flarePointCirclePackCustomAutoPadding(): Promise<G2Spec> {
  return {
    type: 'view',
    width: 1000,
    height: 1000,
    style: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
    children: [
      {
        type: 'pack',
        layout: { padding: 5 },
        data: {
          type: 'fetch',
          value: 'data/flare.json',
        },
        encode: {
          value: 'value',
          color: 'depth',
        },
        legend: { color: false },
        scale: {
          color: {
            domain: [0, 5],
            range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
            interpolate: interpolateHcl,
          },
        },
        style: {
          labelText: (d) =>
            d.r >= 10 && d.height === 0 ? `${d.data.name}` : '',
        },
      },
    ],
  };
}
