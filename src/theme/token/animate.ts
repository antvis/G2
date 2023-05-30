import { deepMix } from '@antv/util';
import { Token as G2Token } from '../../runtime';

export type AnimateTokenOptions = G2Token['animate'];

export const animateToken = {
  enter: {
    duration: 300,
    fill: 'both',
    delay: 0,
  },
  update: {
    duration: 300,
    fill: 'both',
    delay: 0,
  },
  exit: {
    duration: 300,
    fill: 'both',
    delay: 0,
  },
};

export const AnimateToken = (
  options: AnimateTokenOptions = {},
): AnimateTokenOptions => {
  return deepMix({}, animateToken, options);
};
