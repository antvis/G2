import { line, curveLinearClosed } from '@antv/vendor/d3-shape';
import { Coordinate } from '@antv/coord';
import { isTranspose } from '../../utils/coordinate';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { select } from '../../utils/selection';
import { applyStyle, reorder } from '../utils';
import { createRoundedPath } from '../../utils/path';
import { parseRadius } from './color';

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
 * Render funnel in different coordinate and using color channel for stroke and fill attribute.
 */
export const Funnel: SC<FunnelOptions> = (options, context) => {
  const {
    adjustPoints = getFunnelPoints,
    radius,
    radiusTopLeft: _radiusTopLeft,
    radiusTopRight: _radiusTopRight,
    radiusBottomRight: _radiusBottomRight,
    radiusBottomLeft: _radiusBottomLeft,
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

  const [
    defaultTopLeft,
    defaultTopRight,
    defaultBottomRight,
    defaultBottomLeft,
  ] = parseRadius(radius);
  const radiusTopLeft = _radiusTopLeft ?? defaultTopLeft;
  const radiusTopRight = _radiusTopRight ?? defaultTopRight;
  const radiusBottomRight = _radiusBottomRight ?? defaultBottomRight;
  const radiusBottomLeft = _radiusBottomLeft ?? defaultBottomLeft;

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
      ? createRoundedPath([p0, p1, p2, p3], standardDirRadius, true)
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
