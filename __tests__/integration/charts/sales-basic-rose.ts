import { data } from '../data/sales';

export function salesBasicRose() {
  return {
    type: 'interval',
    data: data,
    coordinate: [{ type: 'polar' }],
    scale: { y: { guide: null } },
    encode: {
      x: 'genre',
      y: 'sold',
      color: 'genre',
    },
  };
}
