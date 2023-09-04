import { G2Spec } from '../../../src';

export function liquidDefault(): G2Spec {
  return {
    type: 'liquid',
    autoFit: true,
    data: { value: { percent: 0.3 } },
    style: { outline: { border: 4, distance: 8 }, wave: { length: 128 } },
  };
}
