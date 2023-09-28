import { G2Spec } from '../../../src';
import { Auto } from '../../../src/mark/auto';

export function AutoMark(): G2Spec {
  return {
    type: Auto,
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
  };
}
