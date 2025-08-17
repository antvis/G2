import { line, curveLinearClosed } from '@antv/vendor/d3-shape';
import { Coordinate } from '@antv/coord';
import { isTranspose } from '../../utils/coordinate';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { select } from '../../utils/selection';
import { applyStyle, createEdgeBasedRoundedPath, reorder } from '../utils';

export type FunnelOptions = {
  adjustPoints?: (
    points: Vector2[],
    nextPoints: Vector2[],
    coordinate: Coordinate,
  ) => Vector2[];
  borderRadius?:
    | number
    | {
        topLeft?: number;
        topRight?: number;
        bottomLeft?: number;
        bottomRight?: number;
      };
  [key: string]: any;
};

/**
 * Adjust and return the new `points`.
 */
function getFunnelPoints(
  points: Vector2[],
  nextPoints: Vector2[],
  coordinate: Coordinate,
) {
  const [p0, p1, p2, p3] = points;

  if (isTranspose(coordinate)) {
    const newP1: Vector2 = [nextPoints ? nextPoints[0][0] : p1[0], p1[1]];
    const newP2: Vector2 = [nextPoints ? nextPoints[3][0] : p2[0], p2[1]];
    return [p0, newP1, newP2, p3];
  }
  const newP1: Vector2 = [p1[0], nextPoints ? nextPoints[0][1] : p1[1]];
  const newP2: Vector2 = [p2[0], nextPoints ? nextPoints[3][1] : p2[1]];
  return [p0, newP1, newP2, p3];
}

/**
 * Render funnel in different coordinate and using color channel for stroke and fill attribute.
 */
export const Funnel: SC<FunnelOptions> = (options, context) => {
  const { adjustPoints = getFunnelPoints, borderRadius, ...style } = options;
  const { coordinate, document } = context;

  return (points, value, defaults, point2d) => {
    const { index } = value;
    const { color: defaultColor, ...rest } = defaults;
    const nextPoints = point2d[index + 1];
    const funnelPoints = adjustPoints(points, nextPoints, coordinate);
    const tpShape = !!isTranspose(coordinate);
    const [p0, p1, p2, p3] = tpShape ? reorder(funnelPoints) : funnelPoints;
    const { color = defaultColor, opacity } = value;
    const pathData = borderRadius
      ? createEdgeBasedRoundedPath([p0, p1, p2, p3], borderRadius || 0)
      : line().curve(curveLinearClosed)([p0, p1, p2, p3]);
    return select(document.createElement('path', {}))
      .call(applyStyle, rest)
      .style('d', pathData)
      .style('fill', color)
      .style('fillOpacity', opacity)
      .call(applyStyle, style)
      .node();
  };
};

Funnel.props = {
  defaultMarker: 'square',
};
