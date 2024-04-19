import { G2Spec } from '../../../src';
import { Word } from '../../data/d3-cloud';

export function wordsWordCloudBasic(): G2Spec {
  return {
    type: 'text',
    data: {
      value: Object.entries(Word).map(([word, count]) => ({
        text: word,
        value: count,
      })),
      transform: [
        {
          type: 'wordCloud',
          padding: 2,
          spiral: 'rectangular',
          size: [640, 480],
          fontSize: [14, 70],
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
      x: { domain: [0, 640], range: [0, 1] },
      y: { domain: [0, 480], range: [0, 1] },
    },
    style: {
      fontFamily: (d) => d.fontFamily,
    },
    axis: false,
    legend: false,
  };
}

wordsWordCloudBasic.skip = true;
