import { G2Spec } from '../../../src';

export function moviesRectBin(): G2Spec {
  return {
    type: 'rect',
    data: {
      type: 'fetch',
      value: 'data/movies.csv',
    },
    transform: [
      { type: 'bin', color: 'count', thresholdsX: 30, thresholdsY: 20 },
    ],
    scale: {
      color: {
        palette: 'ylGnBu',
      },
    },
    encode: {
      x: 'IMDB Rating',
      y: 'Rotten Tomatoes Rating',
    },
  };
}
