import { randomUniform, randomLcg } from 'd3-random';
import { G2Spec } from '../../../src';

export function philosophyWordCloudCustom(): G2Spec {
  const random = randomUniform.source(randomLcg(42))(0, 1);
  return {
    type: 'wordCloud',
    layout: {
      padding: 4,
      spiral: 'rectangular',
      random,
    },
    data: {
      type: 'fetch',
      value: 'data/philosophyWord.json',
    },
    encode: {
      color: 'text',
    },
  };
}

philosophyWordCloudCustom.skip = true;
