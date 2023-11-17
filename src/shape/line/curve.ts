import { line, lineRadial, CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { Vector2 } from '@antv/coord';
import { isPolar, isTranspose } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle, computeGradient, getTransform } from '../utils';
import { createElement } from '../../utils/createElement';
import { subObject } from '../../utils/helper';
import { angleWithQuadrant, dist, sub } from '../../utils/vector';

const DoublePath = createElement((g) => {
  const { d1, d2, style1, style2 } = g.attributes;
  const document = g.ownerDocument;
  select(g)
    .maybeAppend('line', () => document.createElement('path', {}))
    .style('d', d1)
    .call(applyStyle, style1);
  select(g)
    .maybeAppend('line1', () => document.createElement('path', {}))
    .style('d', d2)
    .call(applyStyle, style2);
});

/**
 * Given a points sequence, split it into an array of defined points
 * and an array of undefined segments.
 *
 * Input - [[1, 2], [3, 4], [null, null], [null, null], [5, 6], [null, null], [7, 8]]
 * Output
 *  - [[1, 2], [3, 4], [5, 6], [7, 8]]
 *  - [
 *      [[3, 4], [5, 6]],
 *      [[5, 6], [7, 8]]
 *    ]
 */
function segmentation(
  points: Vector2[],
  defined: (d: any) => boolean,
): [Vector2[], [Vector2, Vector2][]] {
  const definedPoints = [];
  const segments = [];
  let m = false; // Is in a undefined sequence.
  let dp = null; // The previous defined point.
  for (const p of points) {
    // If current point is a undefined point,
    // enter a undefined sequence.
    if (!defined(p[0]) || !defined(p[1])) m = true;
    else {
      definedPoints.push(p);
      // If current point is a defined point,
      // and is in a undefined sequence, save
      // the two closest defined points as this
      // undefined sequence and exit it.
      if (m) {
        m = false;
        segments.push([dp, p]);
      }
      // Update the previous defined point.
      dp = p;
    }
  }
  return [definedPoints, segments];
}

export type CurveOptions = {
  curve?: CurveFactory | CurveFactoryLineOnly;
  gradient?: boolean;
  [key: string]: any;
};

export const Curve: SC<CurveOptions> = (options, context) => {
  const {
    curve,
    gradient = false,
    // The color for each segment.
    gradientColor = 'between',
    defined = (d) => !Number.isNaN(d) && d !== undefined && d !== null,
    connect: connectNulls = false,
    ...style
  } = options;
  const { coordinate, document } = context;
  return (P, value, defaults) => {
    // Compute styles.
    const { color: defaultColor, lineWidth: defaultSize, ...rest } = defaults;
    const {
      color = defaultColor,
      size = defaultSize,
      seriesColor: sc,
      seriesX: sx,
      seriesY: sy,
    } = value;

    const transform = getTransform(coordinate, value);
    const tpShape = isTranspose(coordinate);
    const stroke =
      gradient && sc
        ? computeGradient(sc, sx, sy, gradient, gradientColor, tpShape)
        : color;

    const finalStyle = {
      ...rest,
      ...(stroke && { stroke }),
      ...(size && { lineWidth: size }),
      ...(transform && { transform }),
      ...style,
    };

    // Compute points and segments.
    let linePath;
    if (isPolar(coordinate)) {
      const center = coordinate.getCenter() as Vector2;
      linePath = (points) =>
        lineRadial()
          .angle((_, idx) => angleWithQuadrant(sub(points[idx], center)))
          .radius((_, idx) => dist(points[idx], center))
          .defined(([x, y]) => defined(x) && defined(y))
          .curve(curve)(points);
    } else {
      linePath = line()
        .x((d) => d[0])
        .y((d) => d[1])
        .defined(([x, y]) => defined(x) && defined(y))
        .curve(curve);
    }
    const [DP, MS] = segmentation(P, defined);
    const connectStyle = subObject(finalStyle, 'connect');
    const missing = !!MS.length;

    // Draw one path of connected defined points.
    if (!missing || (connectNulls && !Object.keys(connectStyle).length)) {
      return select(document.createElement('path', {}))
        .style('d', linePath(DP) || [])
        .call(applyStyle, finalStyle)
        .node();
    }

    // Draw one path of unconnected defined points.
    if (missing && !connectNulls) {
      return select(document.createElement('path', {}))
        .style('d', linePath(P))
        .call(applyStyle, finalStyle)
        .node();
    }

    // Draw two path.
    // One for unconnected defined points.
    // One for connected segments.
    const connectPath = (segments) => segments.map(linePath).join(',');
    return select(new DoublePath())
      .style('style1', { ...finalStyle, ...connectStyle })
      .style('style2', finalStyle)
      .style('d1', connectPath(MS))
      .style('d2', linePath(P))
      .node();
  };
};

Curve.props = {
  defaultMarker: 'smooth',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
