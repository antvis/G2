import { line, CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { Vector2 } from '@antv/coord';
import { Path, CustomElement } from '@antv/g';
import { isPolar } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';
import {
  applyStyle,
  computeGradient,
  getShapeTheme,
  getConnectStyle,
} from '../utils';
import { createElement } from '../createElement';

const DoublePath = createElement((g) => {
  const { d1, d2, style1, style2 } = g.attributes;
  select(g)
    .maybeAppend('line', () => new Path({}))
    .style('d', d1)
    .call(applyStyle, style1);
  select(g)
    .maybeAppend('line1', () => new Path({}))
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

export const Curve: SC<CurveOptions> = (options) => {
  const {
    curve,
    gradient = false,
    defined = (d) => !Number.isNaN(d) && d !== undefined && d !== null,
    connectNull = false,
    ...style
  } = options;
  return (points, value, coordinate, theme) => {
    // Compute styles.
    const { mark, shape, defaultShape } = value;
    const {
      stroke: defaultColor,
      lineWidth: defaultSize,
      ...defaults
    } = getShapeTheme(theme, mark, shape, defaultShape);
    const {
      color = defaultColor,
      size = defaultSize,
      transform,
      seriesColor: sc,
      seriesX: sx,
    } = value;
    const stroke = gradient && sc ? computeGradient(sc, sx) : color;
    const finalStyle = {
      ...defaults,
      ...(stroke && { stroke }),
      ...(size && { lineWidth: size }),
      ...(transform && { transform }),
      ...style,
    };

    // Compute points and segments.
    // Append first point to draw close line in polar coordinate.
    const P = isPolar(coordinate) ? [...points, points[0]] : points;
    const linePath = line()
      .x((d) => d[0])
      .y((d) => d[1])
      .defined(([x, y]) => defined(x) && defined(y))
      .curve(curve);
    const [DP, MS] = segmentation(P, defined);
    const connectStyle = getConnectStyle(style);
    const missing = !!MS.length;

    // Draw one path of connected defined points.
    if (!missing || (connectNull && !Object.keys(connectStyle).length)) {
      return select(new Path({}))
        .style('d', linePath(DP))
        .call(applyStyle, finalStyle)
        .node();
    }

    // Draw one path of unconnected defined points.
    if (missing && !connectNull) {
      return select(new Path({}))
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
  defaultEnterAnimation: 'fadeIn',
};
