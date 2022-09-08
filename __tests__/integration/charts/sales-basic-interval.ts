import { data } from '../data/sales';

export function salesBasicInterval() {
  return {
    type: 'interval',
    data: data,
    encode: {
      x: 'genre',
      y: 'sold',
      color: 'genre',
    },
  };
}
