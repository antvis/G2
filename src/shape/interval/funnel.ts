import { Coordinate } from '@antv/coord';
import { isTranspose } from '../../utils/coordinate';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { ColorRect } from './colorRect';

export type FunnelOptions = Record<string, any>;

/**
 * Adjust and return the new `points`.
 */
function getFunnelPoints(
  points: Vector2[],
  nextPoints: Vector2[],
  coordinate: Coordinate,
) {
  // eslint-disable-next-line
  let [p0, p1, p2, p3] = points;

  if (isTranspose(coordinate)) {
    p1 = [nextPoints ? nextPoints[0][0] : p1[0], p1[1]];
    p2 = [nextPoints ? nextPoints[3][0] : p2[0], p2[1]];
  } else {
    // Other case.
    p1 = [p1[0], nextPoints ? nextPoints[0][1] : p1[1]];
    p2 = [p2[0], nextPoints ? nextPoints[3][1] : p2[1]];
  }

  return [p0, p1, p2, p3];
}

/**
 * Render funnel in different coordinate and using color channel for stroke and fill attribute.
 */
export const Funnel: SC<FunnelOptions> = (options) => {
  return (points, value, coordinate, theme, point2d, ...args) => {
    const { index } = value;
    const nextPoints = point2d[index + 1];
    const funnelPoints = getFunnelPoints(points, nextPoints, coordinate);

    return ColorRect({ colorAttribute: 'fill', ...options })(
      funnelPoints,
      value,
      coordinate,
      theme,
      point2d,
      ...args,
    );
  };
};

Funnel.props = {
  defaultEnterAnimation: 'fadeIn',
};
