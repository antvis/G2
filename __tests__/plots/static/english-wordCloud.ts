import { randomUniform, randomLcg } from 'd3-random';
import { G2Spec } from '../../../src';
import { text } from '../../data/txt-wordCloud';

export function englishWordCloud(): G2Spec {
  const random = randomUniform.source(randomLcg(47))(0, 1);
  return {
    type: 'view',
    padding: 0,
    children: [
      {
        type: 'wordCloud',
        layout: {
          rotate: 0,
          random,
        },
        data: {
          value: text,
        },
      },
    ],
  };
}
englishWordCloud.skip = !process.env.CI;
