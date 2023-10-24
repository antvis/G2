import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';

export type ZoomOutOptions = Animation;

export const ZoomOut: AC<ZoomOutOptions> = (options) => {
  // Small enough to hide or show very small part of mark,
  // but bigger enough to not cause bug.
  const ZERO = 0.0001;

  return (from, _, defaults) => {
    const [shape] = from;
    const {
      transform: prefix = '',
      fillOpacity = 1,
      strokeOpacity = 1,
      opacity = 1,
    } = shape.style;
    const transformOrigin = 'center center';
    const keyframes = [
      { transform: `${prefix} scale(1)`.trimStart(), transformOrigin },
      {
        transform: `${prefix} scale(${ZERO})`.trimStart(),
        transformOrigin,
        fillOpacity,
        strokeOpacity,
        opacity,
        offset: 0.99,
      },
      {
        transform: `${prefix} scale(${ZERO})`.trimStart(),
        transformOrigin,
        fillOpacity: 0,
        strokeOpacity: 0,
        opacity: 0,
      },
    ];

    const animation = shape.animate(keyframes, { ...defaults, ...options });

    return animation;
  };
};
