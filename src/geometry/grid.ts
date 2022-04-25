import { Band } from '@antv/scale';
import { MarkComponent as MC, Vector2 } from '../runtime';
import { GridGeometry } from '../spec';
import { baseChannels, baseInference } from './utils';

export type GridOptions = Omit<GridGeometry, 'type'>;

/**
 * Convert value for each channel to Grid shapes.
 * Calc the bbox of each Grid based on x, y and r.
 * This is for allowing their radius can be affected by coordinate(e.g. fisheye).
 */
export const Grid: MC<GridOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y } = value;
    const x = scale.x as Band;
    const y = scale.y as Band;

    const P = Array.from(index, (i) => {
      const width = x.getBandWidth(x.invert(X[i][0]));
      const height = y.getBandWidth(y.invert(Y[i][0]));
      const x1 = +X[i][0];
      const y1 = +Y[i][0];
      const p1 = [x1, y1];
      const p2 = [x1 + width, y1];
      const p3 = [x1 + width, y1 + height];
      const p4 = [x1, y1 + height];
      return [p1, p2, p3, p4].map((d) => coordinate.map(d)) as Vector2[];
    });
    return [index, P];
  };
};

Grid.props = {
  defaultShape: 'rect',
  channels: [
    ...baseChannels(),
    { name: 'x', required: true, scale: 'band' },
    { name: 'y', required: true, scale: 'band' },
  ],
  infer: [...baseInference(), { type: 'maybeZeroX1' }, { type: 'maybeZeroY1' }],
  shapes: ['rect', 'hollowRect'],
};
