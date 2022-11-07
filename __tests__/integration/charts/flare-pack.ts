import { interpolateHcl } from 'd3-interpolate';
import { G2Spec } from '../../../src';
import data from '../data/flare.json';

export function flarePack(): G2Spec {
  return {
    type: 'pack',
    width: 800,
    height: 800,
    data: {
      value: data,
    },
    encode: {
      value: 'value',
    },
    scale: {
      color: {
        domain: [0, 5],
        range: ['hsl(152,80%,80%)', 'hsl(228,30%,40%)'],
        interpolate: interpolateHcl,
      },
    },
  };
}
