import { G2Spec } from '../../../src';
import { browser } from '../../data/browser';

export function browserImageTrending(): G2Spec {
  return {
    type: 'view',
    data: browser,
    children: [
      {
        type: 'link',
        encode: {
          x: ['name', 'name'],
          y: (d) => [0, d.value],
        },
        style: {
          opacity: 0.5,
          stroke: '#dfdfdf',
          lineDash: [2, 2],
        },
      },
      {
        type: 'line',
        encode: {
          x: 'name',
          y: 'value',
          shape: 'smooth',
        },
        scale: {
          y: { domain: [0, 50] },
        },
        style: {
          opacity: 0.5,
        },
      },
      {
        type: 'image',
        encode: {
          x: 'name',
          y: 'value',
          src: 'url',
        },
      },
    ],
  };
}
