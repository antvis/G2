import { Vector2, MarkComponent as MC } from '../../runtime';
import { PolygonGeometry } from '../../spec';
import { baseChannels, baseInference } from '../utils';

export type PolygonOptions = Omit<PolygonGeometry, 'type'>;

/**
 * Convert value for each channel to polygon shapes.
 */
export const Polygon: MC<PolygonOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y } = value;

    const P = index.map((i) => {
      return X[i].map(
        (_, idx) => coordinate.map([X[i][idx], Y[i][idx]]) as Vector2,
      );
    });

    return [index, P];
  };
};

Polygon.props = {
  defaultShape: 'polygon',
  channels: [
    ...baseChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  infer: [...baseInference()],
  shapes: ['polygon'],
};
