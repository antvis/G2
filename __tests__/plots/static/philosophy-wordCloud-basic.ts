import { randomUniform, randomLcg } from 'd3-random';
import { G2Spec } from '../../../src';
import { Word } from '../../data/d3-cloud';

function wordDensity(text: Record<string, number>) {
  return Object.entries(text).map(([word, count]) => ({
    text: word,
    value: count,
  }));
}

export function philosophyWordCloudBasic(): G2Spec {
  return {
    type: 'text',
    data: {
      value: wordDensity(Word),
      transform: [
        {
          type: 'wordCloud',
          // padding: 4,
          spiral: 'rectangular',
          size: [640, 480],
          fontSize: [14, 50],
          rotate: 30,
        },
        {
          type: 'log',
        },
      ],
    },
    encode: {
      x: 'x',
      y: 'y',
      shape: 'tag',
      color: 'text',
      text: 'text',
      rotate: 'rotate',
      fontSize: 'size',
    },
    scale: {
      fontSize: { type: 'identity' },
      rotate: { type: 'identity' },
    },
    style: {
      textAlign: 'center',
      textBaseline: 'middle',
      fontFamily: (d) => d.fontFamily,
    },
    axis: false,
    legend: false,
  };
}
philosophyWordCloudBasic.skip = true;
