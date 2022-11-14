import { interpolateHcl } from 'd3-interpolate';
import { G2Spec } from '../../../src';

export async function flarePointCirclePackCustom(): Promise<G2Spec> {
  return {
    padding: 20,
    width: 1000,
    height: 1000,
    type: 'pack',
    data: {
      type: 'fetch',
      value: 'data/flare.json',
    },
    layout: { padding: 5 },
    encode: {
      value: 'value',
      color: 'depth',
    },
    scale: {
      color: {
        domain: [0, 5],
        range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
        interpolate: interpolateHcl,
      },
    },
    style: {
      labelText: (d) => (d.r >= 10 && d.height === 0 ? `${d.data.name}` : ''),
    },
  };
}
