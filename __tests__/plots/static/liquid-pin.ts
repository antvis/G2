import { G2Spec } from '../../../src';

export function liquidPin(): G2Spec {
  return {
    type: 'liquid',
    data: {
      value: {
        percent: 0.7,
      },
    },
    style: {
      shape: 'pin',
      textStyle: {
        fill: '#fff',
      },
      outline: {
        border: 4,
        distance: 8,
      },
      wave: {
        length: 128,
      },
    },
  };
}
