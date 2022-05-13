import { Vector2, MarkComponent as MC } from '../runtime';
import { EdgeGeometry } from '../spec';
import { baseChannels, baseInference } from './utils';

export type EdgeOptions = Omit<EdgeGeometry, 'type'>;

/**
 * Convert value for each channel to edge shapes.
 */
export const Edge: MC<EdgeOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y } = value;

    const P = index.map((i) => [
      coordinate.map([X[i][0], Y[i][0]]) as Vector2,
      coordinate.map([X[i][1], Y[i][1]]) as Vector2,
    ]);

    return [index, P];
  };
};

Edge.props = {
  defaultShape: 'edge',
  channels: [
    ...baseChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  infer: [...baseInference()],
  shapes: ['edge', 'arc'],
};
