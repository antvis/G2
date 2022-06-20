import { Path } from '@antv/g';
import { path as d3path } from 'd3-path';
import { applyStyle, arrowPoints, ArrowOptions } from '../utils';
import { select } from '../../utils/selection';
import { ShapeComponent as SC } from '../../runtime';

export type EdgeOptions = {
  /**
   * Whether draw arrow, Default: false.
   */
  arrow?: ArrowOptions;
  [key: string]: any;
};

/**
 * Connect 2 points with a single line.
 */
export const Edge: SC<EdgeOptions> = (options) => {
  const { arrow, ...style } = options;
  return (points, value, coordinate, theme) => {
    const { defaultColor } = theme;
    const { color = defaultColor, transform } = value;
    const [from, to] = points;

    // Draw line
    const path = d3path();
    path.moveTo(...from);
    path.lineTo(...to);

    // Draw 2 arrows.
    if (arrow) {
      // Calculate arrow end point.
      const [arrow1, arrow2] = arrowPoints(from, to, arrow);
      path.moveTo(...to);
      path.lineTo(...arrow1);
      path.moveTo(...to);
      path.lineTo(...arrow2);
    }

    return select(new Path())
      .style('d', path.toString())
      .style('stroke', color)
      .style('transform', transform)
      .call(applyStyle, style)
      .node();
  };
};

Edge.props = {
  defaultEnterAnimation: 'fadeIn',
};
