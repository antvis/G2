import { each } from '@antv/util';
import { Point } from '../../../interface';

/**
 * @ignore
 * Gets cpath
 * @param from
 * @param to
 * @returns
 */
export function getCPath(from: Point, to: Point) {
  return ['C', (from.x * 1) / 2 + (to.x * 1) / 2, from.y, (from.x * 1) / 2 + (to.x * 1) / 2, to.y, to.x, to.y];
}

/**
 * @ignore
 * Gets qpath
 * @param to
 * @param center
 * @returns
 */
export function getQPath(to: Point, center: Point) {
  const points = [];
  points.push({
    x: center.x,
    y: center.y,
  });
  points.push(to);

  const sub = ['Q'];
  each(points, (point) => {
    sub.push(point.x, point.y);
  });

  return sub;
}
