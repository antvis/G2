import { AABB } from '@antv/g';
import { Vector2 } from './vector';

type Min = Vector2;
type Max = Vector2;
export type Bounds = [Min, Max];

export function parseAABB(min2: AABB): Bounds {
  const { min, max } = min2;
  return [
    [min[0], min[1]],
    [max[0], max[1]],
  ];
}

/**
 * Whether the `point` in `bounds`.
 * @param point
 * @param bounds
 */
export function isInBounds(point: Vector2, bounds: Bounds): boolean {
  const [x, y] = point;
  const [min, max] = bounds;
  return x >= min[0] && x <= max[0] && y >= min[1] && y <= max[1];
}

/**
 * Whether `b1` is overflow from `b2`.
 * @param b1
 * @param b2
 */
export function isOverflow(b1: Bounds, b2: Bounds): boolean {
  const [min, max] = b1;
  return !(isInBounds(min, b2) && isInBounds(max, b2));
}

/**
 * Whether `b1` is overlap with `b2`.
 * @param b1
 * @param b2
 * @returns
 */
export function isOverlap(b1: Bounds, b2: Bounds): boolean {
  const [min1, max1] = b1;
  const [min2, max2] = b2;
  return (
    min1[0] < max2[0] &&
    max1[0] > min2[0] &&
    min1[1] < max2[1] &&
    max1[1] > min2[1]
  );
}
