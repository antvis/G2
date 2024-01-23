import { Coordinate } from '@antv/coord';
import { Linear } from '@antv/scale';
import { isNumber, lowerFirst } from '@antv/util';
import { extent } from 'd3-array';
import { Path as D3Path } from 'd3-path';
import { Primitive, Vector2, Vector3 } from '../runtime';
import { indexOf } from '../utils/array';
import { isPolar, isTranspose } from '../utils/coordinate';
import { G2Element, Selection } from '../utils/selection';
import { angle, angleWithQuadrant, dist, sub } from '../utils/vector';

export function applyStyle(
  selection: Selection,
  style: Record<string, Primitive>,
) {
  for (const [key, value] of Object.entries(style)) {
    selection.style(key, value);
  }
}

/**
 * Draw polygon path with points.
 * @param path
 * @param points
 */
export function appendPolygon(path: D3Path, points: Vector2[]) {
  points.forEach((p, idx) =>
    idx === 0 ? path.moveTo(p[0], p[1]) : path.lineTo(p[0], p[1]),
  );
  path.closePath();
  return path;
}

export type ArrowOptions = {
  /**
   * Whether show arrow of line.
   */
  arrow?: boolean;
  /**
   * Arrow size, can be a px number, or a percentage string. Default: '40%'
   */
  arrowSize?: number | string;
};

/**
 * Draw arrow between `from` and `to`.
 * @param from
 * @param to
 * @returns
 */
export function arrowPoints(
  from: Vector2,
  to: Vector2,
  options: ArrowOptions,
): [Vector2, Vector2] {
  const { arrowSize } = options;
  const size =
    typeof arrowSize === 'string'
      ? (+parseFloat(arrowSize) / 100) * dist(from, to)
      : arrowSize;
  // TODO Use config from style.
  // Default arrow rotate is 30°.
  const arrowAngle = Math.PI / 6;

  const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);

  const arrowAngle1 = Math.PI / 2 - angle - arrowAngle;
  const arrow1: Vector2 = [
    to[0] - size * Math.sin(arrowAngle1),
    to[1] - size * Math.cos(arrowAngle1),
  ];

  const arrowAngle2 = angle - arrowAngle;
  const arrow2: Vector2 = [
    to[0] - size * Math.cos(arrowAngle2),
    to[1] - size * Math.sin(arrowAngle2),
  ];

  return [arrow1, arrow2];
}

/**
 * Draw arc by from -> to, with center and radius.
 * @param path
 * @param from
 * @param to
 * @param center
 * @param radius
 */
export function appendArc(
  path: D3Path,
  from: Vector2,
  to: Vector2,
  center: Vector2,
  radius: number,
) {
  const startAngle = angle(sub(center, from)) + Math.PI;
  const endAngle = angle(sub(center, to)) + Math.PI;

  path.arc(
    center[0],
    center[1],
    radius,
    startAngle,
    endAngle,
    endAngle - startAngle < 0,
  );

  return path;
}

/**
 * @todo Fix wrong key point.
 */
export function computeGradient(
  C: string[],
  X: number[],
  Y: number[],
  from: string | boolean = 'y',
  mode: 'between' | 'start' | 'end' = 'between',
  tpShape = false,
): string {
  // The angles of gradients rendering are varies when 'from' and 'tpShape' are different.
  const getTheta = (from: string | boolean, tpShape: boolean) => {
    if (from === 'y' || from === true) {
      if (tpShape) {
        return 180;
      } else {
        return 90;
      }
    } else {
      if (tpShape) {
        return 90;
      } else {
        return 0;
      }
    }
  };

  const P = from === 'y' || from === true ? Y : X;
  const theta = getTheta(from, tpShape);
  const I = indexOf(P);

  const [min, max] = extent(I, (i) => P[i]);
  // This need to improve for non-uniform distributed colors.
  const p = new Linear({
    domain: [min, max],
    range: [0, 100],
  });

  const percentage = (i) =>
    isNumber(P[i]) && !Number.isNaN(P[i]) ? p.map(P[i]) : 0;

  const gradientMode = {
    // Interpolate the colors for this segment.
    between: (i: number) => `${C[i]} ${percentage(i)}%`,
    // Use the color of the start point as the color for this segment.
    start: (i: number) =>
      i === 0
        ? `${C[i]} ${percentage(i)}%`
        : `${C[i - 1]} ${percentage(i)}%, ${C[i]} ${percentage(i)}%`,
    // Use the color of the end point as the color for this segment.
    end: (i: number) =>
      i === C.length - 1
        ? `${C[i]} ${percentage(i)}%`
        : `${C[i]} ${percentage(i)}%, ${C[i + 1]} ${percentage(i)}%`,
  };

  const gradient = I.sort((a, b) => percentage(a) - percentage(b))
    .map(gradientMode[mode] || gradientMode['between'])
    .join(',');
  return `linear-gradient(${theta}deg, ${gradient})`;
}

export function reorder(points: Vector2[]): Vector2[] {
  const [p0, p1, p2, p3] = points;
  return [p3, p0, p1, p2];
}

export function getArcObject(
  coordinate: Coordinate,
  points: Vector2[],
  Y: [number, number],
) {
  const [p0, p1, , p3] = isTranspose(coordinate) ? reorder(points) : points;

  const [y, y1] = Y;
  const center = coordinate.getCenter() as Vector2;
  const a1 = angleWithQuadrant(sub(p0, center));
  const a2 = angleWithQuadrant(sub(p1, center));
  // There are two situations that a2 === a1:
  // 1. a1 - a2 = 0
  // 2. |a1 - a2| = Math.PI * 2
  // Distinguish them by y and y1:
  const a3 = a2 === a1 && y !== y1 ? a2 + Math.PI * 2 : a2;
  return {
    startAngle: a1,
    endAngle: a3 - a1 >= 0 ? a3 : Math.PI * 2 + a3,
    innerRadius: dist(p3, center),
    outerRadius: dist(p0, center),
  };
}

/**
 * Pick connectStyle from style.
 * @param style
 */
export function getConnectStyle(
  style: Record<string, any>,
): Record<string, any> {
  const PREFIX = 'connect';
  return Object.fromEntries(
    Object.entries(style)
      .filter(([key]) => key.startsWith(PREFIX))
      .map(([key, value]) => [
        lowerFirst(key.replace(PREFIX, '').trim()),
        value,
      ])
      .filter(([key]) => key !== undefined),
  );
}

export function toOpacityKey(options) {
  const { colorAttribute, opacityAttribute = colorAttribute } = options;
  return `${opacityAttribute}Opacity`;
}

export function getTransform(coordinate, value) {
  if (!isPolar(coordinate)) return '';
  const center = coordinate.getCenter() as Vector2;
  const { transform: suffix } = value;
  return `translate(${center[0]}, ${center[1]}) ${suffix || ''}`;
}

export function getOrigin(points: (Vector2 | Vector3)[]) {
  if (points.length === 1) return points[0];
  const [[x0, y0, z0 = 0], [x2, y2, z2 = 0]] = points;
  return [(x0 + x2) / 2, (y0 + y2) / 2, (z0 + z2) / 2];
}
