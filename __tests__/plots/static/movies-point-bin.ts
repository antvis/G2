import { G2Spec } from '../../../src';

export function moviesPointBin(): G2Spec {
  return {
    type: 'point',
    width: 480,
    data: {
      type: 'fetch',
      value: 'data/movies.csv',
    },
    transform: [
      {
        type: 'bin',
        size: 'count',
        color: 'count',
        thresholdsX: 10,
        thresholdsY: 10,
      },
    ],
    encode: {
      x: 'IMDB Rating',
      y: 'Rotten Tomatoes Rating',
      shape: 'point',
    },
  };
}
