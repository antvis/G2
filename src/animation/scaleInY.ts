import { isTranspose } from '../utils/coordinate';
import { AnimationComponent as AC } from '../runtime';
import { Animation } from './types';

export type ScaleInYOptions = Animation;

/**
 * Scale mark from nothing to desired shape in y direction.
 */
export const ScaleInY: AC<ScaleInYOptions> = (options, context) => {
  // Small enough to hide or show very small part of mark,
  // but bigger enough to not cause bug.
  const ZERO = 0.0001;

  const { coordinate } = context;

  return (from, _, defaults) => {
    const [shape] = from;
    const {
      transform: prefix = '',
      fillOpacity = 1,
      strokeOpacity = 1,
      opacity = 1,
    } = shape.style;
    const [transformOrigin, transform]: [string, string] = isTranspose(
      coordinate,
    )
      ? [`left top`, `scale(${ZERO}, 1)`] // left-top corner
      : [`left bottom`, `scale(1, ${ZERO})`]; // left-bottom corner

    // Using a short fadeIn transition to hide element with scale(0.001)
    // which is still visible.
    const keyframes = [
      {
        transform: `${prefix} ${transform}`.trimStart(),
        transformOrigin,
        fillOpacity: 0,
        strokeOpacity: 0,
        opacity: 0,
      },
      {
        transform: `${prefix} ${transform}`.trimStart(),
        transformOrigin,
        fillOpacity,
        strokeOpacity,
        opacity,
        offset: 0.01,
      },
      {
        transform: `${prefix} scale(1, 1)`.trimStart(),
        transformOrigin,
        fillOpacity,
        strokeOpacity,
        opacity,
      },
    ];

    const animation = shape.animate(keyframes, { ...defaults, ...options });

    return animation;
  };
};
