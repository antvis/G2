import { G2Spec } from '../../../src';

export function AutoMark(): G2Spec {
  return {
    type: 'auto',
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
  };
}
