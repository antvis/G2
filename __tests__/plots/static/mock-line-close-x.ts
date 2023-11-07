import { G2Spec } from '../../../src';

export function mockLineCloseX(): G2Spec {
  return {
    type: 'line',
    data: [
      { x: 0, y: 0 },
      { x: 0.02, y: 0.8 },
      { x: 1, y: 1 },
    ],
    encode: { x: 'x', y: 'y' },
    style: { shape: 'smooth' },
  };
}
