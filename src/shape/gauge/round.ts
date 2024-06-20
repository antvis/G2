import { omit } from '@antv/util';
import type { Vector2, ShapeComponent as SC } from '../../runtime';

export type RoundOptions = Record<string, any>;

// Get point1 point2 radius.
const getR = (point1, point2) => {
  return (
    Math.sqrt(
      Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2),
    ) / 2
  );
};

// Gauge round.
export const Round: SC<RoundOptions> = (options, context) => {
  if (!context) return;
  const { coordinate } = context;
  if (!coordinate?.getCenter) return;
  // Get coordinate center point.
  const center = coordinate.getCenter() as Vector2;

  return (points, cfg, defaultCfg) => {
    const { document } = context.canvas;
    const { color, index } = cfg;

    const g = document.createElement('g', {});

    const minR = getR(points[0], points[1]);
    const maxR = getR(points[0], center) * 2;

    /**
     * MinR small circle radius,  maxR big circle radius.
     * Draw four arcs.
     * Style lineWidth and stroke for the time being inset.
     */
    const roundPath = document.createElement('path', {
      style: {
        d: [
          ['M', ...points[0]],
          ['A', minR, minR, 0, 1, 0, ...points[1]],
          ['A', maxR + minR * 2, maxR + minR * 2, 0, 0, 0, ...points[2]],
          ['A', minR, minR, 0, 1, index === 0 ? 0 : 1, ...points[3]],
          ['A', maxR, maxR, 0, 0, 1, ...points[0]],
          ['Z'],
        ],
        ...defaultCfg,
        ...omit(options, ['shape', 'last', 'first']),
        fill: color || defaultCfg.color,
      },
    });

    g.appendChild(roundPath);

    return g;
  };
};
