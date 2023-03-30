import { G2Spec } from '../../../src';

export function progressBar(): G2Spec {
  return {
    type: 'progress',
    data: {
      value: {
        percent: 0.8,
      },
    },
    style: {
      arc: false,
      foreFill: 'red',
    },
    height: 100,
  };
}
