import { line, curveLinearClosed } from '@antv/vendor/d3-shape';
import { Coordinate } from '@antv/coord';
import { isTranspose } from '../../utils/coordinate';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { select } from '../../utils/selection';
import { applyStyle, reorder } from '../utils';

export type FunnelOptions = {
  adjustPoints?: (
    points: Vector2[],
    nextPoints: Vector2[],
    previousPoints: Vector2[],
    coordinate: Coordinate,
    reverse: boolean,
  ) => Vector2[];
  [key: string]: any;
};

/**
 * Adjust and return the new `points`.
 */
function getFunnelPoints(
  points: Vector2[],
  nextPoints: Vector2[],
  previousPoints: Vector2[],
  coordinate: Coordinate,
  reverse: boolean,
) {
  const [p0, p1, p2, p3] = points;
  if (isTranspose(coordinate)) {
    if (reverse) {
      const newP0: Vector2 = [
        previousPoints ? previousPoints[1][0] : p0[0],
        p0[1],
      ];

      const newP3: Vector2 = [
        previousPoints ? previousPoints[2][0] : p3[0],
        p3[1],
      ];

      return [newP0, p1, p2, newP3];
    }

    const newP1: Vector2 = [nextPoints ? nextPoints[0][0] : p1[0], p1[1]];
    const newP2: Vector2 = [nextPoints ? nextPoints[3][0] : p2[0], p2[1]];
    return [p0, newP1, newP2, p3];
  }

  if (reverse) {
    const newP0: Vector2 = [
      p0[0],
      previousPoints ? previousPoints[1][1] : p0[1],
    ];

    const newP3: Vector2 = [
      p3[0],
      previousPoints ? previousPoints[2][1] : p3[1],
    ];

    return [newP0, p1, p2, newP3];
  }

  const newP1: Vector2 = [p1[0], nextPoints ? nextPoints[0][1] : p1[1]];
  const newP2: Vector2 = [p2[0], nextPoints ? nextPoints[3][1] : p2[1]];
  return [p0, newP1, newP2, p3];
}

/**
 * Calculate the offset
 */
const getOffset = (
  angle: number,
  radius: number,
  sign: 1 | -1,
): { x: number; y: number } => {
  const offsetX = Math.cos(angle) * radius;
  const offsetY = Math.sin(angle) * radius;
  return { x: offsetX * sign, y: offsetY };
};
/**
 * Calculate the radius of the long side
 */
const getRadiusOfLongerBase = (angle: number, radius: number): number => {
  return radius / Math.tan(angle / 2);
};

/**
 * Create a rounded rectangle path with given corner radius.
 */
function createRoundedPath(
  points: Vector2[],
  radius: [number, number, number, number],
): string {
  const [p0, p1, p2, p3] = points;
  const [r0, r1, r2, r3] = radius;
  const isLongBaseOnTop = p1[0] - p0[0] > p2[0] - p3[0];

  const angle = Math.atan2(Math.abs(p1[1] - p2[1]), Math.abs(p1[0] - p2[0]));

  // The radius on the long side requires additional calculation
  const rs = isLongBaseOnTop
    ? [
        getRadiusOfLongerBase(angle, r0),
        getRadiusOfLongerBase(angle, r1),
        r2,
        r3,
      ]
    : [
        r0,
        r1,
        getRadiusOfLongerBase(angle, r2),
        getRadiusOfLongerBase(angle, r3),
      ];

  // Determine the direction of the X-axis offset based on the lengths of the upper and lower sides
  const sign = isLongBaseOnTop ? 1 : -1;

  const ofs = rs.map((r) => getOffset(angle, r, sign));

  return [
    `M${p0[0] + rs[0]} ${p0[1]}`,
    `L${p1[0] - rs[1]} ${p1[1]}`,
    `Q${p1[0]} ${p1[1]} ${p1[0] - ofs[1].x} ${p1[1] + ofs[1].y}`,
    `L${p2[0] + ofs[2].x} ${p2[1] - ofs[2].y}`,
    `Q${p2[0]} ${p2[1]} ${p2[0] - rs[2]} ${p2[1]}`,
    `L${p3[0] + rs[3]} ${p3[1]}`,
    `Q${p3[0]} ${p3[1]} ${p3[0] - ofs[3].x} ${p3[1] - ofs[3].y}`,
    `L${p0[0] + ofs[0].x} ${p0[1] + ofs[0].y}`,
    `Q${p0[0]} ${p0[1]} ${p0[0] + rs[0]} ${p0[1]}`,
    'Z',
  ].join(' ');
}

/**
 * Render funnel in different coordinate and using color channel for stroke and fill attribute.
 */
export const Funnel: SC<FunnelOptions> = (options, context) => {
  const {
    adjustPoints = getFunnelPoints,
    radius,
    radiusTopLeft = radius,
    radiusTopRight = radius,
    radiusBottomRight = radius,
    radiusBottomLeft = radius,
    innerRadius = 0,
    innerRadiusTopLeft = innerRadius,
    innerRadiusTopRight = innerRadius,
    innerRadiusBottomRight = innerRadius,
    innerRadiusBottomLeft = innerRadius,
    first = true,
    last = true,
    ...style
  } = options;
  const { coordinate, document } = context;
  return (points, value, defaults, point2d) => {
    const { index } = value;
    const { color: defaultColor, ...rest } = defaults;
    const nextPoints = point2d[index + 1];
    const previousPoints = point2d[index - 1];
    const funnelPoints = adjustPoints(
      points,
      nextPoints,
      previousPoints,
      coordinate,
      style.reverse,
    );
    const tpShape = !!isTranspose(coordinate);
    const [p0, p1, p2, p3] = tpShape ? reorder(funnelPoints) : funnelPoints;
    const { color = defaultColor, opacity } = value;
    const standardDirRadius: [number, number, number, number] = [
      first ? radiusTopLeft ?? innerRadiusTopLeft : innerRadiusTopLeft,
      first ? radiusTopRight ?? innerRadiusTopRight : innerRadiusTopRight,
      last
        ? radiusBottomRight ?? innerRadiusBottomRight
        : innerRadiusBottomRight,
      last ? radiusBottomLeft ?? innerRadiusBottomLeft : innerRadiusBottomLeft,
    ];

    const path = standardDirRadius.find((r) => r > 0)
      ? createRoundedPath([p0, p1, p2, p3], standardDirRadius)
      : line().curve(curveLinearClosed)([p0, p1, p2, p3]);

    return select(document.createElement('path', {}))
      .call(applyStyle, rest)
      .style('d', path)
      .style('fill', color)
      .style('fillOpacity', opacity)
      .call(applyStyle, style)
      .node();
  };
};

Funnel.props = {
  defaultMarker: 'square',
};
