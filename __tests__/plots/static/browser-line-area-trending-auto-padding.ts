import { G2Spec } from '../../../src';
import { browser } from '../../data/browser';

export function browserLineAreaTrendingAutoPadding(): G2Spec {
  return {
    type: 'view',
    data: browser,
    style: {
      viewFill: '#4e79a7',
      plotFill: '#f28e2c',
      mainFill: '#e15759',
      contentFill: '#76b7b2',
    },
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
