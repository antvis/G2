import { G2Spec } from '../../../src';

export function mockLineZeroX(): G2Spec {
  return {
    type: 'line',
    data: [
      { date: '2-1', close: 1 },
      { date: '2-2', close: 10 },
      { date: '2-3', close: 0 },
      { date: '2-4', close: 0 },
      { date: '2-5', close: 12 },
    ],
    encode: { x: 'date', y: 'close' },
    style: { shape: 'smooth' },
  };
}
