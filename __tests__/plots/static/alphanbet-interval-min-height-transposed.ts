import { G2Spec } from '../../../src';

export function alphabetIntervalMinHeightTransposed(): G2Spec {
  return {
    type: 'interval',
    coordinate: { transform: [{ type: 'transpose' }] },
    data: [
      { genre: 'Sports', sold: 0 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ],
    encode: {
      x: 'genre',
      y: 'sold',
      color: 'genre',
    },
    axis: {
      x: { animate: false },
      y: { animate: false },
    },
    style: {
      draggable: true,
      droppable: true,
      minHeight: 50,
    },
  };
}
