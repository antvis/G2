import { G2Spec } from '../../../src';

/**
 * @see https://canisjs.github.io/canis-editor/index.html?exmp=os_1
 */
export function osAreaStackEnter(): G2Spec {
  return {
    type: 'area',
    data: {
      type: 'fetch',
      value: 'data/os.json',
    },
    transform: [
      { type: 'stackEnter', groupBy: 'color', duration: 10000 },
      { type: 'stackY', orderBy: 'value' },
    ],
    encode: {
      x: 'Year',
      y: 'Share',
      color: 'OperatingSystem',
    },
    style: {
      shape: 'smooth',
    },
    animate: {
      enter: {
        type: 'growInX',
      },
    },
  };
}

osAreaStackEnter.intervals = [[5000]];
