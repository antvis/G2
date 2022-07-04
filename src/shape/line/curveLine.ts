import { line, CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { Path } from '@antv/g';
import { isPolar } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle, computeGradient } from '../utils';

export type CurveLineOptions = {
  curve?: CurveFactory | CurveFactoryLineOnly;
  gradient?: boolean;
  [key: string]: any;
};

export const CurveLine: SC<CurveLineOptions> = (options) => {
  const { curve, gradient = false, ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor, defaultSize } = theme;
    const {
      color = defaultColor,
      size = defaultSize,
      transform,
      seriesColor: sc,
      seriesX: sx,
    } = value;
    // Append first point to draw close line in polar coordinate.
    const P = isPolar(coordinate) ? [...points, points[0]] : points;
    const path = line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(curve);
    const stroke = gradient && sc ? computeGradient(sc, sx) : color;
    return select(new Path({}))
      .style('d', path(P))
      .style('stroke', stroke)
      .style('lineWidth', size)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

CurveLine.props = {
  defaultEnterAnimation: 'fadeIn',
};
