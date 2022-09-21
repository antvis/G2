import { MarkComponent as MC, Vector2 } from '../runtime';
import { PointGeometry } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from './utils';

export type PointOptions = Omit<PointGeometry, 'type'>;

/**
 * Convert value for each channel to point shapes.
 * Calc the bbox of each point based on x, y and r.
 * This is for allowing their radius can be affected by coordinate(e.g. fisheye).
 * @todo Return 4 points of bbox rather than 2 points for better reuse.
 */
export const Point: MC<PointOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, size: S, dx: DX, dy: DY } = value;
    const [width, height] = coordinate.getSize();
    const { x, y } = scale;
    const xoffset = (x?.getBandWidth?.() || 0) / 2;
    const yoffset = (y?.getBandWidth?.() || 0) / 2;
    const P = Array.from(index, (i) => {
      const dx = +(DX?.[i] || 0);
      const dy = +(DY?.[i] || 0);
      const cx = +X[i] + dx;
      const cy = +Y[i] + dy;
      const r = +S[i];
      const a = r / width;
      const b = r / height;
      const p1 = [cx - a + xoffset, cy - b + yoffset];
      const p2 = [cx + a + xoffset, cy + b + yoffset];
      return [coordinate.map(p1), coordinate.map(p2)] as Vector2[];
    });
    return [index, P];
  };
};

Point.props = {
  defaultShape: 'point',
  defaultLabelShape: 'label',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
    { name: 'size', required: true },
    { name: 'dx', scale: 'identity' },
    { name: 'dy', scale: 'identity' },
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
  shapes: [
    'bowtie',
    'cross',
    'diamond',
    'hexagon',
    'hollowBowtie',
    'hollowDiamond',
    'hollowHexagon',
    'hollow',
    'hollowSquare',
    'hollowTriangle',
    'hollowTriangleDown',
    'hyphen',
    'linePoint',
    'plus',
    'point',
    'square',
    'tick',
    'triangle',
    'triangleDown',
  ],
};
