import { line, CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { Vector2 } from '@antv/coord';
import { lowerFirst } from '@antv/util';
import { Path, CustomElement } from '@antv/g';
import { isPolar } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle, computeGradient, getShapeTheme } from '../utils';
import { createElement } from '../createElement';

function getConnectStyle(style: Record<string, any>): Record<string, any> {
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

function segmentation(
  points: Vector2[],
  defined: (d: any) => boolean,
): [Vector2[], [Vector2, Vector2][]] {
  const definedPoints = [];
  const segments = [];
  let m = false;
  let dp = null;
  for (const p of points) {
    if (!defined(p[0]) || !defined(p[1])) m = true;
    else {
      definedPoints.push(p);
      if (m) {
        m = false;
        segments.push([dp, p]);
      }
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
