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

// 计算两点之间的角度
const getAngle = (start, end, center) => {
  const startAngle = Math.atan2(start[1] - center[1], start[0] - center[0]);
  const endAngle = Math.atan2(end[1] - center[1], end[0] - center[0]);
  let angle = endAngle - startAngle;
  // 确保角度在 0-2π 之间
  if (angle < 0) angle += Math.PI * 2;
  return angle;
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

    // 计算每个弧段的角度
    // 判断是否需要使用大弧度（角度大于180度）
    const isHalf = getAngle(points[3], points[0], center) > Math.PI;

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
          [
            'A',
            maxR + minR * 2,
            maxR + minR * 2,
            0,
            isHalf ? 1 : 0,
            0,
            ...points[2],
          ],
          ['A', minR, minR, 0, 1, index === 0 ? 0 : 1, ...points[3]],
          ['A', maxR, maxR, 0, isHalf ? 1 : 0, 1, ...points[0]],
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
