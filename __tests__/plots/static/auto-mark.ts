import { Auto } from '@antv/g2-extension-ava';
import { G2Spec } from '../../../src';

export function AutoMark(): G2Spec {
  return {
    type: Auto,
    data: {
      type: 'fetch',
      value: 'data/alphabet.csv',
    },
  };
}
