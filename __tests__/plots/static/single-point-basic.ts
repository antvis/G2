import { G2Spec } from '../../../src';

export function singlePointBasic(): G2Spec {
  return {
    type: 'point',
    data: [
      {
        x: 156.2049208855,
        y: 140.7391648118,
        z: 124.9979274466,
      },
    ],
    encode: {
      x: 'x',
      y: 'y',
      size: 'z',
    },
  };
}

singlePointBasic.maxError = 100;
