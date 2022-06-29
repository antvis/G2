import { DisplayObject } from '@antv/g';
import { Coordinate } from '@antv/coord';
import { isTranspose } from '../utils/coordinate';
import { AnimationComponent as AC, Animation } from '../runtime';
import { Animation as AnimationOptions } from '../spec';
import { effectTiming } from './utils';
import { fadeIn } from './fadeIn';

export type ScaleInXOptions = AnimationOptions;

type Keyframe = Record<string, any>;

type Direction = (scale: Keyframe[], fade: Keyframe[]) => Keyframe[];

type Transform = (coordinate: Coordinate) => [string, string];

// Small enough to hide or show very small part of mark,
// but bigger enough to not cause bug.
const ZERO = 0.0001;

function concatKeyframes(
  K0: Keyframe[],
  K1: Keyframe[],
  offset: number,
): Keyframe[] {
  const [prefix, k0] = [K0.slice(0, -1), K0.pop()];
  const [k1, ...suffix] = K1;
  return [...prefix, { ...k1, ...k0, offset }, ...suffix];
}

function appendTransform(shape: DisplayObject, transform: string): string {
  const { transform: prefix } = shape.style;
  return `${prefix} ${transform}`.trimStart();
}

export function transformX(coordinate: Coordinate): [string, string] {
  return isTranspose(coordinate)
    ? ['left bottom', `scale(1, ${ZERO})`]
    : ['left top', `scale(${ZERO}, 1)`];
}

export function transformY(coordinate: Coordinate): [string, string] {
  return isTranspose(coordinate)
    ? ['left top', `scale(${ZERO}, 1)`]
    : ['left bottom', `scale(1, ${ZERO})`];
}

export function directionIn(
  scaleIn: Keyframe[],
  fadeIn: Keyframe[],
): Keyframe[] {
  return concatKeyframes(fadeIn, scaleIn, 0.01);
}

export function directionOut(
  scaleIn: Keyframe[],
  fadeIn: Keyframe[],
): Keyframe[] {
  return concatKeyframes(scaleIn.reverse(), fadeIn.reverse(), 0.99);
}

export function AbstractScale<T>(
  direction: Direction,
  transform: Transform,
  options: T,
): Animation {
  return (shape, value, coordinate, defaults) => {
    const [origin, from] = transform(coordinate);
    const S = [
      { transform: appendTransform(shape, from) },
      { transform: appendTransform(shape, 'scale(1, 1)') },
    ];
    const F = fadeIn(shape);
    const keyframes = direction(S, F);
    // Change transform origin for correct transform.
    shape.style.transformOrigin = origin;
    const animation = shape.animate(
      keyframes,
      effectTiming(defaults, value, options),
    );
    // Reset transform origin to eliminate side effect
    // for following animations.
    animation.finished.then(() => (shape.style.transformOrigin = 'left top'));
    return animation;
  };
}

/**
 * Scale mark from nothing to desired shape in x direction.
 */
export const ScaleInX: AC<ScaleInXOptions> = (options) => {
  return AbstractScale<ScaleInXOptions>(directionIn, transformX, options);
};
