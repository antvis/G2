import { G2Spec } from '../../../src';
import { browser } from '../../data/browser';

export function browserLineAreaTrending(): G2Spec {
  return {
    type: 'view',
    data: browser,
    children: [
      {
        type: 'line',
        encode: {
          x: 'name',
          y: 'value',
          shape: 'hv',
        },
        scale: {
          y: { domain: [0, 50] },
        },
        style: {
          opacity: 0.5,
        },
      },
      {
        type: 'area',
        encode: {
          x: 'name',
          y: 'value',
          shape: 'hv',
        },
        scale: {
          y: { domain: [0, 50] },
        },
        style: {
          opacity: 0.5,
        },
      },
    ],
  };
}
