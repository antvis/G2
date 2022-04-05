import { MarkComponent as MC, Vector2 } from '../runtime';
import { PointGeometry } from '../spec';

export type PointOptions = Omit<PointGeometry, 'type'>;

/**
 * Convert value for each channel to point shapes.
 * Calc the bbox of each point based on x, y and r.
 * This is for allowing their radius can be affected by coordinate(e.g. fisheye).
 */
export const Point: MC<PointOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, size: S } = value;
    const [width, height] = coordinate.getSize();
    const P = Array.from(index, (i) => {
      const cx = +X[i][0];
      const cy = +Y[i][0];
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
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'size', required: true },
    { name: 'color' },
    { name: 'shape' },
    { name: 'enterType' },
    { name: 'enterDelay' },
    { name: 'enterDuration' },
    { name: 'enterEasing' },
    { name: 'key', scale: 'identity' },
  ],
  infer: [
    { type: 'maybeTuple' },
    { type: 'maybeZeroY1' },
    { type: 'maybeSize' },
    { type: 'maybeKey' },
  ],
  shapes: ['point', 'hollowPoint'],
};
