import { path as d3path } from 'd3-path';
import { Path } from '@antv/g';
import { applyStyle, arrowPoints, ArrowOptions } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type VectorOptions = {
  /**
   * Whether draw arrow, Default: false.
   */
  arrow?: ArrowOptions;
  [key: string]: any;
};

/**
 * ----->
 */
export const Vector: SC<VectorOptions> = (options) => {
  const { arrow, ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;
    const [from, to] = points;

    // Calculate arrow end point.
    const [arrow1, arrow2] = arrowPoints(from, to, arrow);

    // Draw line
    const path = d3path();
    path.moveTo(...from);
    path.lineTo(...to);

    // Draw 2 arrows.
    path.moveTo(...to);
    path.lineTo(...arrow1);
    path.moveTo(...to);
    path.lineTo(...arrow2);

    return select(new Path())
      .style('d', path.toString())
      .style('stroke', color)
      .style('fill', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Vector.props = {
  defaultEnterAnimation: 'fadeIn',
};
