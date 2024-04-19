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
      x: { range: [0, 1] },
      y: { range: [0, 1] },
    },
    style: {
      fontFamily: (d) => d.fontFamily,
    },
    axis: false,
    legend: false,
  };
}

wordsWordCloudBasic.skip = true;
