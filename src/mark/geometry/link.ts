import { MarkComponent as MC, Vector2 } from '../../runtime';
import { LinkGeometry } from '../../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
} from '../utils';

export type LinkOptions = Omit<LinkGeometry, 'type'>;

/**
 * Connect `start` to `end` with single line.
 */
export const Link: MC<LinkOptions> = () => {
  return (index, scale, value, coordinate) => {
    const { x: X, y: Y, x1: X1, y1: Y1 } = value;

    const xoffset = scale.x?.getBandWidth?.() || 0;

    const P = index.map((i) => [
      coordinate.map([+X[i] + xoffset / 2, +Y[i]]) as Vector2,
      coordinate.map([+X1[i] + xoffset / 2, +Y1[i]]) as Vector2,
    ]);

    return [index, P];
  };
};

Link.props = {
  defaultShape: 'link',
  defaultLabelShape: 'label',
  channels: [
    ...baseGeometryChannels(),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [
    ...basePostInference(),
    { type: 'maybeTitleX' },
    { type: 'maybeTooltipY' },
  ],
  shapes: ['link', 'arc', 'vhv', 'smoothEdge'],
};
