import { interpolateHcl } from 'd3-interpolate';
import { G2Spec } from '../../../src';
import { tooltipSteps } from './utils';

export async function flarePointCirclePackCustom(): Promise<G2Spec> {
  return {
    type: 'view',
    width: 1000,
    height: 1000,
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

flarePointCirclePackCustom.steps = tooltipSteps(0);
