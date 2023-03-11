import { maxIndex } from 'd3-array';
import { Coordinate } from '@antv/coord';
import { Vector2 } from '../../../runtime';
import { sub, angle } from '../../../utils/vector';
import { LabelPosition } from './default';

/**
 * Only for Area label.
 */
export function area(
  position: LabelPosition,
  points: Vector2[],
  value: Record<string, any>,
  coordinate: Coordinate,
) {
  const l = points.length / 2;
  const Y1 = points.slice(0, l);
  const Y0 = points.slice(l);
  // Get the maximal space for label.
  let idx = maxIndex(Y1, (p, i) => Math.abs(p[1] - Y0[i][1]));
  // Do not show label at first and last.
  idx = Math.max(Math.min(idx, l - 2), 1);

  const mid = (i: number): Vector2 => [Y1[i][0], (Y1[i][1] + Y0[i][1]) / 2];
  const point = mid(idx);
  const prev = mid(idx - 1);
  const next = mid(idx + 1);

  // todo: G rotate only support deg.
  const rotate = (angle(sub(next, prev)) / Math.PI) * 180;

  return {
    x: point[0],
    y: point[1],
    transform: `rotate(${rotate})`,
    textAlign: 'center',
    textBaseline: 'middle',
  };
}
