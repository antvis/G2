import { G2Spec } from '../../../src';
import { fruits } from '../data/fruits';

/**
 * @see https://canisjs.github.io/canis-editor/index.html?exmp=nightingale_1
 */
export function deathsRoseStackEnter(): G2Spec {
  return {
    type: 'interval',
    data: {
      type: 'fetch',
      value: 'data/deaths.json',
    },
    coordinates: [{ type: 'polar' }],
    transform: [
      { type: 'stackY' },
      { type: 'stackEnter', groupBy: ['color', 'x'], duration: 3000 },
    ],
    scale: { y: { type: 'sqrt' } },
    axis: { y: false },
    encode: {
      x: 'Month',
      y: 'Death',
      color: 'Type',
    },
    legend: { color: { layout: { justifyContent: 'flex-start' } } },
    animate: {
      enterType: 'waveIn',
    },
  };
}

deathsRoseStackEnter.intervals = [[1500]];
