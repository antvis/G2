import { Coordinate } from '@antv/coord';
import { isTranspose } from '../../utils/coordinate';
import { ShapeComponent as SC, Vector2 } from '../../runtime';
import { Funnel } from './funnel';

export type PyramidOptions = Record<string, any>;

/**
 * Adjust and return the new `points`.
 */
function getPyramidPoints(
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
        previousPoints ? previousPoints[1][0] : (p0[0] + p3[0]) / 2,
        p0[1],
      ];

      const newP3: Vector2 = [
        previousPoints ? previousPoints[2][0] : (p0[0] + p3[0]) / 2,
        p3[1],
      ];

      return [newP0, p1, p2, newP3];
    }

    const newP1: Vector2 = [
      nextPoints ? nextPoints[0][0] : (p1[0] + p2[0]) / 2,
      p1[1],
    ];
    const newP2: Vector2 = [
      nextPoints ? nextPoints[3][0] : (p1[0] + p2[0]) / 2,
      p2[1],
    ];
    return [p0, newP1, newP2, p3];
  }

  if (reverse) {
    const newP0: Vector2 = [
      p0[0],
      previousPoints ? previousPoints[1][1] : (p0[1] + p3[1]) / 2,
    ];

    const newP3: Vector2 = [
      p3[0],
      previousPoints ? previousPoints[2][1] : (p0[1] + p3[1]) / 2,
    ];

    return [newP0, p1, p2, newP3];
  }

  const newP1: Vector2 = [
    p1[0],
    nextPoints ? nextPoints[0][1] : (p1[1] + p2[1]) / 2,
  ];
  const newP2: Vector2 = [
    p2[0],
    nextPoints ? nextPoints[3][1] : (p1[1] + p2[1]) / 2,
  ];
  return [p0, newP1, newP2, p3];
}

/**
 * Render pyramid in different coordinate and using color channel for stroke and fill attribute.
 */
export const Pyramid: SC<PyramidOptions> = (options, context) => {
  return Funnel({ adjustPoints: getPyramidPoints, ...options }, context);
};

Pyramid.props = {
  defaultMarker: 'square',
};
