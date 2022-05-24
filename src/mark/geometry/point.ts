import { MarkComponent as MC, Vector2 } from '../../runtime';
import { PointGeometry } from '../../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from '../utils';

export type PointOptions = Omit<PointGeometry, 'type'>;

/**
 * Convert value for each channel to point shapes.
 * Calc the bbox of each point based on x, y and r.
 * This is for allowing their radius can be affected by coordinate(e.g. fisheye).
 * @todo Return 4 points of bbox rather than 2 points for better reuse.
 */
export const Point: MC<PointOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, size: S } = value;
    const [width, height] = coordinate.getSize();
    const P = Array.from(index, (i) => {
      const cx = +X[i];
      const cy = +Y[i];
      const r = +S[i];
      const a = r / width;
      const b = r / height;
      const p1 = [cx - a, cy - b];
      const p2 = [cx + a, cy + b];
      return [coordinate.map(p1), coordinate.map(p2)] as Vector2[];
    });
    return [index, P];
  };
};

Point.props = {
  defaultShape: 'point',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'size', required: true },
  ],
  preInference: [
    ...basePreInference(),
    { type: 'maybeZeroY' },
    { type: 'maybeZeroX' },
    { type: 'maybeSize' },
  ],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: ['point', 'hollowPoint'],
};
