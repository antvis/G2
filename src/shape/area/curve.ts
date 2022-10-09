import { area, areaRadial, CurveFactory } from 'd3-shape';
import { Path } from '@antv/g';
import { select } from '../../utils/selection';
import { isPolar } from '../../utils/coordinate';
import { Vector2, ShapeComponent as SC } from '../../runtime';
import { angle, sub, dist } from '../../utils/vector';
import {
  applyStyle,
  computeGradient,
  getConnectStyle,
  getShapeTheme,
} from '../utils';
import { createElement } from '../createElement';

const MultipleArea = createElement((g) => {
  const { ds, areaStyle, connectStyle } = g.attributes;
  // Draw all path.
  for (let i = 0; i < ds.length; i++) {
    const d = ds[i];
    const s = i === 0 ? areaStyle : connectStyle;
    select(g)
      .maybeAppend(`area${i}`, () => new Path({}))
      .style('d', d)
      .call(applyStyle, s);
  }
});

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

function getTransform(coordinate, value) {
  if (!isPolar(coordinate)) return '';
  const center = coordinate.getCenter() as Vector2;
  const { transform: suffix } = value;
  return `translate(${center[0]}, ${center[1]}) ${suffix || ''}`;
}

export type CurveOptions = {
  curve?: CurveFactory;
  gradient?: boolean;
  [key: string]: any;
};

export const Curve: SC<CurveOptions> = (options) => {
  const {
    curve,
    gradient = false,
    defined = (d) => !Number.isNaN(d) && d !== undefined && d !== null,
    connectNulls = false,
    ...style
  } = options;
  return (P, value, coordinate, theme) => {
    const { mark, shape, defaultShape } = value;
    const { fill: defaultColor, ...defaults } = getShapeTheme(
      theme,
      mark,
      shape,
      defaultShape,
    );
    const { color = defaultColor, seriesColor: sc, seriesX: sx } = value;
    const transform = getTransform(coordinate, value);
    const fill = gradient && sc ? computeGradient(sc, sx) : color;

    const finalStyle = {
      ...defaults,
      stroke: fill,
      fill: fill,
      ...(transform && { transform }),
      ...style,
    };

    const [DP, MS] = segmentation(P, defined);

    const connectStyle = getConnectStyle(style);
    const missing = !!MS.length;

    const getPathNode = (path) => {
      return select(new Path({}))
        .style('d', path)
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
        return area()
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
      return select(new MultipleArea())
        .style('areaStyle', finalStyle)
        .style('connectStyle', { ...connectStyle, ...style })
        .style('ds', [areaPath(P)].concat(MS.map(areaPath)))
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
          .angle((_, idx) => angle(sub(Y1[idx], center)))
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
      return select(new MultipleArea())
        .style('areaStyle', finalStyle)
        .style('connectStyle', { ...connectStyle, ...style })
        .style('ds', [areaRadialPath(P)].concat(MS.map(areaRadialPath)))
        .node();
    }
  };
};

Curve.props = {
  defaultEnterAnimation: 'fadeIn',
};
