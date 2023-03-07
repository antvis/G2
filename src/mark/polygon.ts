import { Vector2, MarkComponent as MC } from '../runtime';
import { PolygonMark } from '../spec';
import {
  baseGeometryChannels,
  basePostInference,
  basePreInference,
  tooltip2d,
} from './utils';

export type PolygonOptions = Omit<PolygonMark, 'type'>;

/**
 * Convert value for each channel to polygon shapes.
 */
export const Polygon: MC<PolygonOptions> = () => {
  return (index, scale, value, coordinate) => {
    const Xn = Object.entries(value)
      .filter(([key]) => key.startsWith('x'))
      .map(([, value]) => value);

    const Yn = Object.entries(value)
      .filter(([key]) => key.startsWith('y'))
      .map(([, value]) => value);

    const P = index.map((i) => {
      const Pn = [];
      for (let j = 0; j < Xn.length; j++) {
        const x = Xn[j][i];
        if (x === undefined) break;
        const y = Yn[j][i];
        Pn.push(coordinate.map([+x, +y]));
      }
      return Pn as Vector2[];
    });

    return [index, P];
  };
};

const shapes = ['polygon', 'ribbon'];

Polygon.props = {
  defaultShape: 'polygon',
  defaultLabelShape: 'label',
  composite: false,
  channels: [
    ...baseGeometryChannels({ shapes }),
    { name: 'x', required: true },
    { name: 'y', required: true },
  ],
  preInference: [...basePreInference()],
  postInference: [...basePostInference(), ...tooltip2d()],
};
