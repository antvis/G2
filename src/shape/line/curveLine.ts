import { line, CurveFactory, CurveFactoryLineOnly } from 'd3-shape';
import { Path } from '@antv/g';
import { isPolar } from '../../utils/coordinate';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';
import { applyStyle } from '../utils';

export type CurveLineOptions = {
  curve?: CurveFactory | CurveFactoryLineOnly;
  [key: string]: any;
};

export const CurveLine: SC<CurveLineOptions> = (options) => {
  const { curve, ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor, defaultSize } = theme;
    const { color = defaultColor, size = defaultSize, transform } = value;
    // Append first point to draw close line in polar coordinate.
    const P = isPolar(coordinate) ? [...points, points[0]] : points;
    const path = line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(curve);

    return select(new Path({}))
      .style('d', path(P))
      .style('stroke', color)
      .style('lineWidth', size)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

CurveLine.props = {
  defaultEnterAnimation: 'fadeIn',
};
