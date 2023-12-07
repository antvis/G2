import { area, areaRadial, CurveFactory } from 'd3-shape';
import { select } from '../../utils/selection';
import { isPolar, isTranspose } from '../../utils/coordinate';
import { Vector2, ShapeComponent as SC } from '../../runtime';
import { angleWithQuadrant, sub, dist } from '../../utils/vector';
import { applyStyle, computeGradient, getTransform } from '../utils';
import { subObject } from '../../utils/helper';
import { createElement } from '../../utils/createElement';

/**
 * Given a points sequence, split it into an array of defined points
 * and an array of undefined segments.
 *
 * Input - [p0, p1, p2, p3, p4, p5], p1 ~ p2 is `Y1`, p3 ~ p5 is `Y0`.
 * Output - When all of Y1 & Y0 is defined, move into defined points, or else undefined segments.
 */
function segmentation(
  points: Vector2[],
  defined: (d: any) => boolean,
): [Vector2[], [Vector2, Vector2][]] {
  const definedPointsY1 = [];
  const definedPointsY0 = [];
  const segments = [];

  let m = false; // Is in a undefined sequence.
  let dp = null; // The previous defined point.

  const mid = points.length / 2;
  for (let i = 0; i < mid; i++) {
    const y1 = points[i];
    const y0 = points[i + mid];

    // If current point is a undefined point,
    // enter a undefined sequence.
    if ([...y1, ...y0].some((v) => !defined(v))) m = true;
    else {
      definedPointsY1.push(y1);
      definedPointsY0.push(y0);
      // If current point is a defined point,
      // and is in a undefined sequence, save
      // the two closest defined points as this
      // undefined sequence and exit it.
      if (m && dp) {
        m = false;
        const [dpy1, dpy0] = dp;
        segments.push([dpy1, y1, dpy0, y0]);
      }
      // Update the previous defined point.
      dp = [y1, y0];
    }
  }
  return [definedPointsY1.concat(definedPointsY0), segments];
}

export type CurveOptions = {
  curve?: CurveFactory;
  gradient?: boolean | string;
  [key: string]: any;
};

const DoubleArea = createElement((g) => {
  const { areaPath, connectPath, areaStyle, connectStyle } = g.attributes;
  const document = g.ownerDocument;
  select(g)
    .maybeAppend('connect-path', () => document.createElement('path', {}))
    .style('d', connectPath)
    .call(applyStyle, connectStyle);
  select(g)
    .maybeAppend('area-path', () => document.createElement('path', {}))
    .style('d', areaPath)
    .call(applyStyle, areaStyle);
});

export const Curve: SC<CurveOptions> = (options, context) => {
  const {
    curve,
    gradient = false,
    defined = (d) => !Number.isNaN(d) && d !== undefined && d !== null,
    connect: connectNulls = false,
    ...style
  } = options;
  const { coordinate, document } = context;

  return (P, value, defaults) => {
    const { color: defaultColor } = defaults;
    const {
      color = defaultColor,
      seriesColor: sc,
      seriesX: sx,
      seriesY: sy,
    } = value;
    const tpShape = isTranspose(coordinate);
    const transform = getTransform(coordinate, value);
    const fill =
      gradient && sc
        ? computeGradient(sc, sx, sy, gradient, undefined, tpShape)
        : color;

    const finalStyle = {
      ...defaults,
      stroke: fill,
      fill: fill,
      ...(transform && { transform }),
      ...style,
    };

    const [DP, MS] = segmentation(P, defined);

    const connectStyle = subObject(finalStyle, 'connect');
    const missing = !!MS.length;

    const getPathNode = (path) => {
      return select(document.createElement('path', {}))
        .style('d', path || '')
        .call(applyStyle, finalStyle)
        .node();
    };

    if (!isPolar(coordinate)) {
      /**
       * Draw area shape by points.
       */
      const areaPath = (points) => {
        const Y1 = points.slice(0, points.length / 2);
        const Y0 = points.slice(points.length / 2);
        return tpShape
          ? area()
              .y((_, idx) => Y1[idx][1])
              .x1((_, idx) => Y1[idx][0])
              .x0((_, idx) => Y0[idx][0])
              .defined((_, idx) => [...Y1[idx], ...Y0[idx]].every(defined))
              .curve(curve)(Y1)
          : area()
              .x((_, idx) => Y1[idx][0])
              .y1((_, idx) => Y1[idx][1])
              .y0((_, idx) => Y0[idx][1])
              .defined((_, idx) => [...Y1[idx], ...Y0[idx]].every(defined))
              .curve(curve)(Y1);
      };

      // Draw one area of connected defined points.
      if (!missing || (connectNulls && !Object.keys(connectStyle).length)) {
        return getPathNode(areaPath(DP));
      }

      // Draw one area of unconnected defined points.
      if (missing && !connectNulls) {
        return getPathNode(areaPath(P));
      }

      // Draw two area.
      // One for unconnected defined points.
      // One for connected segments.
      return select(new DoubleArea())
        .style('areaStyle', finalStyle)
        .style('connectStyle', { ...connectStyle, ...style })
        .style('areaPath', areaPath(P))
        .style('connectPath', MS.map(areaPath).join(''))
        .node();
    } else {
      /**
       * Draw areaRadial shape by points.
       */
      const areaRadialPath = (points) => {
        const center = coordinate.getCenter() as Vector2;
        const Y1 = points.slice(0, points.length / 2);
        const Y0 = points.slice(points.length / 2);

        return areaRadial()
          .angle((_, idx) => angleWithQuadrant(sub(Y1[idx], center)))
          .outerRadius((_, idx) => dist(Y1[idx], center))
          .innerRadius((_, idx) => dist(Y0[idx], center))
          .defined((_, idx) => [...Y1[idx], ...Y0[idx]].every(defined))
          .curve(curve)(Y0);
      };

      // Draw one area of connected defined points.
      if (!missing || (connectNulls && !Object.keys(connectStyle).length)) {
        return getPathNode(areaRadialPath(DP));
      }

      // Draw one area of unconnected defined points.
      if (missing && !connectNulls) {
        return getPathNode(areaRadialPath(P));
      }

      // Draw two area.
      // One for unconnected defined points.
      // One for connected segments.
      return select(new DoubleArea())
        .style('areaStyle', finalStyle)
        .style('connectStyle', { ...connectStyle, ...style })
        .style('areaPath', areaRadialPath(P))
        .style('connectPath', MS.map(areaRadialPath).join(''))
        .node();
    }
  };
};

Curve.props = {
  defaultMarker: 'smooth',
  defaultEnterAnimation: 'fadeIn',
  defaultUpdateAnimation: 'morphing',
  defaultExitAnimation: 'fadeOut',
};
