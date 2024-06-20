import { randomUniform, randomLcg } from 'd3-random';
import { G2Spec } from '../../../src';

export function philosophyWordCloudImage(): G2Spec {
  const random = randomUniform.source(randomLcg(42))(0, 1);
  return {
    type: 'wordCloud',
    layout: {
      imageMask: 'data/wordCloud.png',
      random,
      rotate: 0,
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

philosophyWordCloudImage.skip = true;
