import { Vector2 } from './vector';

type Min = Vector2;
type Max = Vector2;
export type Bounds = [Min, Max];

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
  // todo
  return true;
}
